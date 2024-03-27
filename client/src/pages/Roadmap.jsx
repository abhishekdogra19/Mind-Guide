import React, { useState, useEffect } from "react";
import axios from "axios";

const Roadmap = () => {
  const [roadmapData, setRoadmapData] = useState([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get("/api/v1/user/getRoadmap");
        setRoadmapData(response.data.roadmap);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoadmap();
  }, []); // Empty dependency array to run effect only once on mount

  const completedTasksCount = roadmapData.filter(
    (item) => item.isCompleted
  ).length;
  const totalTasksCount = roadmapData.length;
  const progress =
    totalTasksCount === 0 ? 0 : (completedTasksCount / totalTasksCount) * 100;

  const handleTaskClick = async (index) => {
    try {
      const updatedRoadmapData = [...roadmapData];
      updatedRoadmapData[index].isCompleted = true;
      setRoadmapData(updatedRoadmapData);
      await axios.put("/api/v1/user/updateRoadmap", {
        roadmap: updatedRoadmapData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [showRecommendationsIndex, setShowRecommendationsIndex] =
    useState(null);

  const handleDropdownClick = async (index) => {
    try {
      setShowRecommendationsIndex(index);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      {/* Progress bar */}
      <div className="w-full bg-gray-300 mt-8 overflow-hidden rounded-full">
        <div
          className="bg-green-500 text-xs leading-none py-1 text-center text-white"
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease-in-out",
          }}
        >
          {progress.toFixed(2)}%
        </div>
      </div>

      {/* Roadmap tasks */}
      <div className="flex flex-wrap mt-4">
        {roadmapData.map((item, index) => (
          <div
            key={index}
            className={`text-white p-4 m-4 rounded cursor-pointer ${
              item.isCompleted ? "bg-green-500" : "bg-red-500"
            }`}
            onClick={() => handleTaskClick(index)}
          >
            <h2 className="font-semibold">{item.Goal}</h2>
            <p>{item.Description}</p>
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={(e) => {
                e.stopPropagation();
                handleDropdownClick(index);
              }}
            >
              Show Recommendations
            </button>
            {showRecommendationsIndex === index && (
              <div className="mt-2 text-white">
                {item.Recommendations && item.Recommendations.length > 0 ? (
                  item.Recommendations.map((recommendation, i) => (
                    <div key={i}>{recommendation}</div>
                  ))
                ) : (
                  <div>
                    Sorry, no recommendations. You can search on Google.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Roadmap;
