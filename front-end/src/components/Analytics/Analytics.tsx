import React, { useEffect, useState } from "react";
import Chart from "../Chart/Chart";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import BtnSuccess from "../button/success/BtnSuccess";
import { goBackRouter } from "../../services/helper";
import { useAppDispatch } from "../../app/hooks";
import PdfDownload from "../Chart/pdf_download/pdf_download/PdfDownload";
import SingleUserFeedback from "../allfeedbacks/singleFeedback/SingleUserFeedback";
import { Accordion, ListGroup } from "react-bootstrap";

const Analytics = () => {
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useParams;
  const renderSingleAnswers = (eventKey: boolean) => {
    return state.answers.map((item: any, index: number) => {
      return (
        <Accordion.Item eventKey={`${eventKey ? 0 : index + 1}`}>
          <Accordion.Header>Answer from {item.user.personalDetail.firstName}</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              <ListGroup.Item>
                <SingleUserFeedback answerDetail={item} />
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  };
  return (
    <div>
      <PdfDownload
        chartElement={<Chart {...state} key={id} />}
        tableElement={<Accordion defaultActiveKey={["0"]}>{renderSingleAnswers(show)}</Accordion>}
        openAll={() => setShow(true)}
        closeAll={() => setShow(false)}
      />
      <BtnSuccess
        callBack={() => {
          // navigate(-1);
          goBackRouter(dispatch, navigate);
        }}
        name="Back"
      />
    </div>
  );
};

export default Analytics;
