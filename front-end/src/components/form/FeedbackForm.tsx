import React, { useEffect } from "react";
import SidebarAdmin from "../../pages/admindash/SidebarAdmin";
import SingleSection from "./SingleSection";
import classes from "./Feedbackform.module.css";
import { useAppSelector } from "../../app/hooks";
import CreateFeedback from "../createFeedback/CreateFeedback";

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

  useEffect(() => {
    console.log("sections", sections);
    console.log("sendQ", sendQuestion);
  }, []);

  if (!sections) {
    if (sections.length > 1) {
      return <p>Loading sections...</p>;
    }
  }

  const deleteQuestion = (
    index_section: number,
    index_question: number
  ): void => {
    console.log("index_q", index_question);
    console.log("index_s", index_section);
    // sections[index_section].questions.splice(index_question, 1);
    // [...sections];
  };

  return (
    <>
      {/* <SidebarAdmin /> */}
      <div className={classes.dashwrapper}>
        <SingleSection sections={sections} deleteQuestion={deleteQuestion} />
        <div>
          <CreateFeedback />
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
