import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";

import ListGroup from "react-bootstrap/ListGroup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateQuestion } from "../../features/feedbackSlice";
import { Question } from "./FeedbackForm";
import styles from "./SingleQuestion.module.css";
import { useSelector } from "react-redux";

interface SingleQuestionProps {
  question: Question;
  index_section: number;
  index_question: number;
  order: number;
}
export enum QuestionType {
  range = "range",
  freeString = "freeString",
}

interface UsedQuestionType {
  order?: number;
  result?: [string];
  type: QuestionType;
  title: string;
}

// 1. user get in --> one select button --> to get all the question to form.
// 2. after click All-Select button --> Confirm Final Feeback will shown.
// 3. click confirm feedback --> get notification -->

const SingleQuestion: React.FC<SingleQuestionProps> = ({ question, index_section, index_question, order }) => {
  const { sendQuestion } = useAppSelector((state) => state.feedback);
  const [state, setState] = useState<UsedQuestionType>({
    type: question.isFreeForm ? QuestionType.freeString : QuestionType.range,
    title: question.question,
    order,
  });
  useEffect(() => {
    const index = sendQuestion.findIndex((e) => e.order === order);
    if (index !== -1) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [sendQuestion, order]);
  const [disable, setDisable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const submitAddNewQuestion = () => {
    setDisable(true);
    dispatch(updateQuestion(state));
  };
  const setType = (value: QuestionType) => {
    setState({ ...state, type: value });
  };
  const setQuestionContent = (value: string) => {
    setState({ ...state, title: value });
  };
  const renderQuestionOption = () => {
    let list = [];
    for (let i in QuestionType) {
      list.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return list;
  };

  return (
    <ListGroup>
      <ListGroup.Item>
        <form action="#" className={styles.single_form}>
          <div>
            <label htmlFor={`question${index_section}_${index_question}`}></label>
            <input
              disabled={disable}
              className={styles.question_input}
              type="text"
              id={`question${index_section}_${index_question}`}
              defaultValue={question.question}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setQuestionContent(e.target.value)}
            />
          </div>
          <div className={styles.symbols}>
            <div className={styles.select_btn}>
              <div>
                <label htmlFor="type"></label>
                <select
                  disabled={disable}
                  id="type"
                  name="type"
                  required
                  defaultValue={question.isFreeForm ? QuestionType.freeString : QuestionType.range}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                    setType(e.target.value as QuestionType)
                  }
                >
                  {renderQuestionOption()}
                </select>
              </div>

              <button className={styles.add_btn} onClick={submitAddNewQuestion} disabled={disable}>
                +
              </button>
            </div>
          </div>
        </form>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SingleQuestion;
