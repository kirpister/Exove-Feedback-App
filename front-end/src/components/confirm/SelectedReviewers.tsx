import React, { useState, useEffect } from "react";
import classes from "./userList.module.css";
import { personalRequestListType } from "../../model/types/requestList";
import axios from "axios";
import { personalDetailType } from "../../model/types/user";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUpUserList } from "../../features/feedbackSlice";

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
  console.log(allUserList);
  const createListOfUser = () => {};
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get<personalRequestListType[]>("/feedback/requested_feedback").then((res) => {
      const { data, status } = res as unknown as DataType;
      if (status === 200) {
        setRequests(data.data);
      }
    });
  }, []);
  console.log("requests", requests);

  const renderData = () => {
    return requests.map((userlist, i) => {
      return (
        <div className={classes.selected_reviewers}>
          <h2>list order {i + 1}</h2>
          <p>this list condition: {userlist.opened ? "opened" : "not opened"}</p>
          <p>
            created by
            {
              checkeUser(userlist.requestUserId as string)?.personalDetail.firstName
              // ? checkeUser(userlist.requestUserId):''
            }
          </p>
          <h5>Please confirm 5 reviewers for employee Name Surname form IT department</h5>
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
                <p>
                  user {index} id : {checkeUser(item)?.personalDetail.firstName}
                </p>
              );
            }
          )}
          <button
            onClick={() => {
              userlist.opened
                ? alert("not allow to create new feedback base on this list becuase it already created before")
                : dispatch(setUpUserList({ listUserId: userlist.userList, requestedListBy: userlist.id }));
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
