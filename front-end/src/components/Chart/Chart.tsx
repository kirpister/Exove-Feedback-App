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
    let eachUserAverage: Array<DataType> = [...data];
    let total = 0;
    let count = 0;
    let testSubject = answer.details[0].question.section;
    if (answer.finished) {
      for (let i of answer.details) {
        if (i.question.section === testSubject) {
          if (i.question.type === QuestionType.range) {
            total += Number(i.answer[0]);
            count++;
          }
        } else {
          let average = Number((total / count).toFixed(2));
          let temp: DataType = {
            subject: testSubject,
            A: average,
          };
          eachUserAverage.push(temp);
          total = 0;
          count = 0;
          testSubject = i.question.section;
        }
      }
      console.log("average");
      return eachUserAverage;
    }
    return false;
  };
  const setUpData = () => {
    let temp: any = [];
    if (answers) {
      for (let i of answers) {
        if (averageEachUser(i) !== false) {
          temp.push(averageEachUser(i));
        }
      }
    }
    const averages = [];
    // Calculate average for each subject
    for (let i = 0; i < temp[0].length; i++) {
      let sum = 0;
      for (let j = 0; j < temp.length; j++) {
        sum += temp[j][i]?.A;
      }
      const average = sum / temp.length;
      averages.push({ subject: temp[0][i].subject, A: average });
    }
    setData(averages);
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
        <PolarRadiusAxis angle={32} domain={[0, 5]} />
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
