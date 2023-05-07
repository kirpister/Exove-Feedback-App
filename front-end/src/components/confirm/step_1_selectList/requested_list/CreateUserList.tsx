import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../../pages/admindash/SidebarAdmin";
import AllUsersList from "../all_user_list/AllUsersList";
import axios from "axios";
import classes from "./CreateUserList.module.css";
import { DataType, personalDetailType } from "../../../../model/types/user";
import { useAppDispatch } from "../../../../app/hooks";
import { updateAllUserList } from "../../../../features/alluserSlicer";
import RequestUserLists from "../all_requested_user_list/RequestUserLists";



const CreatedUserList: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get<personalDetailType[]>("/user/get_all_user").then((res) => {
      const { data, status } = res as unknown as DataType;
      if (status === 200) {
        dispatch(updateAllUserList(data.data));
      }
    });
  }, [dispatch]);

  return (
    <>
      {/* <SidebarAdmin /> */}
      <div className={classes.wrapper}>
        <div className={classes.confirmation_wrapper}>
          <div className={classes.selected_reviewers}>
            <RequestUserLists />
          </div>
          <AllUsersList />
        </div>
      </div>
    </>
  );
};

export default CreatedUserList;
