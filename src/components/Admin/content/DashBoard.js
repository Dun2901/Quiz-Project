import { useState, useEffect } from "react";
import { getOverview } from "../../../services/apiService";
import "./DashBoard.scss";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const DashBoard = () => {
  const [dataOverview, setDataOverview] = useState();
  const [dataChart, setDataChart] = useState();

  useEffect(() => {
    const fetchDataOverview = async () => {
      const res = await getOverview();
      if (res && res.EC === 0) {
        setDataOverview(res.DT);
        // Process chart data
        let Qz,
          Qs,
          As = 0;

        Qz = res?.DT?.others?.countQuiz ?? 0;
        Qs = res?.DT?.others?.countQuestions ?? 0;
        As = res?.DT?.others?.countAnswers ?? 0;

        const data = [
          {
            name: "Quizzes",
            Qz: Qz,
          },
          {
            name: "Questions",
            Qs: Qs,
          },
          {
            name: "Answers",
            As: As,
          },
        ];
        setDataChart(data);
      }
    };

    fetchDataOverview();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="title">Analytics DashBoard</div>
      <div className="content">
        <div className="content-left">
          <div className="child">
            <span className="text-1">Total User</span>
            <span className="text-2">
              {dataOverview && dataOverview.users && dataOverview.users.countUsers ? (
                <>{dataOverview.users.countUsers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">
              {dataOverview && dataOverview.others && dataOverview.others.countQuiz ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Questions</span>
            <span className="text-2">
              {dataOverview && dataOverview.others && dataOverview.others.countQuestions ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Answers</span>
            <span className="text-2">
              {dataOverview && dataOverview.others && dataOverview.others.countAnswers ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="content-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart width={400} height={300} data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
