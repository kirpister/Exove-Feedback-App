import React from "react";
import classes from "./Confirmation.module.css";

const SelectedReviewers = () => {
  return (
    <div className={classes.selected_reviewers}>
      <h5>
        Please confirm 5 reviewers for employee Name Surname form IT department
      </h5>
      <div>User1</div>
      <div>User2</div>
      <div>User3</div>
      <div>User4</div>
      <div>User5</div>
      <button>Confirm</button>
    </div>
  );
};

export default SelectedReviewers;
