import { useState, useEffect, useMemo } from "react";
import { Avatar } from "react-avataaars";

const AssistantAvatar = () => {
  const hash = "5";
  const [blinking, setBlinking] = useState(false);
  const [mouthMovement, setMouthMovement] = useState("default");

  const mouthMovements = useMemo(() => ["default", "smile", "twinkle"], []);

  const options = {
    style: "circle",
    hairColor: "Black",
    facialHairColor: "Black",
    clothes: "sweater",
    skin: "light",
    eyes: blinking ? "close" : "default",
    mouth: mouthMovement,
    top: "shortHair",
    accessories: "prescription02",
  };
  useEffect(() => {
    const blinkingInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => {
        setBlinking(false);
      }, 500);
    }, 3000);
    return () => clearInterval(blinkingInterval);
  }, []);
  useEffect(() => {
    const speakingInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mouthMovements.length);
      setMouthMovement(mouthMovements[randomIndex]);
    }, 400);

    // Stop mouth movements after 10 seconds (adjust as needed)
    const stopSpeakingTimeout = setTimeout(() => {
      clearInterval(speakingInterval);
      setMouthMovement("twinkle");
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => {
      clearInterval(speakingInterval);
      clearTimeout(stopSpeakingTimeout);
    };
  }, [mouthMovements]);

  return <Avatar options={options} hash={hash} size="200px" />;
};

export default AssistantAvatar;
