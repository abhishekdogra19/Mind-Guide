import { useState, useEffect } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/mindGuideSlice";

const GetRoadmap = () => {
  const [roadmapData, setRoadmapData] = useState([]);
  const [showRecommendationsIndex, setShowRecommendationsIndex] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false); // State to track unsaved changes
  const user = useSelector((state) => state.mindGuide.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get("/api/v1/user/roadmap");
        setRoadmapData(response.data.roadmap);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoadmap();
  }, []);

  const completedTasksCount = roadmapData.filter(
    (item) => item.isCompleted
  ).length;
  const totalTasksCount = roadmapData.length;
  const progress =
    totalTasksCount === 0
      ? 0
      : Math.round((completedTasksCount / totalTasksCount) * 100);

  const handleExtractSkill = async () => {
    try {
      await axios.get("/api/v1/user/getSkills");
      const { data } = await axios.get("/api/v1/user/getUserProfile");
      console.log(data);
      dispatch(addUser(data));
    } catch (err) {
      console.log(err);
    }
  };
  const handleTaskClick = async (index) => {
    try {
      const updatedRoadmapData = [...roadmapData];
      updatedRoadmapData[index].isCompleted =
        !updatedRoadmapData[index].isCompleted;
      setRoadmapData(updatedRoadmapData);
      setUnsavedChanges(true); // Set unsaved changes flag
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropdownClick = async (index) => {
    try {
      setShowRecommendationsIndex((prevIndex) =>
        prevIndex === index ? null : index
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/v1/chat/roadmap", { roadmap: roadmapData });
      setUnsavedChanges(false); // Reset unsaved changes flag after successful save
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (roadmapData.length === 0) {
    return (
      <div className="min-h-screen   w-full  flex flex-col items-center text-primaryColor p-4">
        <div className="text-xl mt-8 ">No roadmap available</div>
        <button
          className="bg-primaryColor hover:bg-primaryColor text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => window.history.back()}
        >
          return
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full border  flex flex-col items-center lg:p-4">
      <div className="w-full bg-gray-300 rounded-lg  ">
        <div
          className="bg-primaryColor text-lg font-bold leading-none  text-center text-white"
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease-in-out",
            borderRadius: "50px",
          }}
        >
          {progress}%
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center overflow-y-auto w-full">
        <div className="flex flex-col items-center w-full ">
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className={`text-white p-4 m-4 w-full  rounded-xl cursor-pointer ${
                item.isCompleted ? "bg-green-600" : "bg-red-500 "
              }`}
              onClick={() => handleTaskClick(index)}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs lg:text-sm ">{item.Goal}</h2>
                <button
                  className="underline underline-offset-4 text-xs lg:text-xs hover:bg-gray-700 text-white py-4   px-4 rounded duration-300"
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
                    <div className="text-xs lg:text-sm">
                      Sorry, no recommendations. You can search on Google.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Display save button only if there are unsaved changes */}

      {progress === 100 && (
        <div className="text-white mt-4 text-xs lg:text-sm">
          Congratulations! You have completed your roadmap.
        </div>
      )}
      <div className="max-w-3xl px-6 w-full flex  items-center justify-center gap-4">
        {unsavedChanges && (
          <button
            className="bg-primaryColor text-xs lg:text-sm w-full max-w-lg rounded-lg hover:brightness-75 text-white font-bold py-2 px-4 mt-4"
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}
        {progress === 100 && (
          <>
            <button
              onClick={handleExtractSkill}
              className="bg-primaryColor text-xs lg:text-sm w-full max-w-lg rounded-lg hover:brightness-75 text-white font-bold py-2 px-4 mt-4"
            >
              Completed
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GetRoadmap;
