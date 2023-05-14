import React from "react";
import styles from "./SingleUser1.module.css";
import { personalDetailType } from "../../../../model/types/user";
import { useAppSelector } from "../../../../app/hooks";

interface SingleUser1Props {
  userInfo: personalDetailType;
  onClickUser: Function;
  isActive: boolean;
  requests: any;
}

const SingleUser1: React.FC<SingleUser1Props> = ({
  userInfo,
  onClickUser,
  isActive,
  requests,
}) => {
  // console.log("requests", requests);
  const userDetails: any = useAppSelector(
    (state) => state.authenticatedUser.userDetails
  );

  // CHECK IF THE USER HAS A LIST OF REVIEWERS
  let listInsideCheck = "none";
  requests.forEach((item: any) => {
    if (item.requestUserId === userInfo.id) {
      listInsideCheck = "one";
    }
  });

  let isActiveStyle = isActive ? "isActive" : "";

  return (
    <article
      className={`${styles.userlist} ${styles[listInsideCheck]} ${styles[isActiveStyle]} `}
      onClick={() => {
        // console.log("userInfo", userInfo);
        onClickUser(userInfo);
      }}
    >
      <div className={styles.single_user_card}>
        <div className={styles.avatar}>
          {userInfo.personalDetail.firstName.charAt(0).toUpperCase()}
        </div>
        <div className={styles.name_department}>
          
            {userInfo.personalDetail.firstName}{" "}
            {userInfo.personalDetail.surName}
            <br />
       
          {userInfo.work.departments[0]}
        </div>
      </div>
    </article>
  );
};

export default SingleUser1;
