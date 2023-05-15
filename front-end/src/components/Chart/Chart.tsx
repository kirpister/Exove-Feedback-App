import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { AnswerType, CreatedFeebackType } from "../../features/createdFeedbackSlicer";
import { personalDetailType } from "../../model/types/user";
import { useEffect, useState } from "react";
import { QuestionType } from "../form/SingleQuestion";
import { stringify } from "querystring";

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

  const averageEachUser = (
    answer:
      | {
          details: Array<{ answer: Array<string>; question: { order: number; section: string; title: string; type: QuestionType } }>;
          finished: boolean;
          user: any;
        }
      | any
  ) => {
    let eachUserAverage: Array<DataType> = [];
    let total = 0;
    let count = 0;
    let testSubject = "";
    if (answer.finished) {
      for (let i of answer.details) {
        if (i.question.type === QuestionType.range) {
          if (i.question.section !== testSubject) {
            testSubject = i.question.section;
            total += Number(i.answer[0]);
            count++;
          } else {
            let average = Number(total / count).toFixed(2);
            for (let i of eachUserAverage) {
              if (i.subject === testSubject) {
                i.A = Number(average);
              }
            }
            total = 0;
            count = 0;
            testSubject = "";
          }
        }
      }
      console.log("each user average");
      console.log(eachUserAverage);
      return eachUserAverage;
    }
    return false;
  };
  const setUpData = () => {
    if (answers) {
      for (let i of answers) {
        let temp = i;
        averageEachUser(temp);
      }
    }
  };
  useEffect(() => {
    setData(setUpSubject());
    setUpData();
  }, [answers]);
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
