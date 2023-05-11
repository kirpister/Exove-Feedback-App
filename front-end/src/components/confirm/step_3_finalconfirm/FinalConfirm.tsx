import React, { useEffect } from "react";
import SetupUserList from "../step_2_modify_the_list/SetupUserList";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import SingleUserList from "../step_1_selectList/single_user_list/SingleUserList";
import BtnSuccess from "../../button/success/BtnSuccess";
import { createFeedbackAPI, setUpConfirmation } from "../../../features/feedbackSlice";
import { useNavigate } from "react-router-dom";

function FinalConfirm() {
  const { selectedRequesList } = useAppSelector((state) => state.requestUserlist);
  const { finalConfirm } = useAppSelector((state) => state.feedback);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (finalConfirm) {
      createFeedbackAPI(finalConfirm, dispatch,navigate);
    }
  }, [finalConfirm,dispatch,navigate]);
  const sendToBackend = () => {
    const confirm = window.confirm('are you sure to sent feedback request to those users')
    if ( confirm){
        dispatch(setUpConfirmation({ title: `send feedback to is user Id: ^${selectedRequesList?.requestUserId}^` }));
    }
  };
  return (
    <div>
      <div>
        <div>List of user: </div>
        {selectedRequesList && <SingleUserList singleRequestedList={selectedRequesList} index={1} buttonName={"remove"} />}
      </div>
      <hr />
      <div>
        <BtnSuccess
          callBack={() => {
            sendToBackend();
          }}
          name="send to users"
        />
      </div>
    </div>
  );
}

export default FinalConfirm;