import React, { useEffect, useState } from "react";
import axios from "axios";

import { personalDetailType, DataType, CheckedUser } from "../../model/types/user";
import { useNavigate } from "react-router-dom";

import userstyles from "./userdash.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import CreatedRequestFeedback from "./createdRequestFeedback/CreatedRequestFeedback";
import BtnSuccess from "../../components/button/success/BtnSuccess";

const RequestFeedback: React.FC = () => {
  const { allUserList } = useAppSelector((state) => state.allUser);
  const { selfFeedbackRequests } = useAppSelector((state) => state.requestFeedback);
  const [checkedUsers, setCheckedUsers] = useState<CheckedUser[]>([]);
  const navigate = useNavigate();

  const userDetails: any = useSelector((state: RootState) => state.authenticatedUser.userDetails);

  const handleSubmit = () => {
    let userListId = [];
    if (checkedUsers.length > 1) {
      for (let user of checkedUsers) {
        userListId.push(user.id);
      }
    }
    axios
      .post("user/feedback_request", { userListId: userListId })
      .then((response) => {
        alert("Success!");
        navigate("/");
      })
      .catch((error) => {
        alert("Sorry, something went wrong!");
      });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, user: any) => {
    const isChecked = e.target.checked;
    const userId = user.id;

    console.log(`User ${user.id} ${user.personalDetail.firstName} ${isChecked ? "checked" : "unchecked"}`);

    if (isChecked) {
      const checkedUser: CheckedUser = {
        id: userId,
        personalDetail: user.personalDetail,
      };

      setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, checkedUser]);
    } else {
      setCheckedUsers((prevCheckedUsers) => prevCheckedUsers.filter((checkedUser) => checkedUser.id !== userId));
    }

    console.log(checkedUsers);
  };

  const renderUser = (usersList: any) => {
    if (Array.isArray(usersList)) {
      return usersList.map((user) => {
        return (
          <article key={user.id} className={userstyles.userlist}>
            <input type="checkbox" id={user.id} value={user.id} onChange={(e) => handleCheckboxChange(e, user)} />
            <div>

              <div className={userstyles.avatar}>{user.personalDetail.firstName.charAt(0).toUpperCase()}</div>

              <span>
                {user.personalDetail.firstName} {user.personalDetail.surName}
                <br />
                {user.work.departments}
              </span>
            </div>
          </article>
        );
      });
    }
  };

  return (
    <main className={userstyles.usermain}>
      <div className={userstyles.userdash}>
        <h2>Request feedback</h2>
        <p>Choose five colleagues to give you feedback.</p>
        <div className={userstyles.users}>{renderUser(allUserList)}</div>
        {/* <button onClick={handleSubmit}>SUBMIT</button> */}
        <BtnSuccess callBack={handleSubmit} name="SUBMIT" disabled={selfFeedbackRequests.length > 0 ? true : false} />
      </div>
      {/* here is requested feedback which is created */}
      <div>
        <CreatedRequestFeedback />
      </div>
    </main>
  );
};

export default RequestFeedback;
