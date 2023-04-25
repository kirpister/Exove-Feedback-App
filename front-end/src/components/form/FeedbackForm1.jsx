import React, { useState } from "react";
import axios from "axios";

import SingleSection from "./SingleSection";

const FeedbackForm1 = () => {
  const [section1, setSection1] = useState([]);

  console.log("sss", section1);

  const loadSections = () => {
    axios.get("http://localhost:3005/sections").then((res) => {
      setSection1([...res.data]);
    });
  };

  if (section1.length === 0) {
    loadSections();
  }

  if (!section1.length) {
    return <p>Loading sections...</p>;
  }
  console.log(section1);

  const deleteQuestion = (questionDel, index_section, index_question) => {
    console.log(index_question);
    console.log(index_section);
    let s = section1;
    s[index_section].questions.splice(index_question, 1);
    setSection1([...s]);
  };

  return (
    <div>
      <h1>Feedback form will be here</h1>
      <SingleSection sections={section1} deleteQuestion={deleteQuestion} />
    </div>
  );
};

export default FeedbackForm1;
