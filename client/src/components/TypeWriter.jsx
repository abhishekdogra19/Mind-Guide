import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const TypeWriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default TypeWriter;
