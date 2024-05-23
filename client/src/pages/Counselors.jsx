import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const counselors = [
  {
    type: "Academic Counselor",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-speech-therapy-illustration_23-2149211795.jpg?w=1060&t=st=1701240171~exp=1701240771~hmac=7724e7522d1530150a446d7c781fc7bf01fcb98fd123df50ff5a3d9a6e5132a9",
  },
  {
    type: "Career Counselor",
    image:
      "https://cdn.vectorstock.com/i/1000x1000/75/62/psychotherapy-counseling-doctor-psychologist-vector-25617562.webp",
  },
  {
    type: "Personal Counselor",
    image:
      "https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4874.jpg?w=740&t=st=1701239974~exp=1701240574~hmac=0113c9f934511efbd7fdec887780a1d0419b0c9daef878ededa42d54a722352a",
  },
  {
    type: "Financial Counselor",
    image:
      "https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4764.jpg?w=1060&t=st=1701240027~exp=1701240627~hmac=1834e3cae4356cabb9d2131497e0886a3087f2c1202571135610816574b114d7",
  },
  {
    type: "Health and Wellness Counselor",
    image:
      "https://img.freepik.com/free-vector/medical-worker-with-clipboard-waiting-patients_74855-7617.jpg?w=1380&t=st=1701240056~exp=1701240656~hmac=16eb398c823e4f8fd11c0abea654bba7166348188b9faf8868214bffc3257dc4",
  },
  {
    type: "Student Life Counselor",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-visit-psychologist-concept_52683-69070.jpg?w=996&t=st=1701240107~exp=1701240707~hmac=2263fc5eaa7dfbcbdf544e73f298064cf82f0e8d7ca0ded471712d03d37fa2f4",
  },
  {
    type: "Emotional Support Counselor",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-visit-psychologist-concept_52683-69069.jpg?w=740&t=st=1701240136~exp=1701240736~hmac=da1f260b4eafd0ca44d15abbdac1ac8feec04af3fd94ebe9451dd8feb023d996",
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
      <div className="overflow-hidden p-10 mb-6">
        <div className="text-xl lg:text-4xl font-bold text-center text-gray-800 py-10">
          Kindly choose your designated{" "}
          <span className="text-green-400">counselor</span>.
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center ">
          {counselors.map((counselor, index) => (
            <CardActionArea
              key={index}
              onClick={() => handleCounselorClick(counselor)}
              className="h-96 overflow-hidden group max-w-lg rounded-t-lg"
            >
              <div className="h-72 overflow-hidden rounded-t-lg">
                <CardMedia
                  component="img"
                  height="140"
                  image={counselor.image}
                  alt={counselor.type}
                  className="flex items-center justify-center  border-2 h-full group-hover:scale-110 duration-300 "
                />
              </div>
              <CardContent className="text-center bg-gray-600 rounded-b-lg text-white h-full">
                <Typography gutterBottom variant="h5" component="div">
                  {counselor.type}
                </Typography>
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
