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

    const reportLabels = userData.reportHistory.map(
      (report) => report.title // Using report title for the pie chart labels
    );
    const reportData = new Array(reportLabels.length).fill(1); // Each report counts as one

    setBarChartData({
      labels: sessionLabels,
      datasets: [
        {
          ...barChartData.datasets[0],
          data: sessionData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
        },
      ],
    });

    setPieChartData({
      labels: reportLabels,
      datasets: [
        {
          label: "Reports Created",
          data: reportData,
          backgroundColor: reportLabels.map(
            () =>
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, 0.2)`
          ),
          borderColor: reportLabels.map(
            () =>
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, 1)`
          ),
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
