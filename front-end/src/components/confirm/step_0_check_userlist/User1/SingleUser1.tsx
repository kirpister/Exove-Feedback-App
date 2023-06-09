import React from "react";
import styles from "./SingleUser1.module.css";
import { personalDetailType } from "../../../../model/types/user";
// import { useAppSelector } from "../../../../app/hooks";

interface SingleUser1Props {
  userInfo: personalDetailType;
  onClickUser: Function;
  isActive: boolean;
  requests: any;
  opened?: boolean;
}

const SingleUser1: React.FC<SingleUser1Props> = ({
  userInfo,
  onClickUser,
  isActive,
  requests,
}) => {
  // console.log("requests", requests);
  // const userDetails: any = useAppSelector(
  //   (state) => state.authenticatedUser.userDetails
  // );

  // CHECK IF THE USER HAS A LIST OF REVIEWERS
  let listInsideCheck = "none";
  requests.forEach((item: any) => {
    if (item.requestUserId === userInfo.id) {
      listInsideCheck = "one";
    }
  });

  let isActiveStyle = isActive ? "isActive" : "";
  console.log(isActive);
  return (
    <article
      className={`${styles.single_user_card} ${styles[listInsideCheck]} ${styles[isActiveStyle]} `}
      onClick={() => {
        // console.log("userInfo", userInfo);
        onClickUser(userInfo);
      }}
    >
      <div className={styles.avatar}>
        {userInfo.personalDetail.firstName.charAt(0).toUpperCase()}
      </div>
      <span>
        {userInfo.personalDetail.firstName} {userInfo.personalDetail.surName}
        <br />
        {userInfo.work.departments[0]}
      </span>
    </article>
  );
};

export default SingleUser1;
