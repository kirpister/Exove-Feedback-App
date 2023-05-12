import React, { useEffect } from "react";
import SingleSection from "./SingleSection";
import classes from "./Feedbackform.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreateFeedback from "../createFeedback/CreateFeedback";
import { setUpAllQuestion, setUpConfirmation } from "../../features/feedbackSlice";
import { useNavigate } from "react-router-dom";
import BtnSuccess from "../button/success/BtnSuccess";

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
  const processNext = () => {
    if (userDetails) {
      dispatch(
        setUpConfirmation({
          title: "giving first feedback",
        })
      );
    }
    navigate("confirm");
  };
  const goBack = () => {
    navigate(`/getuserlist`);
  };
  return (
    <>
      <div className={classes.dashwrapper}>
        <SingleSection sections={sections} />
        <div>
          {/* <CreateFeedback /> */}
          {/* <button
            className={classes.btn}
            onClick={() => {
             
            }}
          >
            Confirm Final Feedback Form
          </button> */}
          <BtnSuccess callBack={processNext} name="Confirm Final Feedback Form" key={userDetails?.id} />
          {/* <button
            className={classes.btn}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button> */}
          <BtnSuccess callBack={goBack} name="Go Back" key={userDetails?.id} />
          <BtnSuccess
            callBack={() => {
              dispatch(setUpAllQuestion());
            }}
            name="Select All"
            key={userDetails?.id}
          />
          <div>total question have been selected: {sendQuestion.length}</div>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
