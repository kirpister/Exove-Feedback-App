import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./SingleUser1.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { personalDetailType } from "../../../model/types/user";

interface SingleUser1Props {
  userInfo: personalDetailType;
  onClickUser: Function;
  isActive: boolean;
}

const SingleUser1: React.FC<SingleUser1Props> = ({
  userInfo,
  onClickUser,
  isActive,
}) => {
  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  //let [toggle, setToggle] = useState(false);
  // const toggleUser = () => {
  //   setToggle((toggle) => !toggle);
  //   console.log("toggle", toggle);
  // };

  let toggleClassCheck = isActive ? "isActive" : "";

  return (
    <article
      className={`${classes.userlist} ${classes[toggleClassCheck]}`}
      onClick={() => {
        // console.log("userInfo", userInfo);
        onClickUser(userInfo);
      }}
    >
      <div>
        <div className={classes.avatar}>
          {userDetails.firstName.charAt(0).toUpperCase()}
        </div>
        <span>
          {userInfo.personalDetail.firstName} {userInfo.personalDetail.surName}
          <br />
          {userInfo.work.departments[0]}
        </span>
      </div>
    </article>
  );
};

export default SingleUser1;
