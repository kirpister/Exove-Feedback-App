import React, { useEffect } from "react";
import SingleSection from "./SingleSection";
import classes from "./Feedbackform.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreateFeedback from "../createFeedback/CreateFeedback";
import {
  setUpConfirmation,
  setUpSelectAllQuestion,
} from "../../features/feedbackSlice";
import { useNavigate } from "react-router-dom";
import BtnSuccess from "../button/success/BtnSuccess";
import { showLoading2s } from "../../features/loadingSlicer";
import LoadingPage from "../LoadingPage/LoadingPage";

export interface Question {
  question: string;
  isFreeForm: boolean;
  order: number;
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
      return <LoadingPage />;
    }
  }
  const processNext = () => {
    if (userDetails) {
      dispatch(
        setUpConfirmation({
          title: "giving first feedback",
        })
      );
      navigate("confirm");
    }
  };
  const goBack = () => {
    navigate(`/getuserlist`);
  };
  return (
    <>
      <div className={classes.dashwrapper}>
        <SingleSection sections={sections} />
        <div className={classes.btnDiv}>
          <BtnSuccess
            callBack={() => {
              showLoading2s(dispatch);
              dispatch(setUpSelectAllQuestion());
            }}
            name="Select All"
            key={userDetails?.id}
          />
          <p style={{marginTop: "1rem", fontSize: "1.3rem"}}>Total questions selected: {sendQuestion.length}</p>
          </div>
          <CreateFeedback />
        
      </div>
    </>
  );
};

export default FeedbackForm;
