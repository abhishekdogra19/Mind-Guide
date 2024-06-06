import React, { useState, useEffect } from "react";
import axios from "axios";
import doc from "../../assets/google-docs.png";
const GetAllReports = () => {
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

  return (
    <div className="lg:px-4 lg:py-2 py-2">
      {reports.length > 0 ? (
        <div className="px-2">
          <h1 className="font-extrabold">Your Reports</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-6">
            {reports.map((report, index) => (
              <div
                key={index}
                className="p-3 lg:px-2 lg:py-6 hover:scale-110 hover:bg-gray-400 duration-500 border border-black m-1 flex flex-col items-center justify-between gap-2 bg-gray-200 rounded-lg"
              >
                <a href={report.filePath} target="_blank">
                  <img src={doc} alt="Report" className="h-20 lg:h-32" />
                </a>
                <p className="text-xs capitalize text-center font-semibold">
                  {report.title}
                </p>
                <p className="text-xs">
                  Date: {new Date(report.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
};

export default GetAllReports;
