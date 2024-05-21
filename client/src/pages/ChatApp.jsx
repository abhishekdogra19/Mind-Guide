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
import AssistantAvatar from "../components/AssistantAvatar";
import ScrollableFeed from "react-scrollable-feed";
import ReportModal from "../components/ReportModal";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [renderContent, setRenderContent] = useState([]);
  const inputElement = useRef(null);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const { type } = useParams();
  const [report, setReport] = useState();
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  const { type: counsellorType } = useParams();
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);
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
  useEffect(() => {
    inputElement.current.focus();
  }, [messages]);
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
      const response = await axios.post("http://localhost:3001/api/v1/chat", {
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
          utterance.rate = 1;
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

  const HandleReportGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/v1/chat/report",
        {
          chat: messages,
          userName: userInfo?.name,
          counsellorType,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setReport(response.data);
        setReportModalOpen(true); // Open the modal after receiving the response
      } else {
        console.error("Error in fetching initial messages");
      }
    } catch (err) {
      console.error("Error in fetching initial messages", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("userInfo ", userInfo);
    if (!userInfo) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/chat/${type}`
        );
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
    inputElement.current.focus();
  }, [type, userInfo]);

  useEffect(() => {
    setRenderContent(
      messages.map((message, index) => {
        const isUserMessage = message.role === "user";
        const isNewMessage = index === messages.length - 1;

        return (
          <div
            key={index}
            style={{
              width: "100%",
              display: "flex",
              visibility: message.role === "system" ? "hidden" : "block",
              position: message.role === "system" ? "absolute" : "",
              justifyContent: isUserMessage ? "flex-end" : "flex-start",
              marginTop: "8px",
            }}
          >
            <span
              className={`flex items-center w-full ${
                isUserMessage ? "justify-end" : "justify-start"
              } `}
            >
              {isNewMessage && !isUserMessage && <AssistantAvatar />}
              <div
                className={`text-xs lg:text-xl ${
                  isUserMessage ? "userMsg" : "botMsg"
                }`}
                style={{
                  padding: "10px",
                  margin: "8px",
                  maxWidth: "50%",
                  minWidth: "10%",
                  wordWrap: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </span>
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
        color: "red",
      });
    } else {
      // Stop the animation when not listening
      microphoneAnimationControls.start({
        color: "white",
      });
      microphoneAnimationControls.stop();
    }
  }, [listening, microphoneAnimationControls]);
  useEffect(() => {
    setTotalMessages(messages.length); // Update total messages when messages change
  }, [messages]);
  return (
    <div className=" flex flex-col relative w-full ">
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
      <div className="h-[90vh] flex flex-col bg-green-950 relative">
        {report && <ReportModal report={report} open={isReportModalOpen} />}
        <div className=" bg-[#131419] flex-1 overflow-y-scroll   flex flex-col example pb-52 ">
          <ScrollableFeed>{renderContent}</ScrollableFeed>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-black max-w-4xl  mx-auto p-6 rounded-xl mb-1  flex flex-col lg:flex-row items-center w-full z-0 absolute bottom-0  ">
            <input
              type="text"
              className="w-full lg:w-2/3  bg-cyan-50 px-4 py-2 flex-1 rounded-lg"
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
            <span className="flex py-2 w-full lg:w-1/3  gap-1 px-2">
              <div className="flex px-2 items-center justify-center   active:scale-75 duration-300">
                <motion.div
                  animate={microphoneAnimationControls}
                  onClick={startListening}
                  className="text-xl text-black"
                >
                  <FontAwesomeIcon icon={faMicrophone} />
                </motion.div>
              </div>
              <button
                className="text-white py-2 px-4"
                onClick={() => {
                  setInputText(transcript);
                  resetTranscript();
                  generateText();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
              <button
                className={`bg-red-500 text-white py-2 px-4 w-full rounded-lg ${
                  totalMessages < 15 ? "cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  if (totalMessages < 15) {
                    toast.warning(
                      "Minimum 15 messages required to end session"
                    );
                  } else {
                    HandleReportGenerate();
                  }
                }}
              >
                End Session
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
