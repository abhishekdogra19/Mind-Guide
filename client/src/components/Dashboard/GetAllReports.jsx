import React, { useState, useEffect } from "react";
import axios from "axios";
import doc from "../../assets/google-docs.png";
const GetAllReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/api/v1/user/allReports"
        );
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error.response);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h1>My Reports</h1>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report, index) => (
            <li key={index}>
              <p>{report.title}</p>
              <p>Date: {new Date(report.date).toLocaleDateString()}</p>
              <a
                href={report.filePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={doc} alt="Report" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
};

export default GetAllReports;
