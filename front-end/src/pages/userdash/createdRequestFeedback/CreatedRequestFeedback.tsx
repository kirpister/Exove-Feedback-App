import React, { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import BtnError from "../../../components/button/error/BtnError";
import { deleteRequestFeedbackAPI } from "../../../features/requestFeedback";
import styles from "./createRequestFeedback.module.css";
import SingleUserList from "../../../components/confirm/step_2_modify_the_list/single_user_list/SingleUserList";

function CreatedRequestFeedback() {
  const { selfFeedbackRequests } = useAppSelector((state) => state.requestFeedback);
  const { allUserList } = useAppSelector((state) => state.allUser);
  console.log(selfFeedbackRequests);
  const dispatch = useAppDispatch();
  const renderRequestFeeback = () => {
    if (selfFeedbackRequests.length > 0) {
      return selfFeedbackRequests.map((selfFeedbackRequest, index) => {
        return (
          <Fragment key={index}>
            <p>Your Request List have {selfFeedbackRequest.requestFeedbackId.opened ? " " : "not"} opened yet</p>
            {selfFeedbackRequest.requestFeedbackId.userList.map((userId, index_1) => {
              return (
                <tr>
                  {index_1 + 1}
                  <td key={index_1}>{allUserList.find((e) => e.id === userId)?.personalDetail.firstName}</td>
                  <td key={index_1}>{allUserList.find((e) => e.id === userId)?.personalDetail.surName}</td>
                  <td key={index_1}>{allUserList.find((e) => e.id === userId)?.work.departments[0]}</td>
                </tr>
              );
            })}
            <BtnError
              callBack={() => {
                deleteRequestFeedback(selfFeedbackRequest.requestFeedbackId.id);
              }}
              name="Delete "
            />
          </Fragment>
        );
      });
    }
    return <p>You have no self request feedback</p>;
  };
  const deleteRequestFeedback = (id: string) => {
    const confirm = window.confirm("are you sure to delete ?");
    confirm && dispatch(deleteRequestFeedbackAPI(id));
  };

  return selfFeedbackRequests.length > 0 ? (
    <div className={styles.requestwrapper}>
      <h2>Selected Request List</h2>
      {/* <table> */}
      {/* <thead>
          <tr>
            <th>Name</th>
            <th></th>
            <th>Departments</th>
          </tr>
        </thead> */}
      {renderRequestFeeback()}
      {/* {<SingleUserList index={3} singleRequestedList={selfFeedbackRequests[0].requestFeedbackId} />} */}

      {/* <BtnError
        callBack={() => {
          deleteRequestFeedback(selfFeedbackRequests[0].requestFeedbackId.id);
        }}
        name="Delete "
        /> */}
      {/* </table> */}
    </div>
  ) : (
    <></>
  );
}

export default CreatedRequestFeedback;
