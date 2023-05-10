import React, { ReactComponentElement, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { QuestionType } from "../../../components/form/SingleQuestion";
import BtnSuccess from "../../../components/button/success/BtnSuccess";
import axios from "axios";
interface AnswerFeedbackType {
  answers: Array<{ order: number; answer: Array<string | number> }>;
}
function Feedbackform() {
  const { feedbackRequest } = useAppSelector((state) => state.answerFeedback);
  const [answers, setAnswers] = useState<Array<{ order: number; answer: Array<string | number> }>>([]);
  const renderRadioButton = (title: string, order: number) => {
    let value = [<></>];
    for (let i = 1; i <= 5; i++) {
      value.push(
        <label htmlFor="">
          <span>{i}</span>
          <input
            type="radio"
            value={i}
            name={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
              setAnswers((prev) => {
                const temp = [...prev];
                const currentValue = Number(e.target.value);
                const index = temp.findIndex((e) => e.order === order);
                if (index !== -1) {
                  temp[index].answer = [currentValue];
                } else {
                  temp.push({ order, answer: [currentValue] });
                }
                return [...temp];
              });
            }}
          />
        </label>
      );
    }
    return value;
  };
  const submitAnswer = (feedbackId: string, data: any) => {
    axios
      .patch(`user/feedback?feedbackId=${feedbackId}`, {answers: data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const renderFeedback = () => {
    if (feedbackRequest.length > 0) {
      return feedbackRequest.map((request, index) => {
        const { feedbackId, finished } = request;

        const { questions, title } = feedbackId.details;
        return (
          <div>
            <p> {finished ? "finished" : "not finish"}</p>
            <p> feedback Id: {feedbackId.id}</p>
            <p> order: {index + 1}</p>
            <h2>{title}</h2>
            <div>
              {questions.map((question, i) => {
                const { order, title, type } = question;
                return (
                  <div>
                    <label>
                      {" "}
                      order:{order} {title}
                    </label>
                    {type === QuestionType.freeString ? (
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                          setAnswers((prev) => {
                            const temp = [...prev];
                            const currentValue = e.target.value;
                            const index = temp.findIndex((e) => e.order === order);
                            if (index !== -1) {
                              temp[index].answer = [currentValue];
                            } else {
                              temp.push({ order, answer: [currentValue] });
                            }
                            return [...temp];
                          });
                        }}
                        type="text"
                      />
                    ) : (
                      <div>{renderRadioButton(title, order)}</div>
                    )}
                  </div>
                );
              })}
              {!finished && (
                <BtnSuccess
                  name="submit"
                  callBack={() => {
                    submitAnswer(feedbackId.id,answers)
                  }}
                  key={index}
                />
              )}
            </div>
            <hr />
          </div>
        );
      });
    } else {
      <>you have no feedback request </>;
    }
  };
  return <div>{renderFeedback()}</div>;
}

export default Feedbackform;
