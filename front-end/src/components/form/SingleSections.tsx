import React from "react";
import Accordion from "react-bootstrap/Accordion";
import SingleQuestion from "./SingleQuestion";
import { Section } from "./FeedbackForm";

interface SingleSectionProps {
  sections: Section[];
  deleteQuestion: (index_section: number, index_question: number) => void;
}

const SingleSection: React.FC<SingleSectionProps> = ({ sections, deleteQuestion }) => {
  return (
    <>
      {sections.map((section, i, changeHandler) => {
        return (
          <>
            <h3>{i +1}. Select question from the list of topic below:  </h3>
            <Accordion defaultActiveKey="0" key={section.id}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <label htmlFor="section"></label>
                  <i className="fa-solid fa-chevron-down"></i>
                  <input type="text" defaultValue={section.name} />
                </Accordion.Header>
                <Accordion.Body>
                  {section.questions.map((question, j) => {
                    return <SingleQuestion key={j} question={question} deleteQuestion={deleteQuestion} index_section={i} index_question={j} />;
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        );
      })}
    </>
  );
};

export default SingleSection;
