import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./SingleQuestion.module.css";

const SingleQuestion = () => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <form action="#" className={classes.single_form}>
          <div>
            <label htmlFor="question"></label>
            <input type="text" id="question" />
          </div>
          <div className={classes.symbols}>
            <i className="fa-solid fa-pen"></i>
            <i className="fa-solid fa-xmark"></i>
            <div>
              <label htmlFor="">Type</label>
              <select id="type" name="type">
                {/* <option value={isFreeForm}>{isFreeForm}</option> */}
                <option value="string">string</option>
                <option value="number">number</option>
              </select>
            </div>
          </div>
        </form>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SingleQuestion;
