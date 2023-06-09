import React, { useState, useEffect } from "react";
import styles from "./SelectedReviewers.module.css";
import { personalDetailType } from "../../../model/types/user";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import axios from "axios";
import { personalRequestListType } from "../../../model/types/requestList";
import { showLoading2s } from "../../../features/loadingSlicer";
import { useNavigate } from "react-router-dom";
import BtnSuccess from "../../button/success/BtnSuccess";
import { getAllRequestUserListAPI } from "../../../features/requestUserListSlicer";
import { ReminderText } from "../../../common/types/Reminder";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType[];
  };
  status: number;
}
interface AllUserRequestProps {
  isActive: any;
  requests: any;
}

const SelectedReviewers: React.FC<AllUserRequestProps> = ({
  isActive,
  requests,
}) => {
  const [reminderText, setReminderText] = useState<string>(ReminderText.REMIND);
  const { allUserList } = useAppSelector((state) => state.allUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setReminderText(ReminderText.REMIND);
    dispatch(getAllRequestUserListAPI());
  }, [isActive.id, dispatch]);
  let tempArr: any = [];
  const itemCheck = (item: any) => {
    if (tempArr.indexOf(item.requestUserId) === -1) {
      tempArr.push(item.requestUserId);
      return true;
    }
    return false;
  };

  const sendReminder = async (receiverUserId: string) => {
    setReminderText(ReminderText.REMINDER_BEING_SEND);
    const response = await axios.post("/api/user/notifications/reminder", {
      receiverUserId: receiverUserId,
      msg: "Please send userlist to initiate feedback process",
    });
    const status = response.status;
    if (status === 201) {
      setReminderText(ReminderText.REMINDER_SENT_SUCCESSFULLY);
    } else {
      setReminderText(ReminderText.REMINDER_SENT_ERROR);
    }
  };

  let uniqueRequests = requests.filter((item: any) => itemCheck(item));

  const processSetupUserList = (
    singleRequestedList: personalRequestListType
  ) => {
    if (singleRequestedList.opened) {
      return alert(
        "not allow to create new feedback base on this list becuase it already created before"
      );
    } else {
      showLoading2s(dispatch);
      setTimeout(() => {
        navigate(`${singleRequestedList.id}`);
      }, 2000);
    }
  };
  const renderData = () => {
    let renderDataRequests = uniqueRequests;
    if (isActive) {
      renderDataRequests = renderDataRequests.filter((item: any) => {
        return item.requestUserId === isActive.id;
      });
      if (!renderDataRequests.length) {
        return (
          <div className={styles.selected_reviewers}>
            <h5>This user does't have a list for confirmation </h5>
            <div className={styles.placeholder}></div>
            <button
              className={styles.btn}
              onClick={() =>
                (reminderText === ReminderText.REMIND ||
                  reminderText === ReminderText.REMINDER_SENT_ERROR) &&
                sendReminder(isActive.id)
              }
            >
              {reminderText}
            </button>
          </div>
        );
      }
    }
    return renderDataRequests.map((userlist: any, i: any) => {
      return (
        <div key={userlist.id} className={styles.selected_reviewers}>
          {/* <h2>list order</h2> */}

          <h3>
            Please confirm reviwers for{" "}
            <span>
              {
                checkeUser(userlist.requestUserId as string)?.personalDetail
                  .firstName
              }{" "}
              {
                checkeUser(userlist.requestUserId as string)?.personalDetail
                  .surName
              }
            </span>
          </h3>
          <p>condition: {userlist.opened ? "confirmed" : "not confirmed"}</p>
          {userlist.userList.map(
            (
              item: any,
              index:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined
            ) => {
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
                  </span>
                </article>
              );
            }
          )}
          <BtnSuccess
            callBack={processSetupUserList}
            name={"Process"}
            data={userlist}
          />
        </div>
      );
    });
  };

  const checkeUser = (id: string) => {
    return allUserList.find((e) => e.id === id);
  };
  return <>{renderData()}</>;
};

export default SelectedReviewers;
