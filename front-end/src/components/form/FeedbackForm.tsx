import React, { useState, ChangeEvent, useEffect } from "react";
import SidebarAdmin from "../../pages/admindash/SidebarAdmin";
import SingleSection from "./SingleSections";
//import { store } from "../../app/store";
//import getAll from "../../services/sections";
//import { useDispatch, useSelector } from "react-redux";
import classes from "./Feedbackform.module.css";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";

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
  // const [sections, setSections] = useState<Section[]>([]);
  const { sections, sendQuestion } = useAppSelector((state) => state.feedback);

  useEffect(() => {
    console.log(sections);
    console.log(sendQuestion);
  }, []);
  // const loadSections = () => {
  //   axios.get<Section[]>("http://localhost:3006/sections").then((res) => {
  //     setSections([...res.data]);
  //   });
  // };

  // if (sections.length === 0) {
  //   loadSections();
  // }

  if (!sections) {
    return <p>Loading sections...</p>;
  }

  const deleteQuestion = (index_section: number, index_question: number): void => {
    console.log("index_q", index_question);
    console.log("index_s", index_section);

    // sections[index_section].questions.splice(index_question, 1);
    // setSections([...sections]);
  };

  return (
    <div className="admindash_wrapper">
      <SidebarAdmin />

      <div className="dash-wrapper" style={{ color: "purple" }}>
        <SingleSection sections={sections} deleteQuestion={deleteQuestion} />
        {/* <button onClick={() => postFeedbackForm}>Send</button> */}
      </div>
    </div>
  );
};

export default FeedbackForm;
