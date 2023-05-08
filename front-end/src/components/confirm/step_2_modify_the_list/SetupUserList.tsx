import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import AllUsersList from "../step_1_selectList/all_user_list/AllUsersList";
import SingleUserList from "../step_1_selectList/single_user_list/SingleUserList";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./setupUserList.module.css";
import { setUpSelectRequestList } from "../../../features/requestUserListSlicer";
import BtnSuccess from "../../button/success/BtnSuccess";

function SetupUserList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedRequesList, requestList } = useAppSelector((state) => state.requestUserlist);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log(requestList);
    if (id) {
      dispatch(setUpSelectRequestList({ id }));
    }
  }, [dispatch, id, requestList]);

  return selectedRequesList ? (
    <div className={styles.wrapper}>
      <div className={styles.confirmation_wrapper}>
        <div className={styles.selected_reviewers}>
          <SingleUserList singleRequestedList={selectedRequesList} index={1} key={1} />
          {/* <BtnSuccess ></BtnSuccess> */}
        </div>
        <AllUsersList />
        
      </div>
    </div>
  ) : (
    <>{}</>
  );
}

export default SetupUserList;
