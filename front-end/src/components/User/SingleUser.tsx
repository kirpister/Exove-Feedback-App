import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SingleUser.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { personalDetailType } from "../../model/types/user";

interface SingleUserProps {
  userInfo: personalDetailType;
}

const SingleUser: React.FC<SingleUserProps> = ({ userInfo }) => {
  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );

  return (
    <NavLink to="#">
      <article className={classes.userlist}>
        <div>
          <div className={classes.avatar}>
            {userDetails.firstName.charAt(0).toUpperCase()}
          </div>
          <span>
            {userInfo.personalDetail.firstName}{" "}
            {userInfo.personalDetail.surName}
            <br />
            {userInfo.work.departments[0]}
          </span>
        </div>
      </article>
    </NavLink>
  );
};

export default SingleUser;
