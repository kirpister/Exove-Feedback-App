import React from "react";
import Accordion from "react-bootstrap/Accordion";
import SingleQuestion from "./SingleQuestion";
import { Section } from "./FeedbackForm";
import styles from "./SingleSection.module.css";

interface SingleSectionProps {
  sections: Section[];
  // deleteQuestion: (index_section: number, index_question: number) => void;
}

const SingleSection: React.FC<SingleSectionProps> = ({ sections }) => {
  return (
    <>
      {sections.map((section, i, changeHandler) => {
        return (
          <Accordion defaultActiveKey="0" key={section.id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ backgroundColor: "white" }}>
                <label htmlFor="section"></label>
                <input
                  type="text"
                  className={styles.section_input}
                  defaultValue={section.name}
                />
              </Accordion.Header>
              <Accordion.Body style={{ margin: ".2rem" }}>
                {section.questions.map((question, j) => {
                  return (
                    <div className={styles.questions}>
                      <SingleQuestion
                        order={question.order}
                        key={`${i}${j}`}
                        question={question}
                        // deleteQuestion={deleteQuestion}
                        index_section={i}
                        index_question={j}
                      />
                    </div>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </>
  );
};

export default SingleSection;

//  <h3>{i + 1}. Select question from the list of topic below: </h3>
