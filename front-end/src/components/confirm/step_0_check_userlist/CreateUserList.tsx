import React, { useEffect, useState } from "react";
import AllUsersList from "./AllUsersList";
import SelectedReviewers from "./SelectedReviewers";
import styles from "./CreateUserList.module.css";
import { personalDetailType } from "../../../model/types/user";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { showLoading2s } from "../../../features/loadingSlicer";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType[];
  };
  status: number;
}

export interface clickedUserType {
  clickedUser: Object;
  onClickUser: Function;
  isActive: personalDetailType;
}

const CreateUserList: React.FC = () => {
  const [isActive, setIsActive] = useState<personalDetailType>();
  const { allUserList } = useAppSelector((state) => state.allUser);
  const { requestLists } = useAppSelector((state) => state.requestUserlist);
  const dispatch = useAppDispatch();
  const onClickUser = (clickedUser: any) => {
    setIsActive(clickedUser);
  };
  return (
    <>
      <div className={styles.confirmation_wrapper} style={{margin: "1rem"}}>
        <div className={styles.selected_reviewers}>
          {isActive ? (
            <SelectedReviewers isActive={isActive} requests={requestLists} />
          ) : (
            <div>
              <h3>Click to the user on the left to see the results</h3>
            </div>
          )}
        </div>
        <AllUsersList usersList={allUserList} onClickUser={onClickUser} isActive={isActive} requests={requestLists} />
      </div>
    </>
  );
};

export default CreateUserList;
