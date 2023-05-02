import React, { FormEvent, FormEventHandler, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { useAppDispatch } from "../../app/hooks";
import { updateQuestion } from "../../features/feedbackSlice";
import { Question } from "./FeedbackForm";
import classes from "./SingleQuestion.module.css";

interface SingleQuestionProps {
  question: Question;
  deleteQuestion: (index_section: number, index_question: number) => void;
  index_section: number;
  index_question: number;
}
export enum QuestionType {
  selection = "selection",
  range = "range",
  freeString = "freeString",
}

interface UsedQuestionType {
  order?: number;
  result?: [string];
  type: QuestionType;
  title: string;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ question, deleteQuestion, index_section, index_question }) => {
  const [state, setState] = useState<UsedQuestionType>({
    type: QuestionType.selection,
    title: question.question,
  });
  const dispatch = useAppDispatch();
  const submitAddNewQuestion = (e: FormEvent) => {
    console.log("submit");
    e.preventDefault();
    console.log(state)
    // dispatch(updateQuestion(state));
  };
  const setType = (value: QuestionType) => {
    setState({ ...state, type: value });
  };
  const renderQuestionOption = () => {
    let list = [<></>];
    for (let i in QuestionType) {
      list.push(<option value={i}>{i}</option>);
    }
    return list;
  };


  return (
    <ListGroup>
      <ListGroup.Item>
        <form action="#" className={classes.single_form} onSubmit={submitAddNewQuestion}>
          <div>
            <label htmlFor={`question${index_section}_${index_question}`}></label>
            <input type="text" id={`question${index_section}_${index_question}`} defaultValue={question.question} />
          </div>
          <div className={classes.symbols}>
            <i className="fa-solid fa-pen"></i>
            <i className="fa-solid fa-xmark" onClick={() => deleteQuestion(index_section, index_question)}></i>
            <div>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                  setType(e.target.value as QuestionType)
                }
              >
                {renderQuestionOption()}
              </select>
              <button type="submit">Add +</button>
            </div>
          </div>
        </form>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SingleQuestion;
