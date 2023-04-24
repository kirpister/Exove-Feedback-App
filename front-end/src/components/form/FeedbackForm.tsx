import React from "react";
import { Formik, Field, Form } from "formik";

const initialValues = {
  "q1.1": "",
  "q1.2": "",
  "q1.3": "",
  "q1.4": "",
  "q1.5": "",
  "q1.6": "",
};

// HARD CODED BAD, FIX WHEN DB READY

const FeedbackForm: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <div className="wrapper">
        <h2 className="title-h2">Assessment</h2>
        <div className="feedback-instructions">
          <p>
            We collect feedback yearly. This is an essential tool for developing
            as professionals for all of us so please fill this form carefully.
            Especially open comments are much appreciated!
          </p>

          <p className="underline">Few reminders! </p>
          <p>
            - You are also evaluating your competence manager with the same
            form. Please consider them first and foremost as a manager, not
            through their specialist role.
          </p>
          <p>
            - Project Managers are evaluating all the employees working in
            client projects, and are doing the evaluation from the client
            perspective. PM can also be asked to give feedback as a colleague.
          </p>

          <p className="underline">Grading Guidance!</p>
          <p>The scale is 1-5 as follows: </p>
          <p>1 - Performs fully below expectations</p>
          <p>2 - Performs partially under expectations</p>
          <p>3 - Performs on the expected level, nothing to complain.</p>
          <p>
            4 - Performance exceeds expectations, in your view the person in
            doing more than you think is expected on the job type or lever the
            person is currently working on.
          </p>
          <p>
            5 - Performance exceeds expectations fully in this area, person is
            performing on the next level and should be promoted to a higher
            level to a more demanding role.{" "}
          </p>
        </div>

        <div className="form-wrapper">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form>
                <div className="instructions"></div>

                <div className="selection-div">
                  <label htmlFor="colleague">
                    Who do you want to give feedback to?
                  </label>
                  <Field
                    component="select"
                    id="colleague"
                    name="colleague"
                    defaultValue={"choice"}
                    //  multiple={true}
                  >
                    <option value="choice" disabled={true}>
                      Choose One
                    </option>
                    <option value="marina">Marina</option>
                    <option value="preeti">Preeti</option>
                    <option value="tuan">Tuan</option>
                    <option value="jenni">Jenni</option>
                  </Field>
                </div>

                {/* ----------- QUALITY FOCUS ------------ */}

                <h2>Quality Focus</h2>
                <div className="radio-div">
                  <p>Q1.1: The person produces high quality product</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q1.1" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q1.1" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q1.1" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q1.1" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q1.1" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q1.2: The person aims to improve the quality of the end
                    result beyond expressed requirements
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q1.2" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q1.2" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q1.2" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q1.2" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q1.2" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q1.3: The person is living by the company values (passion,
                    expertise, openness and care)
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q1.3" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q1.3" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q1.3" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q1.3" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q1.3" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>Q1.4: The person is aligned with company best practices</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q1.4" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q1.4" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q1.4" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q1.4" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q1.4" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q1.5: The person delivers quality even with limited
                    resources (time, resources, information, guidance)
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q1.5" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q1.5" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q1.5" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q1.5" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q1.5" value="5" />
                  </label>
                </div>

                <div>
                  <p>Q1.6: Feedback about the person's quality focus</p>
                  <Field name="q1.6" as="textarea" />
                </div>

                {/* ----------- PEOPLE SKILLS ------------ */}

                <h2>People Skills</h2>
                <div className="radio-div">
                  <p>Q2.1: The person is willingly helping others</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q2.1" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q2.1" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q2.1" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q2.1" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q2.1" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q2.2: The person takes other people's views into
                    consideration
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q2.2" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q2.2" value="2.2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q2.2" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q2.2" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q2.2" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q2.3: The person isn't afraid to ask for help from others
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q2.3" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q2.3" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q2.3" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q2.3" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q2.3" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q2.4: The person has a good attitude towards all the aspects
                    of their work
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q2.4" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q2.4" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q2.4" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q2.4" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q2.4" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>Q2.5: The person shares knowledge openly to others</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q2.5" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q2.5" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q2.5" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q2.5" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q2.5" value="5" />
                  </label>
                </div>

                <div>
                  <p>Q2.6: Other feedback about the persons people skills</p>
                  <Field name="q2.6" as="textarea" />
                </div>

                {/* ----------- SELF GUIDANCE ------------ */}

                <h2>Self Guidance</h2>
                <div className="radio-div">
                  <p>Q3.1: The person has good prioritisation skills</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q3.1" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q3.1" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q3.1" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q3.1" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q3.1" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q3.2: The person can see our work from the client's
                    perspective (note: the client can be internal)
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q3.2" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q3.2" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q3.2" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q3.2" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q3.2" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>Q3.3: The person has a positive attitude</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q3.3" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q3.3" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q3.3" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q3.3" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q3.3" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q3.4: The person has a proactive way to take things forward
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q3.4" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q3.4" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q3.4" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q3.4" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q3.4" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>Q3.5: The person is productive working independently</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q3.5" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q3.5" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q3.5" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q3.5" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q3.5" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q3.6: The person can take good care of personal workload by
                    prioritizing and delegating
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q3.6" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q3.6" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q3.6" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q3.6" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q3.6" value="5" />
                  </label>
                </div>

                <div>
                  <p>Q3.7: Other feedback about self-guidance</p>
                  <Field name="q3.7" as="textarea" />
                </div>

                {/* ----------- LEADERSHIP ------------ */}

                <h2>Leadership</h2>
                <div className="radio-div">
                  <p>Q4.1: The person takes responsibility naturally</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q4.1" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q4.1" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q4.1" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q4.1" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q4.1" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>Q4.2: The person can inspire others to perform better</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q4.2" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q4.2" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q4.2" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q4.2" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q4.2" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>Q4.3: The person improves the team they are a part of</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q4.3" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q4.3" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q4.3" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q4.3" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q4.3" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>Q4.4: You can always rely on the person to deliver</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q4.4" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q4.4" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q4.4" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q4.4" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q4.4" value="5" />
                  </label>
                </div>

                <div>
                  <p>Q4.5: Other feedback about leadership</p>
                  <Field name="q4.5" as="textarea" />
                </div>

                {/* ----------- READINESS FOR CHANGE ------------ */}

                <h2>Readiness for change</h2>
                <div className="radio-div">
                  <p>Q5.1: The person is capable to learn new things fast</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q5.1" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q5.1" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q5.1" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q5.1" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q5.1" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q5.2: The person is interested in developing themselves and
                    their skills
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q5.2" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q5.2" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q5.2" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q5.2" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q5.2" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q5.3: The person sees change as an opportunity instead of a
                    threat
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q5.3" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q5.3" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q5.3" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q5.3" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q5.3" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q5.4: The person is ready to adopt new different working
                    methods
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q5.4" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q5.4" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q5.4" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q5.4" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q5.4" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q5.5:The person is able to handle change and uncertainty
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q5.5" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q5.5" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q5.5" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q5.5" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q5.5" value="5" />
                  </label>
                </div>

                <div>
                  <p>Q5.6: Other feedback about readiness for change</p>
                  <Field name="q5.6" as="textarea" />
                </div>

                {/* ----------- CREATIVITY ------------ */}

                <h2>Creativity</h2>
                <div className="radio-div">
                  <p>Q6.1: The person has good problem-solving skills</p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q6.1" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q6.1" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q6.1" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q6.1" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q6.1" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q6.2: The person can provide multiple options with pros and
                    cons on how to solve a problem
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q6.2" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q6.2" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q6.2" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q6.2" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q6.2" value="5" />
                  </label>
                </div>

                <div className="radio-div">
                  <p>
                    Q6.3: The person can foresee and prevent negative outcomes
                    of solutions and decisions
                  </p>
                  <label>
                    <span>1</span>
                    <Field type="radio" name="q6.3" value="1" />
                  </label>

                  <label>
                    <span>2</span>
                    <Field type="radio" name="q6.3" value="2" />
                  </label>

                  <label>
                    <span>3</span>
                    <Field type="radio" name="q6.3" value="3" />
                  </label>

                  <label>
                    <span>4</span>
                    <Field type="radio" name="q6.3" value="4" />
                  </label>

                  <label>
                    <span>5</span>
                    <Field type="radio" name="q6.3" value="5" />
                  </label>
                </div>

                <div>
                  <p>Q6.4: Other feedback about creativity</p>
                  <Field name="q6.4" as="textarea" />
                </div>

                {/* ----------- GENERAL EVALUATION ------------ */}

                <h2>General Evaluation</h2>
                <div>
                  <p>Q7.1: The person's personal strengths are:</p>
                  <Field name="q7.1" as="textarea" />
                </div>

                <div>
                  <p>Q7.2: The person should improve in:</p>
                  <Field name="q7.2" as="textarea" />
                </div>

                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
