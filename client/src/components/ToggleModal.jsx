import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import gpt from "../assets/gpt.jpg";
import llama from "../assets/llama.png";
const ToggleModal = () => {
  const [isLlama, setisLlama] = useState(false);

  const handleSwitchChange = (event) => {
    setisLlama(event.target.checked);
  };

  return (
    <div
      className="h-full border bg-white border-black p-6 flex flex-col items-center gap-2"
      style={{
        boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
        borderRadius: "15px",
      }}
    >
      <h1 className="text-center text-sm lg:text-xl font-semibold">
        Config LLM Model
      </h1>
      <div className="flex flex-col items-center h-full py-10">
        <div className="flex items-center gap-1 justify-center">
          <h1
            className={`px-2 border ${
              isLlama
                ? "bg-gray-600"
                : " bg-primaryColor font-bold underline underline-offset-4"
            }  rounded-2xl text-white py-2`}
          >
            ChatGPT
          </h1>

          <Switch
            checked={isLlama}
            onChange={handleSwitchChange}
            inputProps={{ "aria-label": "Toggle between GPT and Llama" }}
          />
          <h1
            className={`px-2 border ${
              isLlama
                ? " bg-blue-800  font-bold underline underline-offset-4"
                : "bg-gray-600"
            }  rounded-2xl text-white py-2`}
          >
            Llama
          </h1>
        </div>
        <div className="h-44 bg-white overflow-hidden">
          <img
            src={isLlama ? llama : gpt}
            alt={isLlama ? "Llama Model" : "GPT Model"}
            className="object-contain h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ToggleModal;
