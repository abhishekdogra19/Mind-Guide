import axios from "axios";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ReportsCarousel from "../ReportsCarousel";
import ToggleModal from "../ToggleModal";

const AdminDashboard = () => {
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
      try {
        const { data } = await axios.get("/api/v1/user/getAllUserData");
        console.table(data.users);
        updateCharts(data.users);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const updateCharts = (usersData) => {
    let sessionsPerDay = {};
    let reportsPerDay = {};
    let sessionsPerCounselor = {};

    usersData.forEach((user) => {
      user.sessionHistory.forEach((session) => {
        const date = new Date(session.date).toLocaleDateString();
        sessionsPerDay[date] = (sessionsPerDay[date] || 0) + 1;
      });

      user.reportHistory.forEach((report) => {
        const date = new Date(report.date).toLocaleDateString();
        reportsPerDay[date] = (reportsPerDay[date] || 0) + 1;

        const counselorName = report.title;
        sessionsPerCounselor[counselorName] =
          (sessionsPerCounselor[counselorName] || 0) + 1;
      });
    });

    // Sort dates for line chart and bar chart
    const allDatesSet = new Set([
      ...Object.keys(sessionsPerDay),
      ...Object.keys(reportsPerDay),
    ]);
    const allDates = Array.from(allDatesSet).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    // Update bar chart data with sorted dates
    const sessionLabels = allDates; // Use sorted dates for bar chart x-axis
    const sessionData = allDates.map((date) => sessionsPerDay[date] || 0);
    setBarChartData((prevData) => ({
      ...prevData,
      xAxis: { categories: sessionLabels },
      series: [{ ...prevData.series[0], data: sessionData }],
    }));

    // Update pie chart data
    const counselorLabels = Object.keys(sessionsPerCounselor);
    const counselorData = counselorLabels.map((label) => ({
      name: label,
      y: sessionsPerCounselor[label],
    }));
    setPieChartData((prevData) => ({
      ...prevData,
      series: [{ ...prevData.series[0], data: counselorData }],
    }));

    // Update line chart data
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
    <div className="p-4">
      <h1 className="font-bold">Admin Dashboard</h1>
      <div className="w-full grid grid-cols-2  gap-10 p-10 justify-between">
        <div
          style={{
            boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
            borderRadius: "15px",
          }}
          className="border border-black py-6 px-2 rounded-3xl"
        >
          <HighchartsReact highcharts={Highcharts} options={barChartData} />
        </div>
        <div>
          <ToggleModal />
        </div>
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
  );
};

export default AdminDashboard;
