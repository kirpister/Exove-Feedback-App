import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import styles from "./singleUser.module.css";
import { useNavigate } from "react-router-dom";
import { setUpUserList } from "../../../../features/feedbackSlice";
import { personalRequestListType } from "../../../../model/types/requestList";

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
    <>
      <h2>list order {index + 1}</h2>
      <p>this list condition: {singleRequestedList.opened ? "opened" : "not opened"}</p>
      <h6>
        Please confirm reviews for{" "}
        <span>
          {checkeUser(singleRequestedList.requestUserId as string)?.personalDetail.firstName}{" "}
          {checkeUser(singleRequestedList.requestUserId as string)?.personalDetail.surName}
        </span>
      </h6>
      {singleRequestedList.userList.map((item: any, index: number) => {
        return (
          <article className={styles.userlist}>
            <input type="checkbox" id={styles.id} value={styles.id} />
            <div>
              <div className={styles.avatar}>{checkeUser(item)?.personalDetail.firstName.charAt(0).toUpperCase()}</div>
              <span>
                {checkeUser(item)?.personalDetail.firstName} {checkeUser(item)?.personalDetail.surName}
                <br />
              </span>
              {buttonName && callBack ? (
                <button
                  onClick={() => {
                    callBack(item);
                  }}
                >
                  {buttonName}
                </button>
              ) : (
                ""
              )}
            </div>
          </article>
        );
      })}
    </>
  );
}

export default SingleUserList;
