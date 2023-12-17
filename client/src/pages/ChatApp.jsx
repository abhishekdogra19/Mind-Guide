/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [renderContent, setRenderContent] = useState([]);
  const inputElement = useRef();
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const { type } = useParams();
  const startListening = () => {
    if (!listening) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      setListening(true);
    } else {
      SpeechRecognition.stopListening();
      setListening(false);
    }
  };
  const microphoneAnimationControls = useAnimation();
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  const generateText = async () => {
    if (inputText.trim() === "") {
      return;
    }
    try {
      const userMessage = {
        role: "user",
        content: inputText,
      };
      setInputText("");
      setLoading(true);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      const response = await axios.post("http://localhost:3001/chat", {
        messages: [...messages, userMessage],
      });
      setLoading(false);
      if (response.status === 200) {
        const botMessage = {
          role: "assistant",
          content: response.data,
        };

        setMessages([...messages, userMessage, botMessage]);
        try {
          const utterance = new SpeechSynthesisUtterance(response.data);
          window.speechSynthesis.speak(utterance);
        } catch (error) {
          console.error("Error in Speech Synthesis:", error);
        }
      } else {
        console.error("Error in communication with the server");
      }
    } catch (err) {
      console.error("Error occur while making the request to the server", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/chat/${type}`);
        if (response.status === 200) {
          setMessages(response.data);
        } else {
          console.error("Error in fetching initial messages");
        }
      } catch (err) {
        console.error("Error in fetching initial messages", err);
      }
    };
    fetchData();
  }, [type]);

  useEffect(() => {
    setRenderContent(
      messages.map((message, index) => {
        const isUserMessage = message.role === "user";

        return (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              visibility: message.role === "system" ? "hidden" : "",
              position: message.role === "system" ? "absolute" : "",
              justifyContent: isUserMessage ? "flex-end" : "flex-start",
              marginTop: "8px",
            }}
          >
            <div
              className={isUserMessage ? "userMsg" : "botMsg"}
              style={{
                padding: "10px",
                margin: "8px",
                maxWidth: "70%",
                minWidth: "10%",
                wordWrap: "break-word",
                whiteSpace: "pre-line", // Preserves newline characters
              }}
            >
              {message.content}
            </div>
          </div>
        );
      })
    );
  }, [messages]);

  useEffect(() => {
    if (listening) {
      // Start the animation when listening
      microphoneAnimationControls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5, repeat: Infinity },
      });
    } else {
      // Stop the animation when not listening
      microphoneAnimationControls.stop();
    }
  }, [listening, microphoneAnimationControls]);

  return (
    <div className="h-[90vh] bg-slate-500 flex flex-col relative w-full ">
      {loading && (
        <div className=" absolute   w-full h-full  modal flex items-center justify-center z-10">
          <div className="flex flex-col">
            <motion.div
              className="box"
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </div>
        </div>
      )}
      <div className="h-screen">
        <div className="chatAppBG h-[85vh] overflow-y-scroll flex-1  flex flex-col example pb-6">
          {renderContent}
        </div>
        <div className="bg-slate-600  flex items-center w-full z-0">
          <input
            type="text"
            className="h-10  bg-cyan-50 p-2 flex-1"
            placeholder="Type hello..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            ref={inputElement}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                generateText();
                inputElement.current.focus();
              }
            }}
          />
          <button
            className="text-white py-2 px-4"
            onClick={() => {
              setInputText(transcript);
              resetTranscript();
              generateText();
            }}
          >
            Send
          </button>
          <div className="p-4 rounded-full left-[50%] -translate-x-[50%] bg-white absolute  bottom-10 active:scale-75 duration-300">
            <motion.div
              animate={microphoneAnimationControls}
              onClick={startListening}
              className="text-4xl"
            >
              <FontAwesomeIcon icon={faMicrophone} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
