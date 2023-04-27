import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Question } from "./FeedbackForm1";
import classes from "./SingleQuestion.module.css";

interface SingleQuestionProps {
  question: Question;
  deleteQuestion: (index_section: number, index_question: number) => void;
  index_section: number;
  index_question: number;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
  question,
  deleteQuestion,
  index_section,
  index_question,
}) => {
  console.log("q", question);

  return (
    <ListGroup>
      <ListGroup.Item>
        <form action="#" className={classes.single_form}>
          <div>
            <label
              htmlFor={`question${index_section}_${index_question}`}
            ></label>
            <input
              type="text"
              id={`question${index_section}_${index_question}`}
              defaultValue={question.question}
            />
          </div>
          <div className={classes.symbols}>
            <i className="fa-solid fa-pen"></i>
            <i
              className="fa-solid fa-xmark"
              onClick={() => deleteQuestion(index_section, index_question)}
            ></i>
            <div>
              <label htmlFor="">Type</label>
              <select id="type" name="type">
                <option value="string">string</option>
                <option value="number">number</option>
              </select>
            </div>
          </div>
        </form>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SingleQuestion;
