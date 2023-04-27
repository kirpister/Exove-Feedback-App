import React, { useState } from "react";
import SidebarAdmin from "../../pages/admindash/SidebarAdmin";
import SingleSection from "./SingleSections";
import { store } from "../../app/store";
import getAll from "../../services/sections";
import { useDispatch, useSelector } from "react-redux";

const FeedbackForm1 = () => {
  //const state = store.getState();
  //console.log("state", state);
  //const [sections, setSections] = useState([]);
  //console.log("sections", sections);

  //   const dispatch = useDispatch();
  //   const sections = useSelector((state) => {
  //     state.feedback.sections;
  //     console.log("feedback", state);
  //   });

  const loadSections = async () => {
    const data = await getAll();
    console.log("data", data);
    //setSections(data);
  };
  //   if (sections.length === 0) {
  //     loadSections();
  //   }

  return (
    <>
      <SidebarAdmin />

      <div className="dash-wrapper">
        <div style={{ color: "purple" }}>
          <h1>Feedbackform will be here</h1>
          <SingleSection />
          <SingleSection />
          <SingleSection />
        </div>
      </div>
    </>
  );
};

export default FeedbackForm1;
