import React, { ReactComponentElement, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { QuestionType } from "../../../components/form/SingleQuestion";
import BtnSuccess from "../../../components/button/success/BtnSuccess";
import axios from "axios";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

import { Accordion } from 'react-bootstrap';



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
    console.log({answers:data})
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

          <Accordion defaultActiveKey="1" style={{ margin: ".5rem", width: "95%" }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header> 
              <>
              <div className={styles.accordionheader}>
                <h2>{title}</h2>
                <div className={styles.finishdiv} style={{ backgroundColor: finished ? '#64e764' : '#FA2A55' }}>
                  {finished ? 'Finished' : 'Not Finished'}
                  </div></div></>
            </Accordion.Header>

            <Accordion.Body>

                <div>
                  {questions.map((question, i) => {
                    const { order, title, type } = question;
                    return (
                      <div key={order}>
                        <label className={styles.questionlabel}>
                          <span className={styles.numberspan}>{order}.</span> {title}
                        </label>
                        {type === QuestionType.freeString ? (
                          <textarea
                            className={styles.textarea}
                            onChange={(e) => {
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
                        submitAnswer(feedbackId.id, answers);
                      }}
                      key={index}
                    />
                  )}
                </div>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>
     
        );
      });
    } else {
      <p>You currently have no feedback requests!</p>;
    }
  };
  return <div className={styles.wrapper}>
          <h2 className={styles.headerh2}>{t("feedbackheader")}</h2>
          <div className={styles.instructions}>
          <p>{t("instruction")}</p>
          <p>{t("scale")}</p>
          <p>{t("scale1")}</p>
          <p>{t("scale2")}</p>
          <p>{t("scale3")}</p>
          <p>{t("scale4")}</p>
          <p>{t("scale5")}</p>

          </div>
          
          <div className={styles.formwrapper}></div>
          {renderFeedback()}</div>;
}

export default Feedbackform;
