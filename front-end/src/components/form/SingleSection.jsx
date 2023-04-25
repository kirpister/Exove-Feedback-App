import React from "react";
import SingleQuestion from "./SingleQuestion";
import classes from "./SingleSection.module.css";

const SingleSection = ({ sections, deleteQuestion }) => {
  return (
    <div>
      {sections.map((e, i) => {
        return (
          <div key={i}>
            <div className={classes.section}>
              <label htmlFor="section"></label>
              <i className="fa-solid fa-chevron-down"></i>
              <input type="text" defaultValue={e.name} />
              <div>
                {e.questions.map((q, j) => {
                  return (
                    <SingleQuestion
                      key={j}
                      {...q}
                      deleteQuestion={deleteQuestion}
                      index_section={i}
                      index_question={j}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleSection;
