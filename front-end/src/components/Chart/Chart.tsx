import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { CreatedFeebackType } from "../../features/createdFeedbackSlicer";
import { personalDetailType } from "../../model/types/user";
import { useState } from "react";

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
  subject:string,
  A:number,
  fullMark?:number
}
const Chart = (props: Propstype) => {
  const [data, setData] = useState<Array<DataType>>([
    {
      subject: "Quality Focus",
      A: 3,
      // fullMark: 5,
    },
    {
      subject: "People Skills",
      A: 3,
      // fullMark: 5,
    },
    {
      subject: "Self Guidance",
      A: 3,
      // fullMark: 5,
    },
    {
      subject: "Leadership",
      A: 3,
      // fullMark: 5,
    },
    {
      subject: "Readiness for Change",
      A: 3.4,
      // fullMark: 5,
    },
    {
      subject: "Creativity",
      A: 3,
      // fullMark: 5,
    },
  ]);

  const { createdBy, feedbackTo, answers } = props;
  const calculateAverage = (sum:number, total:number ) => {
    Number(sum/total).toFixed(2)
  };
  const addSum = ()=>{

  }
  const setUpData = () => {
    let data : Array<DataType> = []
    if (answers) {
      let sum :number = 0
      let total:number = 0
      let section = ''
      for ( let answer of answers){
        if ( answer.finished){
          total ++
          for (let eachDetail of answer.details ){
            if ( eachDetail.answer[0]){

            }
          }
        }
      }
    }
    return data;
  };
  return (
    <>
      <h1>Chart's feedback data to {feedbackTo.personalDetail.firstName}</h1>
      <RadarChart cx={300} cy={250} outerRadius={150} width={550} height={550} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar name="Employee" dataKey="A" stroke="#6712be" fill="#6712be" fillOpacity={0.4} />
        <Legend />
      </RadarChart>
    </>
  );
};

export default Chart;
