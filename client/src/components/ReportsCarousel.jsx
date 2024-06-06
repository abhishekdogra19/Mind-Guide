import React from "react";
import { motion } from "framer-motion";
import doc from "../assets/google-docs.png";

const ReportsCarousel = ({ reports }) => {
  const displayReports = reports.slice(0, 6);
  console.log(displayReports);
  return (
    <div
      className="relative h-auto py-2 overflow-hidden mx-auto"
      style={{ width: "100%" }}
    >
      <motion.div
        className="flex gap-4"
        animate={{
          x: ["0%", "-100%"],
          transition: {
            ease: "linear",
            duration: 15,
            repeat: Infinity,
          },
        }}
      >
        {displayReports.map((report, index) => (
          <div key={index} className="flex-shrink-0">
            <div className="p-3 lg:px-2 lg:py-6 hover:scale-110 hover:bg-gray-400 duration-500 border border-black m-1 flex flex-col items-center justify-between gap-2 bg-gray-200 rounded-lg">
              <a href={report.filePath} target="_blank">
                <img src={doc} alt="Report" className="h-20 lg:h-32" />
              </a>
              <p className="text-xs  capitalize text-center font-semibold">
                {report.title}
              </p>
              <p className="text-xs">
                Date: {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
        {displayReports.map((report, index) => (
          <div key={index} className="flex-shrink-0">
            <div className="p-3 lg:px-2 lg:py-6 hover:scale-110 hover:bg-gray-400 duration-500 border border-black m-1 flex flex-col items-center justify-between gap-2 bg-gray-200 rounded-lg">
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
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReportsCarousel;
