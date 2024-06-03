import React from "react";
import { CardContent, CardMedia, CardActionArea } from "@mui/material";
import toneAnalyzer from "../assets/TextTone.jpg";
import personalityTest from "../assets/PersonalityTest.jpg";
import { toast } from "react-toastify";

const Tools = () => {
  const tools = [
    {
      type: "Tone Detector",
      image: toneAnalyzer,
    },
    {
      type: "Personality Insights",
      image: personalityTest,
    },
  ];
  const handleClick = (tool) => {
    if (tool.type === "Tone Detector") {
      window.open(
        "https://abhishekdogra19.github.io/Speech-Text-ToneAnalyzer/",
        "_blank"
      );
    } else {
      toast.info("Coming Soon");
    }
  };

  return (
    <div className="p-12 md:p-16 flex flex-col gap-5" id="tools">
      <h1 className="text-lg lg:text-4xl p-2 text-center font-bold">
        Analysis & Assessment <span className="text-primaryColor">Tools</span>.
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:py-10 gap-10 place-items-center ">
        {tools.map((tool, index) => (
          <CardActionArea
            key={index}
            onClick={() => handleClick(tool)}
            className="h-96 overflow-hidden group max-w-lg rounded-t-lg"
          >
            <div className="h-80 overflow-hidden rounded-t-lg bg-cover">
              <CardMedia
                component="img"
                height="140"
                image={tool.image}
                alt={tool.type}
                className="flex items-center justify-center  border-2 h-full group-hover:scale-110 duration-300 "
              />
            </div>
            <CardContent className="text-center bg-black rounded-b-lg text-white h-full">
              <h1 className="text-white group-hover:scale-105 group-hover:font-semibold group-hover:underline duration-300">
                {tool.type}
              </h1>
            </CardContent>
            {tool.type === "Personality Insights" && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white text-3xl lg:text-4xl">
                Coming Soon
              </div>
            )}
          </CardActionArea>
        ))}
      </div>
    </div>
  );
};

export default Tools;
