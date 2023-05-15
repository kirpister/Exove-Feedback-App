import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { CreatedFeebackType } from "../../features/createdFeedbackSlicer";
import { personalDetailType } from "../../model/types/user";
import { useEffect, useState } from "react";
import { QuestionType } from "../form/SingleQuestion";

const data = [
  {
    subject: "Quality Focus",
    A: 3,
    fullMark: 5,
  },
  {
    subject: "People Skills",
    A: 3,
    fullMark: 5,
  },
  {
    subject: "Self Guidance",
    A: 3,
    fullMark: 5,
  },
  {
    subject: "Leadership",
    A: 3,
    fullMark: 5,
  },
  {
    subject: "Readiness for Change",
    A: 3,
    fullMark: 5,
  },
  {
    subject: "Creativity",
    A: 3,
    fullMark: 5,
  },
];
interface Propstype extends CreatedFeebackType {
  feedbackTo: personalDetailType;
}
interface DataType {
  subject: string;
  A?: number;
  fullMark?: number;
}
const Chart = (props: Propstype) => {
  const [data, setData] = useState<Array<DataType>>([
    // {
    //   subject: "Quality Focus",
    //   A: 3,
    //   // fullMark: 5,
    // },
    // {
    //   subject: "People Skills",
    //   A: 3,
    //   // fullMark: 5,
    // },
    // {
    //   subject: "Self Guidance",
    //   A: 3,
    //   // fullMark: 5,
    // },
    // {
    //   subject: "Leadership",
    //   A: 3,
    //   // fullMark: 5,
    // },
    // {
    //   subject: "Readiness for Change",
    //   A: 3.4,
    //   // fullMark: 5,
    // },
    // {
    //   subject: "Creativity",
    //   A: 3,
    //   // fullMark: 5,
    // },
  ]);

  const { createdBy, feedbackTo, answers, details } = props;
  const calculateAverage = (sum: number, total: number) => {
    Number(sum / total).toFixed(2);
  };
  const addSum = () => {};
  const setUpSubject = () => {
    let returnData: Array<DataType> = [];
    let section: string = "";
    for (let i of details.questions) {
      if (i.section && section !== i.section) {
        section = i.section;
        let temp: DataType = { subject: section };
        returnData.push(temp);
      }
    }
    return returnData;
  };

  const averageEachUser = (answer: {
    details: Array<{ answer: Array<string>; question: { order: number; section: string; title: string; type: QuestionType }; finished: boolean }>;
  }) => {
    let eachUserAverage: Array<DataType> = [];
    let total = 0;
    let count = 0;
    let subject = "";
    for (let i of answer.details) {
      if (i.question.type === QuestionType.range) {
        if (i.question.section !== subject) {
          subject = i.question.section;
          total += Number(i.answer[0]);
          count++;
        } else {
          
        }
      }
    }
    return eachUserAverage;
  };
  const setUpData = () => {
    let average: Array<DataType> = [...data];
    if (answers) {
      let sum: number = 0;
      let total: number = 0;
      let section = "";
      for (let answer of answers) {
        if (answer.finished) {
          total++;
          for (let eachDetail of answer.details) {
            if (eachDetail.answer[0]) {
              console.log(eachDetail.answer);
            }
          }
        }
      }
    }
    return data;
  };
  useEffect(() => {
    setData(setUpSubject());
  }, [setData]);
  return (
    <>
      <h1>Chart's feedback data to {feedbackTo.personalDetail.firstName}</h1>
      <RadarChart cx={300} cy={250} outerRadius={150} width={550} height={550} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={38.6} domain={[0, 5]} />
        <Radar name="Employee" dataKey="A" stroke="#6712be" fill="#6712be" fillOpacity={0.4} />
        <Legend />
      </RadarChart>
    </>
  );
};

export default Chart;

// 1. run loop for all answer
// 2. check average of each section for each user
// 3. combine all the user average
