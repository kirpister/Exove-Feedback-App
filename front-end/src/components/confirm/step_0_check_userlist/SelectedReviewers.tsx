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

enum ReminderText {
  REMIND = "Remind",
  REMINDER_BEING_SEND = "Sending...",
  REMINDER_SENT_SUCCESSFULLY = "Reminder sent",
  REMINDER_SENT_ERROR = "Reminder sending failed...",
}

const SelectedReviewers: React.FC<AllUserRequestProps> = ({ isActive, requests }) => {
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
    const response = await axios.post("/user/notifications/reminder", {
      receiverUserId: receiverUserId,
    });
    const status = response.status;
    if (status === 201) {
      setReminderText(ReminderText.REMINDER_SENT_SUCCESSFULLY);
    } else {
      setReminderText(ReminderText.REMINDER_SENT_ERROR);
    }
  };

  let uniqueRequests = requests.filter((item: any) => itemCheck(item));

  const processSetupUserList = (singleRequestedList: personalRequestListType) => {
    if (singleRequestedList.opened) {
      return alert("not allow to create new feedback base on this list becuase it already created before");
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
            <h5>This user does't have list for conformation </h5>
            <div className={styles.placeholder}></div>
            <button
              className={styles.btn}
              onClick={() => (reminderText === ReminderText.REMIND || reminderText === ReminderText.REMINDER_SENT_ERROR) && sendReminder(isActive.id)}
            >
              {reminderText}
            </button>
          </div>
        );
      }
    }
    return renderDataRequests.map((userlist: any, i: any) => {
      // console.log("userlist", userlist);
      return (
        <div key={userlist.id} className={styles.selected_reviewers}>
          <h2>list order</h2>
          <p>this list condition: {userlist.opened ? "opened" : "not opened"}</p>
          <h6>
            Please confirm reviwers for{" "}
            <span>
              {checkeUser(userlist.requestUserId as string)?.personalDetail.firstName}{" "}
              {checkeUser(userlist.requestUserId as string)?.personalDetail.surName}
            </span>
          </h6>
          {userlist.userList.map(
            (
              item: any,
              index:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined
            ) => {
              return (
                <article className={styles.userlist}>
                  {/* <input type="checkbox" id={styles.id} value={styles.id} /> */}
                  <div className={styles.single_user_card}>
                    <div className={styles.avatar}>{checkeUser(item)?.personalDetail.firstName.charAt(0).toUpperCase()}</div>
                    <span>
                      {checkeUser(item)?.personalDetail.firstName} {checkeUser(item)?.personalDetail.surName}
                      {/* <br /> */}
                    </span>
                  </div>
                </article>
              );
            }
          )}
          <BtnSuccess callBack={processSetupUserList} name={"Process"} data={userlist} />
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
