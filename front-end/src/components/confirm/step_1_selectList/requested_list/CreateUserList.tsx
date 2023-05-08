import React from "react";
import AllUsersList from "../all_user_list/AllUsersList";
import classes from "./CreateUserList.module.css";

import RequestUserLists from "../all_requested_user_list/RequestUserLists";

const CreatedUserList: React.FC = () => {
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
