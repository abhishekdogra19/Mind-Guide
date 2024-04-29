import { Chart, registerables } from "chart.js"; // Import Chart.js and its modules
Chart.register(...registerables); // Register all the necessary components
import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const HeroDashBoard = () => {
  // Sample data for the bar chart
  const barChartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sessions Attended",
        data: [8, 12, 10, 15, 11], // Number of sessions attended each month
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Red
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(255, 206, 86, 0.2)", // Yellow
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(153, 102, 255, 0.2)", // Purple
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(255, 206, 86, 1)", // Yellow
          "rgba(75, 192, 192, 1)", // Green
          "rgba(153, 102, 255, 1)", // Purple
        ],
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the pie chart
  const pieChartData = {
    labels: ["Report A", "Report B", "Report C", "Report D", "Report E"],
    datasets: [
      {
        label: "Reports Created",
        data: [30, 20, 10, 15, 25], // Number of reports created
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Red
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(255, 206, 86, 0.2)", // Yellow
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(153, 102, 255, 0.2)", // Purple
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(255, 206, 86, 1)", // Yellow
          "rgba(75, 192, 192, 1)", // Green
          "rgba(153, 102, 255, 1)", // Purple
        ],
        borderWidth: 1,
      },
    ],
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
