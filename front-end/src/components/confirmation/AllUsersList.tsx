import React, { useState } from "react";
import styles from "./AllUsersList.module.css";
import { personalDetailType } from "../../model/types/user";
import SingleUser1 from "./User1/SingleUser1";

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

  const searchHandler = (e: any) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };

  let usersListSearch = usersList;
  let s = search.toLowerCase();
  if (search) {
    // console.log("search", search);

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

  return (
    <div className={styles.all_users_list}>
      <div>
        <label htmlFor="search"></label>
        <input
          type="search"
          id="search"
          placeholder="Search"
          onChange={searchHandler}
        ></input>
      </div>

      <button className={styles.btn}>Remind All</button>

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
  );
};

export default AllUsersList;
