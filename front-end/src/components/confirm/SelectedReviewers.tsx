import React, { useState, useEffect } from "react";
import classes from "./userList.module.css";
import { personalRequestListType } from "../../model/types/requestList";
import axios from "axios";
import { personalDetailType } from "../../model/types/user";

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
        <div className={classes.selected_reviewers}>
          <h5>
            Please confirm 5 reviewers for employee Name Surname form IT
            department
          </h5>

          <div>User1</div>
          <div>User2</div>
          <div>User3</div>
          <div>User4</div>
          <div>User5</div>
          <button>Confirm</button>
        </div>
      );
    });
  };

  return <>{renderData()}</>;
};

export default SelectedReviewers;
