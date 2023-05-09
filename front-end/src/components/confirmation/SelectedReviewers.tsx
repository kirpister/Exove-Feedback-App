import React, { useState, useEffect } from "react";
import styles from "./SelectedReviewers.module.css";
import { personalRequestListType } from "../../model/types/requestList";
import axios from "axios";
import { personalDetailType } from "../../model/types/user";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUpUserList } from "../../features/feedbackSlice";
import SingleUser from "../User/SingleUser";

export interface DataType {
  data: {
    msg: string;
    data: personalDetailType[];
  };
  status: number;
}
interface AllUserRequestProps {
  isActive: any;
}

const SelectedReviewers: React.FC<AllUserRequestProps> = ({ isActive }) => {
  // console.log("isActive", isActive);

  const [requests, setRequests] = useState<any[]>([]);
  let [uniqueRequests, setUniqueRequests] = useState<any[]>([]);
  const { allUserList } = useAppSelector((state) => state.allUser);

  // console.log("all", allUserList);
  // const createListOfUser = () => {};

  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get<personalRequestListType[]>("/feedback/requested_feedback")
      .then((res) => {
        const { data, status } = res as unknown as DataType;
        if (status === 200) {
          setRequests(data.data);
        }
      });
  }, []);
  // console.log("requests", requests);

  // mooving away all duplicated requests from users
  let tempArr: any = [];
  function itemCheck(item: any) {
    // console.log("item", item);
    if (tempArr.indexOf(item.requestUserId) === -1) {
      tempArr.push(item.requestUserId);
      return true;
    }
    return false;
  }
  uniqueRequests = requests.filter((item: any) => itemCheck(item));

  const renderData = () => {
    let renderDataRequests = uniqueRequests;
    if (isActive) {
      renderDataRequests = renderDataRequests.filter((item) => {
        return item.requestUserId === isActive.id;
      });
      if (!renderDataRequests.length) {
        return (
          <div className={styles.selected_reviewers}>
            <h5>This user does't have list for conformation</h5>
            <div className={styles.placeholder}></div>
            <button className={styles.btn}>Remind</button>
          </div>
        );
      }
    }
    return renderDataRequests.map((userlist, i) => {
      // console.log("userlist", userlist);
      return (
        <div key={userlist.id} className={styles.selected_reviewers}>
          <h2>list order {i + 1}</h2>
          <p>
            this list condition: {userlist.opened ? "opened" : "not opened"}
          </p>
          <h6>
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
          </h6>
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
              // console.log("item", item);
              return (
                // <p className={styles.single_user}>
                //   user {index} {checkeUser(item)?.personalDetail.firstName}
                // </p>

                <article className={styles.userlist}>
                  <input type="checkbox" id={styles.id} value={styles.id} />
                  <div>
                    <div className={styles.avatar}>
                      {checkeUser(item)
                        ?.personalDetail.firstName.charAt(0)
                        .toUpperCase()}
                    </div>
                    <span>
                      {checkeUser(item)?.personalDetail.firstName}{" "}
                      {checkeUser(item)?.personalDetail.surName}
                      <br />
                    </span>
                  </div>
                </article>
              );
            }
          )}
          <button
            className={styles.btn}
            onClick={() => {
              userlist.opened
                ? alert(
                    "not allow to create new feedback base on this list becuase it already created before"
                  )
                : dispatch(
                    setUpUserList({
                      listUserId: userlist.userList,
                      requestedListBy: userlist.id,
                    })
                  );
            }}
          >
            Confirm
          </button>
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
