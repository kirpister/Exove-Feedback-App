import React, { useState, useEffect } from "react";
import AllUsersList from "./AllUsersList";
import SelectedReviewers from "./SelectedReviewers";
import axios from "axios";
import styles from "./CreateUserList.module.css";
import { personalDetailType } from "../../model/types/user";
import { useAppDispatch } from "../../app/hooks";
import { updateAllUserList } from "../../features/alluserSlicer";
import { PersonalDetailType } from "../../common/types/UserDetails";

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
  const [users, setUsers] = useState<personalDetailType[]>([]);
  const distpacth = useAppDispatch();
  const [isActive, setIsActive] = useState<personalDetailType>();

  useEffect(() => {
    axios.get<personalDetailType[]>("/user/get_all_user").then((res) => {
      const { data, status } = res as unknown as DataType;
      if (status === 200) {
        setUsers(data.data);
        distpacth(updateAllUserList(data.data));
      }
    });
  }, []);
  // console.log("users", users);

  const onClickUser = (clickedUser: any) => {
    console.log("clicked", clickedUser);
    setIsActive(clickedUser);
  };

  return (
    <>
      {/* <SidebarAdmin /> */}

      <div>
        <div className={styles.confirmation_wrapper}>
          <div className={styles.selected_reviewers}>
            {isActive ? <SelectedReviewers isActive={isActive} /> : ""}
          </div>
          <AllUsersList
            usersList={users}
            onClickUser={onClickUser}
            isActive={isActive}
          />
        </div>
      </div>
    </>
  );
};

export default CreateUserList;
