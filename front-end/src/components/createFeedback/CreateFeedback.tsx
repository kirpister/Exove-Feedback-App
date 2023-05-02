import React from "react";
import { useAppSelector } from "../../app/hooks";

function CreateFeedback() {
  const { sendQuestion } = useAppSelector((state) => state.feedback);
  const renderQuestion = () => {
    return sendQuestion.map((question, index) => {
      return (
        <div>
          <p>order: {question.order}</p>
          <p>
            title:
            {question.title}
          </p>
          <p>type: {question.type}</p>
        </div>
      );
    });
  };
  return (
    <div>
      <h2>create feedback form</h2>
      <div>{renderQuestion()}</div>
    </div>
  );
}

export default CreateFeedback;
