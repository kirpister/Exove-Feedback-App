import React from "react";
import classes from "./userList.module.css";

const AllUsersList = () => {
  return (
    <div className={classes.all_users_list}>
      <div>
        <label htmlFor="search"></label>
        <input type="search" id="search" placeholder="Search"></input>
      </div>
      <div>user1</div>
      <div>user2</div>
      <div>user3</div>
    </div>
  );
};

export default AllUsersList;
