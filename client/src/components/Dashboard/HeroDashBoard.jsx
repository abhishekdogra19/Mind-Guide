import axios from "axios";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportsCarousel from "../ReportsCarousel";

const HeroDashBoard = () => {
  const [barChartData, setBarChartData] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: "Sessions Attended",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Sessions",
      },
    },
    series: [
      {
        name: "Sessions Attended",
        data: [],
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    chart: {
      type: "pie",
    },
    title: {
      text: "Reports Created",
    },
    series: [
      {
        name: "Counselor Sessions",
        colorByPoint: true,
        data: [],
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    title: {
      text: "Sessions vs Reports",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },
    series: [
      {
        name: "Sessions Attended",
        data: [],
      },
      {
        name: "Reports Created",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/v1/user/userDashboard");
      updateCharts(data.user);
    };
    fetchData();
  }, []);

  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axios.get("/api/v1/user/allReports");
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setReports(sortedData);
      } catch (error) {
        console.error("Error fetching reports:", error.response);
      }
    };
    fetchReports();
  }, []);

  const updateCharts = (userData) => {
    const sessionsPerDay = userData.sessionHistory.reduce((acc, session) => {
      const date = new Date(session.date).toLocaleDateString();
      if (acc[date]) {
        acc[date] += 1;
      } else {
        acc[date] = 1;
      }
      return acc;
    }, {});

    const sessionLabels = Object.keys(sessionsPerDay);
    const sessionData = Object.values(sessionsPerDay);

    setBarChartData((prevData) => ({
      ...prevData,
      xAxis: { categories: sessionLabels },
      series: [{ ...prevData.series[0], data: sessionData }],
    }));

    const reportsPerDay = userData.reportHistory.reduce((acc, report) => {
      const date = new Date(report.date).toLocaleDateString();
      if (acc[date]) {
        acc[date] += 1;
      } else {
        acc[date] = 1;
      }
      return acc;
    }, {});

    const sessionsPerCounselor = userData.reportHistory.reduce(
      (acc, session) => {
        const counselorName = session.title; // Assuming counselor name is stored in session object
        acc[counselorName] = (acc[counselorName] || 0) + 1;
        return acc;
      },
      {}
    );

    const counselorLabels = Object.keys(sessionsPerCounselor);
    const counselorData = counselorLabels.map((label) => ({
      name: label,
      y: sessionsPerCounselor[label],
    }));

    setPieChartData((prevData) => ({
      ...prevData,
      series: [{ ...prevData.series[0], data: counselorData }],
    }));

    const allDates = [
      ...new Set([
        ...Object.keys(sessionsPerDay),
        ...Object.keys(reportsPerDay),
      ]),
    ];

    const lineLabels = allDates;
    const lineSessionsData = allDates.map((date) => sessionsPerDay[date] || 0);
    const lineReportsData = allDates.map((date) => reportsPerDay[date] || 0);

    setLineChartData((prevData) => ({
      ...prevData,
      xAxis: { categories: lineLabels },
      series: [
        { ...prevData.series[0], data: lineSessionsData },
        { ...prevData.series[1], data: lineReportsData },
      ],
    }));
  };

  return (
    <>
      <div className="w-full grid grid-cols-1  gap-10 p-10 justify-between">
        <div
          style={{
            boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
            borderRadius: "15px",
          }}
          className="border border-black py-6 px-2 rounded-3xl  "
        >
          <HighchartsReact highcharts={Highcharts} options={barChartData} />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-10  justify-between">
          <div
            style={{
              boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
              borderRadius: "15px",
            }}
            className="border border-black py-6 px-2 rounded-3xl"
          >
            <HighchartsReact highcharts={Highcharts} options={pieChartData} />
          </div>
          <div
            style={{
              boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
              borderRadius: "15px",
            }}
            className="border border-black py-6 px-2 rounded-3xl"
          >
            <HighchartsReact highcharts={Highcharts} options={lineChartData} />
          </div>
        </div>
      </div>
      <div
        style={{
          boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
          borderRadius: "15px",
        }}
        className="border border-black py-6 px-2 rounded-3xl flex flex-col items-center justify-center overflow-hidden mb-10 mx-10 gap-6"
      >
        <h1 className="ml-8 text-sm lg:text-xl font-bold">Latest Reports</h1>
        <div className="flex-grow flex-1 h-full flex items-center justify-center">
          <ReportsCarousel reports={reports} />
        </div>
      </div>
    </>
  );
};

export default HeroDashBoard;
