import React, { ReactComponentElement, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { QuestionType } from "../../../components/form/SingleQuestion";
import BtnSuccess from "../../../components/button/success/BtnSuccess";
import axios from "axios";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";



interface AnswerFeedbackType {
  answers: Array<{ order: number; answer: Array<string | number> }>;
}

function Feedbackform() {

  const { t } = useTranslation<"trans">("trans");
  const { feedbackRequest } = useAppSelector((state) => state.answerFeedback);

  const [answers, setAnswers] = useState<Array<{ order: number; answer: Array<string | number> }>>([]);

  const renderRadioButton = (title: string, order: number) => {
    let value = [<></>];
    for (let i = 1; i <= 5; i++) {
      value.push(
        <div className={styles.formwrapper}>
        <div className={styles.radiodiv}>
        <label>
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
        </div>
        </div>
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
          <>
          <div className={styles.wrapper}>
             <h2>{title}</h2>
            <p> {finished ? "finished" : "not finished"}</p>
            <p> feedback Id: {feedbackId.id}</p>
            <p> order: {index + 1}</p>
         
            <div className={styles.formwrapper}>
              {questions.map((question, i) => {
                const { order, title, type } = question;
                return (
                  <div>
                    <label>
                      {" "}
                      {order}. {title}
                    </label>
                    {type === QuestionType.freeString ? (
                      <textarea className={styles.textarea}
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
                        
                      />
                    ) : (
                      <div className={styles.radiodiv}>{renderRadioButton(title, order)}</div>
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
          </div></>
        );
      });
    } else {
      <>you have no feedback request </>;
    }
  };
  return <div className={styles.wrapper}>
          <h2>{t("feedbackheader")}</h2>
          <div className={styles.instructions}>
          <p>{t("instruction")}</p>
          <p>{t("scale")}</p>
          <p>{t("scale1")}</p>
          <p>{t("scale2")}</p>
          <p>{t("scale3")}</p>
          <p>{t("scale4")}</p>
          <p>{t("scale5")}</p>

          </div>
          
          {renderFeedback()}</div>;
}

export default Feedbackform;
