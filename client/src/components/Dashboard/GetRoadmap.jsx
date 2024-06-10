import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/mindGuideSlice";
import Lottie from "lottie-react";
import animationData from "../../assets/animationData.json";

const GetRoadmap = () => {
  const [roadmapData, setRoadmapData] = useState([]);
  const [showRecommendationsIndex, setShowRecommendationsIndex] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const user = useSelector((state) => state.mindGuide.userInfo);
  const dispatch = useDispatch();

  // Fetch roadmap data
  const fetchRoadmap = async () => {
    try {
      const response = await axios.get("/api/v1/user/roadmap");
      setRoadmapData(response.data.roadmap);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  // Calculate progress
  const completedTasksCount = roadmapData.filter(
    (item) => item.isCompleted
  ).length;
  const totalTasksCount = roadmapData.length;
  const progress =
    totalTasksCount === 0
      ? 0
      : Math.round((completedTasksCount / totalTasksCount) * 100);

  // Handle skill extraction and user profile update
  const handleExtractSkill = async () => {
    try {
      await axios.get("/api/v1/user/getSkills");
      const { data } = await axios.get("/api/v1/user/getUserProfile");
      dispatch(addUser(data));
      setShowOverlay(false);
      await fetchRoadmap();
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle task completion status
  const handleTaskClick = (index) => {
    const updatedRoadmapData = [...roadmapData];
    updatedRoadmapData[index].isCompleted =
      !updatedRoadmapData[index].isCompleted;
    setRoadmapData(updatedRoadmapData);
    setUnsavedChanges(true);
  };

  // Toggle recommendations visibility
  const handleDropdownClick = (index) => {
    setShowRecommendationsIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  // Save roadmap changes
  const handleSave = async () => {
    try {
      await axios.put("/api/v1/chat/roadmap", { roadmap: roadmapData });
      setUnsavedChanges(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Close overlay
  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (roadmapData.length === 0) {
    return (
      <div className="min-h-screen w-full  flex flex-col items-center p-4 text-primaryColor">
        <div className="text-xl mt-8">No roadmap available</div>
        <button
          className="bg-primaryColor hover:brightness-95 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => window.history.back()}
        >
          Return
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full  flex flex-col items-center p-4 relative">
      <div className="w-full bg-gray-300 rounded-lg">
        <div
          className="bg-green-500 text-lg font-bold leading-none text-center text-white"
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease-in-out",
            borderRadius: "50px",
          }}
        >
          {progress}%
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center overflow-y-auto w-full ">
        <div className="flex flex-col w-full">
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className={`text-white p-4 m-4 rounded-lg cursor-pointer ${
                item.isCompleted ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={() => handleTaskClick(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs  lg:text-sm font-semibold">
                  {item.Goal}
                </h2>
                <button
                  className="underline hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-xs lg:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownClick(index);
                  }}
                >
                  {showRecommendationsIndex === index
                    ? "Hide Recommendations"
                    : "Show Recommendations"}
                </button>
              </div>
              <p>{item.Description}</p>
              {showRecommendationsIndex === index && (
                <div
                  className="mt-2 text-white overflow-hidden"
                  style={{
                    maxHeight: "none",
                    transition: "max-height 0.5s ease",
                  }}
                >
                  {item.recommendations && item.recommendations.length > 0 ? (
                    <ul>
                      {item.recommendations.map((recommendation, i) => (
                        <li
                          key={i}
                          className="mt-4 border border-white p-2 bg-blue-200 text-black flex items-center gap-2"
                        >
                          <a
                            href={recommendation.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <FaExternalLinkAlt />
                            {recommendation.title}
                          </a>
                        </li>
                      ))}
                    </ul>
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

      {progress === 100 && showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-transparent flex flex-col items-center p-4 rounded-lg">
            <button
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseOverlay}
            >
              Close
            </button>
            <Lottie
              animationData={animationData}
              style={{ height: 300, width: 300 }}
            />
            <div className="text-white mt-4">
              Congratulations! You have completed your roadmap.
            </div>
            <div className="max-w-2xl w-full flex items-center justify-between gap-4">
              <button
                className="bg-blue-500 w-full max-w-lg rounded-lg hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
                onClick={handleExtractSkill}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetRoadmap;
