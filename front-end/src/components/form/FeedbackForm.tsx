import React, { useEffect } from "react";
import SingleSection from "./SingleSection";
import classes from "./Feedbackform.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreateFeedback from "../createFeedback/CreateFeedback";
import { setUpConfirmation } from "../../features/feedbackSlice";
import { useNavigate } from "react-router-dom";

export interface Question {
  question: string;
  isFreeForm: boolean;
}

export interface Section {
  id: number;
  name: string;
  questions: Question[];
}
const FeedbackForm: React.FC = () => {
  const { sections, sendQuestion } = useAppSelector((state) => state.feedback);
  const { userDetails } = useAppSelector((state) => state.authenticatedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!sections) {
    if (sections.length > 1) {
      return <p>Loading sections...</p>;
    }
  }

  return (
    <>
  
      <div className={classes.dashwrapper}>
        <SingleSection sections={sections} />
        <div>
          {/* <CreateFeedback /> */}
          <button
            className={classes.btn}
            onClick={() => {
              if (userDetails) {
                dispatch(
                  setUpConfirmation({
                    // createdBy: userDetails?.id,
                    title: "giving first back",
                  })
                );
              }
              navigate("confirm");
            }}
          >
            Confirm Final Feedback Form
          </button>
          <button
            className={classes.btn}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <div>total question have been selected: {sendQuestion.length}</div>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
