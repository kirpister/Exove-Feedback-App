import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setFeedbackRequest } from "../../../features/answerFeedbackSlicer";
import BtnError from "../../../components/button/error/BtnError";
import { deleteRequestFeedbackAPI } from "../../../features/requestFeedback";

function CreatedRequestFeedback() {
  const { selfFeedbackRequests } = useAppSelector((state) => state.requestFeedback);
  const { allUserList } = useAppSelector((state) => state.allUser);
  const dispatch = useAppDispatch();
  const renderRequestFeeback = () => {
    if (selfFeedbackRequests.length > 0) {
      return selfFeedbackRequests.map((selfFeedbackRequest, index) => {
        return (
          <div key={index}>
            list {index + 1}
            {selfFeedbackRequest.requestFeedbackId.opened}
            {selfFeedbackRequest.requestFeedbackId.userList.map((userId, index_1) => {
              return <p key={index_1}>{allUserList.find((e) => e.id === userId)?.personalDetail.firstName}</p>;
            })}
            <BtnError
              callBack={() => {
                deleteRequestFeedback(selfFeedbackRequest.requestFeedbackId.id);
              }}
              name="Delete "
            />
          </div>
        );
      });
    }
    return <>You have no self request feedback</>;
  };
  const deleteRequestFeedback = (id: string) => {
    const confirm = window.confirm("are you sure to delete ?");
    confirm && dispatch(deleteRequestFeedbackAPI(id));
  };
  return <div>{renderRequestFeeback()}</div>;
}

export default CreatedRequestFeedback;
