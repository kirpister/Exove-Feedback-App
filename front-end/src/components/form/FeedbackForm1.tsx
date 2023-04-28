import React, { useState } from "react";
import SidebarAdmin from "../../pages/admindash/SidebarAdmin";
import SingleSection from "./SingleSections";
//import { store } from "../../app/store";
//import getAll from "../../services/sections";
//import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export interface Question {
  question: string;
  isFreeForm: boolean;
}

export interface Section {
  id: number;
  name: string;
  questions: Question[];
}
const FeedbackForm1: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  console.log("sections", sections);

  const loadSections = () => {
    axios.get<Section[]>("http://localhost:3006/sections").then((res) => {
      setSections([...res.data]);
    });
  };

  if (sections.length === 0) {
    loadSections();
  }

  if (!sections.length) {
    return <p>Loading sections...</p>;
  }
  console.log(sections);

  const deleteQuestion = (
    index_section: number,
    index_question: number
  ): void => {
    console.log(index_question);
    console.log(index_section);
    let s = sections;
    s[index_section].questions.splice(index_question, 1);
    setSections([...s]);
  };

  return (
    <>
      <SidebarAdmin />

      <div className="dash-wrapper" style={{ color: "purple" }}>
        <SingleSection sections={sections} deleteQuestion={deleteQuestion} />
      </div>
    </>
  );
};

export default FeedbackForm1;
