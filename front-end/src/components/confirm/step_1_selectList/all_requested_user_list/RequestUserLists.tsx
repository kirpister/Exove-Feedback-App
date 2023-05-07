import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataType, personalDetailType } from "../../../../model/types/user";
import { personalRequestListType } from "../../../../model/types/requestList";
import SingleUserList from "../single_user_list/SingleUserList";
import { updateAllUserList } from "../../../../features/alluserSlicer";
import { useAppDispatch } from "../../../../app/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./requestUserLists.module.css";
import { setUpUserList } from "../../../../features/feedbackSlice";
import BtnSuccess from "../../../button/success/BtnSuccess";

interface AllUserRequestProps {
  usersRequestList: personalRequestListType[];
}

const RequestUserLists: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [requests, setRequests] = useState<any[]>([]);
  useEffect(() => {
    
    axios.get<personalRequestListType[]>("/feedback/requested_feedback").then((res) => {
      const { data, status } = res as unknown as DataType;
      if (status === 200) {
        setRequests(data.data);
      }
    });
 
  }, [dispatch]);
  const processSetupUserList = (singleRequestedList: personalRequestListType) => {
    if (singleRequestedList.opened) {
      return alert("not allow to create new feedback base on this list becuase it already created before");
    } else {
      dispatch(
        setUpUserList({
          listUserId: singleRequestedList.userList,
          requestedListBy: singleRequestedList.id,
        })
      );
      navigate(`${singleRequestedList.id}`);
    }
  };
  const renderData = () => {
    return requests.map((singleRequestedList, i) => {
      return (
        <div key={singleRequestedList.id} className={styles.selected_reviewers}>
          <SingleUserList index={i} singleRequestedList={singleRequestedList} key={i} />
          {/* <button onClick={() => processSetupUserList(singleRequestedList)}>Process</button> */}
          <BtnSuccess callBack={processSetupUserList} name={"Process"} data={singleRequestedList} />
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.confirmation_wrapper}>{renderData()}</div>
      </div>
    </>
  );
};

export default RequestUserLists;
