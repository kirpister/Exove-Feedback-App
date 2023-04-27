import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

const data = [
  {
    subject: "Quality Focus",
    A: 3,
    fullMark: 5
  },
  {
    subject: "People Skills",
    A: 3,
    fullMark: 5
  },
  {
    subject: "Self Guidance",
    A: 3,
    fullMark: 5
  },
  {
    subject: "Leadership",
    A: 3,
    fullMark: 5
  },
  {
    subject: "Readiness for Change",
    A: 3,
    fullMark: 5
  },
  {
    subject: "Creativity",
    A: 3,
    fullMark: 5
  }
];

const Chart = () => {
    
  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={550}
      height={550}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 5]} />
      <Radar
        name="Employee"
        dataKey="A"
        stroke="#6712be"
        fill="#6712be"
        fillOpacity={0.4}
      />
      <Legend />
    </RadarChart>
  );
}

export default Chart;
