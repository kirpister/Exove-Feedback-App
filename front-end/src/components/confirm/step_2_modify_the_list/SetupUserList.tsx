import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import AllUsersList from "./all_userlist_to_select/AllUsersList";
import SingleUserList from "./single_user_list/SingleUserList";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./setupUserList.module.css";
import {
  removeUserFromSelectRequestList,
  setUpSelectRequestList,
} from "../../../features/requestUserListSlicer";
import BtnSuccess from "../../button/success/BtnSuccess";
import { setUpUserList } from "../../../features/feedbackSlice";
import { showLoading2s } from "../../../features/loadingSlicer";

function SetupUserList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedRequesList, requestLists } = useAppSelector(
    (state) => state.requestUserlist
  );
  const { finalConfirm, sections, listUserId, requestedListBy, sendQuestion } =
    useAppSelector((state) => state.feedback);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(setUpSelectRequestList({ id }));
    }
  }, [dispatch, id, requestLists]);
  const processNext = () => {
    const confirmed = window.confirm(
      "do you want to send feedback request to those user ?"
    );
    if (confirmed) {
      if (selectedRequesList) {
        dispatch(
          setUpUserList({
            listUserId: selectedRequesList.userList,
            requestedListBy: selectedRequesList.id,
          })
        );
        showLoading2s(dispatch);
        setTimeout(() => {
          navigate("confirm");
        }, 2000);
      }
    }
  };
  const goBack = () => {
    const confirmed = window.confirm("do you want to go back");
    confirmed && navigate(`/getuserlist`);
  };
  const removeUserFromThelist = (id: string) => {
    dispatch(removeUserFromSelectRequestList({ id }));
    console.log(id);
  };
  return selectedRequesList ? (
    <div>
      {/* <h1>Step-2 modify the list</h1> */}
      <div className={styles.confirmation_wrapper}>
        <div className={styles.selected_reviewers}>
          <SingleUserList
            singleRequestedList={selectedRequesList}
            index={1}
            key={id}
            buttonName={"remove"}
            callBack={removeUserFromThelist}
          />
          <BtnSuccess
            callBack={processNext}
            name="Send Feedback Request"
            key={id}
          />
          <BtnSuccess callBack={goBack} name="Go Back" key={id} />
        </div>
        <AllUsersList />
      </div>
    </div>
  ) : (
    <>{}</>
  );
}

export default SetupUserList;
