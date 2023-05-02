import React, { useState } from "react";
import SidebarAdmin from "../../pages/admindash/SidebarAdmin";
import AllUsersList from "./AllUsersList";
import SelectedReviewers from "./SelectedReviewers";
import axios from "axios";
import classes from "./Confirmation.module.css";
import { personalDetailType } from "../../model/types/user";

interface DataType {
  data: {
    msg: string;
    data: personalDetailType[];
  };
  status: number;
}

const Confirmation: React.FC = () => {
  const [users, setUsers] = useState<personalDetailType[]>([]);

  const loadUsers = () => {
    axios.get<personalDetailType[]>("/user/get_all_user").then((res) => {
      setUsers(res.data);
    });
  };
  console.log("users", users);
  if (users.length === 0) {
    loadUsers();
  }

  return (
    <div className="admindash_wrapper">
      <SidebarAdmin />

      <div>
        <div className={classes.confirmation_wrapper}>
          <SelectedReviewers />
          <AllUsersList />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
