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

  return (
    <div>
      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <div
              key={index}
              className=" p-10 m-1 flex flex-col items-center justify-between gap-2 group "
            >
              <a
                href={report.filePath}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={doc}
                  alt="Report"
                  className="h-40 group-hover:scale-110 duration-500"
                />
              </a>
              <p className="capitalize underline font-semibold">
                {report.title}
              </p>
              <p className="text-xs">
                Date: {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
};

export default GetAllReports;
