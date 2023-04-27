import React, { useEffect, useState } from "react";
import axios from "axios";

import { personalDetailType } from "../../model/types/user";

import SidebarUser from "./SidebarUser";

import "./userdash.css";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface DataType {
  data: {
    msg: string;
    data: personalDetailType[];
  };
  status: number;
}

interface CheckedUser {
  id: number;
  personalDetail?: {
    firstName?: string;
    surName?: string;
  };
}

const RequestFeedback: React.FC = () => {

    const [users, setUsers] = useState<personalDetailType[]>([]);
    const [checkedUsers, setCheckedUsers] = useState<CheckedUser[]>([]);
  
    const userDetails: any = useSelector(
      (state: RootState) => state.authenticatedUser.userDetails
    );
  
  
    useEffect(() => {
      axios
        .get<personalDetailType[]>("http://localhost:4000/user/get_all_user")
        .then((res) => {
          console.log(res);
          const { data, status } = res as unknown as DataType;
          if (status === 200) {
            setUsers(data.data);
          }
        });
    }, []);

    const handleSubmit = () => {
        axios.post('localhost:4000/user/feedback_request', checkedUsers)
          .then(response => console.log(response.data))
          .catch(error => console.log(error));
        console.log(checkedUsers);
      };
    
      const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        user: any) => {
        const isChecked = e.target.checked;
        const userId = user.id;
    
        console.log(
          `User ${user.id} ${user.personalDetail.firstName} ${
            isChecked ? "checked" : "unchecked"
          }`
        );
    
        if (isChecked) {
          const checkedUser: CheckedUser = {
            id: userId,
            personalDetail: user.personalDetail,
          };
    
          setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, checkedUser]);
        } else {
          setCheckedUsers((prevCheckedUsers) =>
            prevCheckedUsers.filter((checkedUser) => checkedUser.id !== userId)
          );
        }
    
        console.log(checkedUsers);
      };

      const renderUser = (usersList: any) => {
        if (Array.isArray(usersList)) {
         
          return usersList.map((user) => {
    
            // console.log(`current id: ${userDetails.id}`);
    
            // if (user.id === userDetails?.id) {
            //     return null;
            // }
            return (    
              <article className="user-list">
                <input
                  type="checkbox"
                  id={user.id}
                  value={user.id}
                  onChange={(e) => handleCheckboxChange(e, user)}
                />
                <div>
                  {/* <img src={userimg} alt="user-img" /> */}
                  <div className="avatar">
          {userDetails.firstName.charAt(0).toUpperCase()}
          </div>
                  <span>
                    {user.personalDetail.firstName} {user.personalDetail.surName}
                    <br />
                    {user.work.roles[0]}
                  </span>
                </div>
              </article>
            );
          });
        }
      };





    return (
        <div>
            <SidebarUser />
      <div className="dash-wrapper">
 
        <h2>Request feedback</h2>
        <p>Choose five colleagues to give you feedback.</p>

        <div className="users">{renderUser(users)}</div>

        <button onClick={handleSubmit}>Submit</button>
      </div>
        </div>
    );
};

export default RequestFeedback;