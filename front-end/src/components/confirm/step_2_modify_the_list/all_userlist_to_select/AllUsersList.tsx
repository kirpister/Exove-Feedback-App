import React, { useState, useRef } from "react";
import classes from "./userList.module.css";
import { personalDetailType } from "../../../../model/types/user";
import SingleUser from "../../../User/SingleUser";
import { useAppSelector } from "../../../../app/hooks";
import { personalRequestListType } from "../../../../model/types/requestList";
import { useScrollbar } from "../../../../app/use-scrollbar";
interface PropsType {
  userListId?: Array<string>;
  selectedRequesList?: personalRequestListType;
}

const AllUsersList: React.FC = (props: PropsType) => {
  const { allUserList } = useAppSelector((state) => state.allUser);
  const [search, setSearch] = useState("");
  //   const [userList, setUsersList] = useState([]);

  const todoWrapper = useRef(null);

  const hasScroll = allUserList.length > 5;
  useScrollbar(todoWrapper, hasScroll);
  const searchHandler = (e: any) => {
    setSearch(e.target.value);
  };

  let usersListSearch = allUserList;
  let s = search.toLowerCase();
  if (search) {
    usersListSearch = usersListSearch.filter((item) => {
      let serchDepartment = item.work.departments.filter((dep) => {
        return dep.toLowerCase().indexOf(s) > -1;
      }).length;

      let searchName =
        item.personalDetail.firstName.toLowerCase().indexOf(s) > -1;

      return serchDepartment || searchName;
    });
  } else {
    usersListSearch = allUserList;
  }

  return (
    <div className={classes.all_users_list}>
      <div>
        <input
          type="search"
          id="search"
          placeholder="Search"
          onChange={searchHandler}
        ></input>
        <div
          style={{
            marginRight: "1px",
            height: hasScroll ? "600px" : "auto",
            minHeight: "50px",
          }}
          ref={todoWrapper}
        >
          <div className={classes.scrolled_users}>
            {usersListSearch.map((user) => (
              <SingleUser key={user.id} userInfo={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersList;
