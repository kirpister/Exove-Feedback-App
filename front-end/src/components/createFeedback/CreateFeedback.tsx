import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUpConfirmation } from "../../features/feedbackSlice";

function CreateFeedback() {
  const { sendQuestion, listUserId, finalConfirm, sections } = useAppSelector((state) => state.feedback);
  const { userDetails } = useAppSelector((state) => state.authenticatedUser);
  const dispatch = useAppDispatch();
  console.log("user details");
  console.log(userDetails);
  console.log("user list ");
  console.log(listUserId);
  console.log("final confirmation");
  console.log(finalConfirm);

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
      <button
        onClick={() => {
          if (userDetails) {
            dispatch(setUpConfirmation({ createdBy: userDetails?.id, tittle: "giving first back" }));
          }
        }}
      >
        create final feedback data
      </button>
    </div>
  );
}

export default CreateFeedback;
