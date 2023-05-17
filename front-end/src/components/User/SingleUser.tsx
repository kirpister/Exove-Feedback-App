import React from "react";
import classes from "./SingleUser.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { personalDetailType } from "../../model/types/user";
import BtnSuccess from "../button/success/BtnSuccess";
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
  const userDetails: any = useSelector(
    (state: RootState) => state.authenticatedUser.userDetails
  );
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
    <article className={classes.single_user_card}>
      <div className={classes.avatar}>
        {userInfo.personalDetail.firstName.charAt(0).toUpperCase()}
      </div>
      <span>
        {userInfo.personalDetail.firstName} {userInfo.personalDetail.surName}
        <br />
        {userInfo.work.departments[0]}, {userInfo.work.roles[0]}
      </span>
      <BtnSmall
        callBack={() => {
          addNewUserToSelectedUserList(userInfo.id);
        }}
        // name="❮❮"
        name={<img src={arrow} className={classes.img} />}
        disabled={checkDisable()}
      />
    </article>
  );
};

export default SingleUser;
