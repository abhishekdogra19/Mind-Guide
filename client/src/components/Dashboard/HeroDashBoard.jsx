import axios from "axios";
import { Chart, registerables } from "chart.js"; // Import Chart.js and its modules
Chart.register(...registerables); // Register all the necessary components
import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";

const HeroDashBoard = () => {
  // Sample data for the bar chart
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sessions Attended",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          // Add other colors as needed
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          // Add other colors as needed
        ],
        borderWidth: 1,
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Reports Created",
        data: [],
        backgroundColor: [
          // Define colors as before
        ],
        borderColor: [
          // Define borders as before
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/user/userDashboard"
      );
      console.log(data.user);
      updateCharts(data.user);
    };
    fetchData();
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

    setBarChartData({
      labels: sessionLabels,
      datasets: [
        {
          label: "Sessions Attended",
          data: sessionData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
        },
      ],
    });

    const sessionsPerCounselor = userData.reportHistory.reduce(
      (acc, session) => {
        const counselorName = session.title; // Assuming counselor name is stored in session object
        acc[counselorName] = (acc[counselorName] || 0) + 1;
        return acc;
      },
      {}
    );

    const counselorLabels = Object.keys(sessionsPerCounselor);
    const counselorData = Object.values(sessionsPerCounselor);

    setPieChartData({
      labels: counselorLabels,
      datasets: [
        {
          label: "Counselor Sessions",
          data: counselorData,
          backgroundColor: counselorLabels.map(
            () =>
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, 0.2)`
          ),
          borderColor: counselorLabels.map(
            () =>
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, 1)`
          ),
          borderWidth: 1,
        },
      ],
    });
  };
  // Configuration options for the charts
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-10">
      <div>
        <h2>Bar Chart: Sessions Attended</h2>
        <Bar data={barChartData} options={options} />
      </div>
      <div>
        <h2>Pie Chart: Reports Created</h2>
        <Pie data={pieChartData} options={options} />
      </div>
    </div>
  );
};
export default HeroDashBoard;
