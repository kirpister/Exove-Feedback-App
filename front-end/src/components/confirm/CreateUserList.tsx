import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../pages/admindash/SidebarAdmin";
import AllUsersList from "./AllUsersList";
import SelectedReviewers from "./SelectedReviewers";
import axios from "axios";
import classes from "./userList.module.css";
import { personalDetailType } from "../../model/types/user";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType[];
  };
  status: number;
}

const CreatedUserList: React.FC = () => {
  const [users, setUsers] = useState<personalDetailType[]>([]);

  useEffect(() => {
    axios.get<personalDetailType[]>("/user/get_all_user").then((res) => {
      console.log(res);
      const { data, status } = res as unknown as DataType;
      if (status === 200) {
        setUsers(data.data);
      }
    });
  }, []);
  console.log("users", users);

  return (
    <>
      <SidebarAdmin />

      <div>
        <div className={classes.confirmation_wrapper}>
          <SelectedReviewers />
          <AllUsersList usersList={users} />
        </div>
      </div>
    </>
  );
};

export default CreatedUserList;
