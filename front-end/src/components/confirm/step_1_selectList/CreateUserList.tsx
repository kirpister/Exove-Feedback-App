import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../pages/admindash/SidebarAdmin";
import AllUsersList from "./AllUsersList";
import SelectedReviewers from "./SelectedReviewers";
import axios from "axios";
import classes from "./CreateUserList.module.css";
import { personalDetailType } from "../../../model/types/user";
import { useAppDispatch } from "../../../app/hooks";
import { updateAllUserList } from "../../../features/alluserSlicer";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType[];
  };
  status: number;
}

const CreatedUserList: React.FC = () => {
  const [users, setUsers] = useState<personalDetailType[]>([]);
  const distpacth = useAppDispatch();
  useEffect(() => {
    axios.get<personalDetailType[]>("/user/get_all_user").then((res) => {
      const { data, status } = res as unknown as DataType;
      if (status === 200) {
        setUsers(data.data);
        distpacth(updateAllUserList(data.data));
      }
    });
  }, []);

  return (
    <>
      {/* <SidebarAdmin /> */}
      <div className={classes.wrapper}>
        <div className={classes.confirmation_wrapper}>
          <div className={classes.selected_reviewers}>
            <SelectedReviewers />
          </div>
          <AllUsersList usersList={users} />
        </div>
      </div>
    </>
  );
};

export default CreatedUserList;
