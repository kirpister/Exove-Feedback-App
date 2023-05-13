import React, { useState } from "react";
import classes from "./userList.module.css";
import { personalDetailType } from "../../../../model/types/user";
import SingleUser from "../../../User/SingleUser";
import { useAppSelector } from "../../../../app/hooks";
import { personalRequestListType } from "../../../../model/types/requestList";
interface PropsType {
  userListId?: Array<string>;
  selectedRequesList? : personalRequestListType
}

const AllUsersList: React.FC = (props: PropsType) => {
  const { allUserList } = useAppSelector((state) => state.allUser);
  const [search, setSearch] = useState("");
  //   const [userList, setUsersList] = useState([]);

  const searchHandler = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div className={classes.all_users_list}>
      <div>
        {/* <label htmlFor="search"></label> */}
        <input
          type="search"
          id="search"
          placeholder="Search"
          onChange={searchHandler}
        ></input>
      </div>
      {allUserList.map((user) => (
        <SingleUser key={user.id} userInfo={user} />
      ))}
    </div>
  );
};

export default AllUsersList;
