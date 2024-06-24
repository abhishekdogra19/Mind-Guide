import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const TypeWriter = ({ text, speed = 50, scrollRef }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
      // Scroll to the bottom whenever displayedText changes
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed, scrollRef]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default TypeWriter;
