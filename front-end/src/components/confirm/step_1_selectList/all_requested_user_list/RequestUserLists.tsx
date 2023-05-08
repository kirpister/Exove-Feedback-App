import React from "react";
import { personalRequestListType } from "../../../../model/types/requestList";
import SingleUserList from "../single_user_list/SingleUserList";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./requestUserLists.module.css";
import { setUpUserList } from "../../../../features/feedbackSlice";
import BtnSuccess from "../../../button/success/BtnSuccess";

interface AllUserRequestProps {
  usersRequestList: personalRequestListType[];
}

const RequestUserLists: React.FC = () => {
  const navigate = useNavigate();
  const { requestLists } = useAppSelector((state) => state.requestUserlist);

  const processSetupUserList = (singleRequestedList: personalRequestListType) => {
    if (singleRequestedList.opened) {
      return alert("not allow to create new feedback base on this list becuase it already created before");
    } else {
      navigate(`${singleRequestedList.id}`);
    }
  };
  const renderData = () => {
    return requestLists.map((singleRequestedList, i) => {
      return (
        <div key={singleRequestedList.id} className={styles.selected_reviewers}>
          <SingleUserList index={i} singleRequestedList={singleRequestedList} key={i} />
          <BtnSuccess callBack={processSetupUserList} name={"Process"} data={singleRequestedList} />
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Step-1 Select list of user</h1>
        <div className={styles.confirmation_wrapper}>{renderData()}</div>
      </div>
    </>
  );
};

export default RequestUserLists;
