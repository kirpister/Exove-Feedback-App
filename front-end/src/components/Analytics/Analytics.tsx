import React, { useEffect } from "react";
import Chart from "../Chart/Chart";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import BtnSuccess from "../button/success/BtnSuccess";
const Analytics = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const id = useParams;
  return (
    <div>
      <Chart
        key={id.name}
        answers={state.answers}
        createAt={state.createAt}
        details={state.details}
        id={state.id}
        requestedListBy={state.requestedListBy}
        updatedAt={state.updatedAt}
        userInfo={state.userInfo}
        userList={state.userList}
        createdBy={state.createdBy}
        feedbackTo={state.feedbackTo}
      />
      <div>
        <BtnSuccess
          callBack={() => {
            navigate(-1);
          }}
          name="Back"
        />
      </div>
    </div>
  );
};

export default Analytics;
