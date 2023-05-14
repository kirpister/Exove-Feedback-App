import React, { useState, useRef } from "react";
import styles from "./AllUsersList.module.css";
import { personalDetailType } from "../../../model/types/user";
import SingleUser1 from "./User1/SingleUser1";
import { useScrollbar } from "../../../app/use-scrollbar";

interface AllUserProps {
  usersList: personalDetailType[];
  onClickUser: Function;
  isActive: personalDetailType | undefined;
  requests: any;
}

const AllUsersList: React.FC<AllUserProps> = ({
  usersList,
  onClickUser,
  isActive,
  requests,
}) => {
  const [search, setSearch] = useState("");

  const todoWrapper = useRef(null);

  const hasScroll = usersList.length > 5;
  useScrollbar(todoWrapper, hasScroll);

  const searchHandler = (e: any) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };

  let usersListSearch = usersList;
  let s = search.toLowerCase();
  if (search) {
    usersListSearch = usersListSearch.filter((item) => {
      // console.log("item", item);
      let serchDepartment = item.work.departments.filter((dep) => {
        return dep.toLowerCase().indexOf(s) > -1;
      }).length;

      let searchName =
        item.personalDetail.firstName.toLowerCase().indexOf(s) > -1;

      return serchDepartment || searchName;
    });
  } else {
    usersListSearch = usersList;
  }

  // Adding userRequest property to the usersListSearch = usersList
  usersListSearch = usersListSearch.map((item) => {
    let requestedUserList = requests.filter((singleRequest: any) => {
      return singleRequest.requestUserId === item.id;
    });
    // console.log("RUL", requestedUserList);
    return {
      ...item,
      userRequest: requestedUserList,
    };
  });

  console.log("search", usersListSearch);
  // Sorting function to display users with list for conformation inside first.
  usersListSearch.sort((a, b) => {
    return b.userRequest.length - a.userRequest.length;
  });

  return (
    <div className={styles.all_users_list}>
      <div>
        <input
          type="search"
          id="search"
          placeholder="Search"
          onChange={searchHandler}
        ></input>
      </div>

      <button className={styles.btn}>Remind All</button>
      <div
        style={{
          marginRight: "1px",
          height: hasScroll ? "600px" : "auto",
          minHeight: "50px",
        }}
        ref={todoWrapper}
      >
        <div className={styles.scrolled_users}>
          {usersListSearch.map((user) => (
            <SingleUser1
              key={user.id}
              userInfo={user}
              onClickUser={onClickUser}
              requests={requests}
              isActive={isActive !== undefined && user.id === isActive.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsersList;
