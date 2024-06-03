import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import {
  AcademicCounselor,
  CareerCounselor,
  EmotionalCounselor,
  FinancialCounselor,
  HealthCounselor,
  PersonalCounselor,
  StudentCounselor,
} from "../assets/Counselor/image";
const counselors = [
  {
    type: "Academic Counselor",
    image: AcademicCounselor,
  },
  {
    type: "Career Counselor",
    image: CareerCounselor,
  },
  {
    type: "Personal Counselor",
    image: PersonalCounselor,
  },
  {
    type: "Financial Counselor",
    image: FinancialCounselor,
  },
  {
    type: "Health and Wellness Counselor",
    image: HealthCounselor,
  },
  {
    type: "Student Life Counselor",
    image: StudentCounselor,
  },
  {
    type: "Emotional Support Counselor",
    image: EmotionalCounselor,
  },
];

const Counselors = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const navigate = useNavigate();
  const handleCounselorClick = (counselor) => {
    setSelectedCounselor(counselor);
    setShowConfirmation(true);
  };
  const handleConfirmation = (confirmed) => {
    if (confirmed && selectedCounselor) {
      const link = `/counselors/chat/${selectedCounselor.type.toLowerCase()}`;
      navigate(link);
    }
    setShowConfirmation(false);
  };
  return (
    <>
      <div id="counselors" className="overflow-hidden p-10 mb-6">
        <div className="text-xl lg:text-4xl font-bold text-center text-gray-800 py-10">
          Kindly choose your designated{" "}
          <span className="text-green-600">counselor</span>.
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 place-items-center ">
          {counselors.map((counselor, index) => (
            <CardActionArea
              key={index}
              onClick={() => handleCounselorClick(counselor)}
              className="h-96 overflow-hidden group max-w-lg rounded-t-lg"
            >
              <div className="h-80 overflow-hidden rounded-t-lg bg-cover">
                <CardMedia
                  component="img"
                  height="140"
                  image={counselor.image}
                  alt={counselor.type}
                  className="flex items-center justify-center  border-2 h-full group-hover:scale-110 duration-300 "
                />
              </div>
              <CardContent className="text-center bg-black rounded-b-lg text-white h-full">
                <h1 className="text-white group-hover:scale-105 group-hover:font-semibold group-hover:underline duration-300">
                  {counselor.type}
                </h1>
              </CardContent>
            </CardActionArea>
          ))}
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-10 rounded-md">
              <p className="text-lg">
                Start counseling session with{" "}
                {
                  <span className="text-blue-600 font-bold">
                    {selectedCounselor.type}{" "}
                  </span>
                }
                ?
              </p>
              <div className="flex justify-center mt-3">
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded hover:brightness-110 transition duration-300"
                  onClick={() => handleConfirmation(true)}
                >
                  Yes
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:brightness-110"
                  onClick={() => handleConfirmation(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Counselors;
