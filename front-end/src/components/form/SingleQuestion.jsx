import React from "react";
import classes from "./SingleQuestion.module.css";

const SingleQuestion = ({
  question,
  isFreeForm,
  deleteQuestion,
  index_section,
  index_question,
}) => {
  return (
    <div>
      <form action="#" className={classes.single_form}>
        <div>
          <label htmlFor="question"></label>
          <input type="text" id="question" defaultValue={question} />
        </div>
        <div className={classes.symbols}>
          <i className="fa-solid fa-pen"></i>
          <i
            className="fa-solid fa-xmark"
            onClick={() =>
              deleteQuestion(question, index_section, index_question)
            }
          ></i>
          <div>
            <label htmlFor="">Type</label>
            <select id="type" name="type">
              <option value={isFreeForm}>{isFreeForm}</option>
              <option value="string">string</option>
              <option value="number">number</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleQuestion;
