import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import styles from "./singleUserList.module.css";
import { personalRequestListType } from "../../../../model/types/requestList";
import BtnSmall from "../../../button/small/BtnSmall";
import del from "../../../../assets/xmark-solid.svg";

interface PropsType {
  singleRequestedList?: personalRequestListType;
  index: number;
  callBack?: (id: string) => void;
  buttonName?: string;
  selfFeedbackRequests?: Array<string>;
}
function SingleUserList(props: PropsType) {
  const {
    singleRequestedList,
    index,
    buttonName,
    callBack,
    selfFeedbackRequests,
  } = props;
  const { allUserList } = useAppSelector((state) => state.allUser);
  const checkeUser = (id: string) => {
    return allUserList.find((e) => e.id === id);
  };
  const render = (singleRequestedList: personalRequestListType) => {
    return (
      <div className={styles.list_wrapper}>
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
              <div className={styles.avatar}>
                {checkeUser(item)
                  ?.personalDetail.firstName.charAt(0)
                  .toUpperCase()}
              </div>

              <span>
                {checkeUser(item)?.personalDetail.firstName}{" "}
                {checkeUser(item)?.personalDetail.surName}
                <br />
                {checkeUser(item)?.work.departments[0]},
                {checkeUser(item)?.work.roles[0]}
              </span>
              {buttonName && callBack ? (
                <BtnSmall
                  callBack={() => {
                    callBack(item);
                  }}
                  // name="X"
                  name={<img src={del} alt="delete" className={styles.img} />}
                />
              ) : (
                ""
              )}
              {/* </div> */}
            </article>
          );
        })}
      </div>
    );
  };
  if (singleRequestedList) {
    return render(singleRequestedList);
  }
  return <>no list</>;
}

export default SingleUserList;
