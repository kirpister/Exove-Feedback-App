import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import AllUsersList from "../step_1_selectList/all_user_list/AllUsersList";
import SingleUserList from "../step_1_selectList/single_user_list/SingleUserList";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./setupUserList.module.css";
import { setUpSelectRequestList } from "../../../features/requestUserListSlicer";
import BtnSuccess from "../../button/success/BtnSuccess";
import { setUpUserList } from "../../../features/feedbackSlice";

function SetupUserList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedRequesList, requestLists } = useAppSelector((state) => state.requestUserlist);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(setUpSelectRequestList({ id }));
    }
  }, [dispatch, id, requestLists]);
  const processNext = () => {
    navigate(`/getuserlist/${id}/feedbackform`);
    if (selectedRequesList) {
      dispatch(
        setUpUserList({
          listUserId: selectedRequesList.userList,
          requestedListBy: selectedRequesList.id,
        })
      );
    }
  };
  const goBack = () => {
    navigate(`/getuserlist`);
  };
  return selectedRequesList ? (
    <div className={styles.wrapper}>
      <h1>Step-2 modify the list</h1>
      <div className={styles.confirmation_wrapper}>
        <div className={styles.selected_reviewers}>
          <SingleUserList singleRequestedList={selectedRequesList} index={1} key={1} />
          <BtnSuccess callBack={processNext} name="Process" key={id}></BtnSuccess>
          <BtnSuccess callBack={goBack} name="Back" key={id}></BtnSuccess>
        </div>
        <AllUsersList />
      </div>
    </div>
  ) : (
    <>{}</>
  );
}

export default SetupUserList;
