import React from "react";
import Accordion from "react-bootstrap/Accordion";
import SingleQuestion from "./SingleQuestion";

function SingleSection() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>
              <SingleQuestion />
            </li>
            <li>
              <SingleQuestion />
            </li>
            <li>
              <SingleQuestion />
            </li>
            <li>
              <SingleQuestion />
            </li>
            <li>
              <SingleQuestion />
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>question 1</li>
            <li>question 2</li>
            <li>question 3</li>
            <li>question 4</li>
            <li>question 5</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>
  );
}

export default SingleSection;
