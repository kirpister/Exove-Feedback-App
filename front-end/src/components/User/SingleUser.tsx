import React from "react";
import styles from "./SingleUser.module.css";
import { personalDetailType } from "../../model/types/user";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUserFromSelectRequestList } from "../../features/requestUserListSlicer";
import BtnSmall from "../button/small/BtnSmall";
import arrow from "../../assets/angles-right-solid.svg";

interface SingleUserProps {
  userInfo: personalDetailType;
  button?: string;
  callBack?: VoidFunction;
}

const SingleUser: React.FC<SingleUserProps> = ({ userInfo }) => {
  const { selectedRequesList } = useAppSelector(
    (state) => state.requestUserlist
  );
  const { allUserList } = useAppSelector((state) => state.allUser);
  const dispatch = useAppDispatch();
  const checkDisable = () => {
    if (selectedRequesList) {
      const index = selectedRequesList.userList.findIndex(
        (id) => id === userInfo.id
      );
      if (index !== -1) {
        return true;
      }
    }
    return false;
  };
  const addNewUserToSelectedUserList = (id: string) => {
    dispatch(addUserFromSelectRequestList({ allUserList, id: userInfo.id }));
  };
  return (
    <article className={styles.single_user_card}>
      <div className={styles.avatar_wrapper}>
        <div className={styles.avatar}>
          {userInfo.personalDetail.firstName.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className={styles.user_btn}>
        <span>
          <div>
            {userInfo.personalDetail.firstName}{" "}
            {userInfo.personalDetail.surName}
          </div>
          <div>
            {userInfo.work.departments[0]}, {userInfo.work.roles[0]}
          </div>
        </span>
        <BtnSmall
          callBack={() => {
            addNewUserToSelectedUserList(userInfo.id);
          }}
          // name="❮❮"
          name={<img src={arrow} alt="arrow" className={styles.img} />}
          disabled={checkDisable()}
        />
      </div>
    </article>
  );
};

export default SingleUser;
