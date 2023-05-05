import React, { useState, useEffect } from "react";
import classes from "./SelectedReviewers.module.css";
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
  usersRequestList: personalRequestListType[];
}

const SelectedReviewers: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const { allUserList } = useAppSelector((state) => state.allUser);
  console.log("all", allUserList);
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
  console.log("requests", requests);

  const renderData = () => {
    return requests.map((userlist, i) => {
      console.log("userlist", userlist);
      return (
        <div key={userlist.id} className={classes.selected_reviewers}>
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
              console.log("item", item);
              return (
                // <p className={classes.single_user}>
                //   user {index} {checkeUser(item)?.personalDetail.firstName}
                // </p>

                <article className={classes.userlist}>
                  <input type="checkbox" id={classes.id} value={classes.id} />
                  <div>
                    <div className={classes.avatar}>
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
