import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import styles from "./singleUserList.module.css";
import { useNavigate } from "react-router-dom";
import { setUpUserList } from "../../../../features/feedbackSlice";
import { personalRequestListType } from "../../../../model/types/requestList";
import BtnSmall from "../../../button/small/BtnSmall";
import BtnSuccess from "../../../button/success/BtnSuccess";
// import BtnSuccess from "../../../button/success/BtnSuccess";
// import BtnError from "../../../button/error/BtnError";

interface PropsType {
  singleRequestedList: personalRequestListType;
  index: number;
  callBack?: (id: string) => void;
  buttonName?: string;
}
function SingleUserList(props: PropsType) {
  const { singleRequestedList, index, buttonName, callBack } = props;
  const { allUserList } = useAppSelector((state) => state.allUser);
  const checkeUser = (id: string) => {
    return allUserList.find((e) => e.id === id);
  };
  return (
    <div className={styles.list_wrapper}>
      {/* <h2>list order </h2> */}
      {/* <p>
        this list condition:{" "}
        {singleRequestedList.opened ? "opened" : "not opened"}
      </p> */}
      <h3>
        Please confirm reviews for{" "}
        <span>
          {
            checkeUser(singleRequestedList.requestUserId as string)
              ?.personalDetail.firstName
          }{" "}
          {
            checkeUser(singleRequestedList.requestUserId as string)
              ?.personalDetail.surName
          }
        </span>{" "}
        or modify the list.
      </h3>
      {singleRequestedList.userList.map((item: any, index: number) => {
        return (
          <article className={styles.single_user_card}>
            {/* <input type="checkbox" id={styles.id} value={styles.id} /> */}
            {/* <div> */}
            <div className={styles.avatar_wrapper}>
              <div className={styles.avatar}>
                {checkeUser(item)
                  ?.personalDetail.firstName.charAt(0)
                  .toUpperCase()}
              </div>
            </div>

            <div className={styles.span_btn}>
              <span>
                {checkeUser(item)?.personalDetail.firstName}{" "}
                {checkeUser(item)?.personalDetail.surName}
                <br />
              </span>
              {buttonName && callBack ? (
                <BtnSmall
                  callBack={() => {
                    callBack(item);
                  }}
                  name="X"
                />
              ) : (
                ""
              )}
              {/* </div> */}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default SingleUserList;
