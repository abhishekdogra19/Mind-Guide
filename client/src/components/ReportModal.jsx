/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import hero from "../assets/hero.png";
import ReportBG from "../assets/ReportBG.png";

const ReportModal = ({ report, open }) => {
  const contentRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  const [contentReady, setContentReady] = useState(false);
  const { type: counsellorType } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const saveReportToCloud = async () => {
    setUploading(true);
    const content = contentRef.current;
    if (content) {
      const pdfContent = content.cloneNode(true);
      const buttonsToRemove = pdfContent.querySelectorAll("button");
      buttonsToRemove.forEach((button) => button.remove());

      const pdfOptions = {
        margin: 10,
        filename: "report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf()
        .from(pdfContent)
        .set(pdfOptions)
        .output("blob")
        .then(function (blob) {
          const formData = new FormData();
          formData.append("file", blob, "report.pdf");
          axios
            .post(`/api/v1/user/uploadpdf/${counsellorType}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              console.log("Server response:", response.data);
              toast.success("Report successfully uploaded");
              setUploading(false);
            })
            .catch((error) => {
              console.error("Upload error:", error.response);
              setUploading(false);
            });
        });
    }
  };

  useEffect(() => {
    if (open) {
      setContentReady(true);
    } else {
      setContentReady(false);
    }
  }, [open]);

  useEffect(() => {
    if (contentReady && open) {
      saveReportToCloud();
    }
  }, [contentReady, open]);

  const handleRoadmapCreation = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/chat/roadmap", {
        roadmap: {},
      });
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Roadmap created successfully");
        setTimeout(() => {
          navigate("../");
        }, 2000);
      } else {
        console.error("Error in fetching initial messages");
        toast.error("Failed to create roadmap");
      }
    } catch (error) {
      console.error("Error in fetching roadmap", error);
      toast.error("Error creating roadmap");
    }
    setLoading(false);
  };

  const downloadReport = () => {
    const content = contentRef.current;

    if (content) {
      const pdfContent = content.cloneNode(true);
      const buttonsToRemove = pdfContent.querySelectorAll("button");
      buttonsToRemove.forEach((button) => button.remove());

      const pdfOptions = {
        margin: 10,
        filename: "report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().from(pdfContent).set(pdfOptions).save();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        center
        closeOnOverlayClick={false}
        closeIcon={
          uploading ? null : (
            <button
              className="bg-red-700 px-2 py-1  rounded-xl font-bold text-white"
              onClick={() => {
                // Prevent closing if still uploading
                if (!uploading) {
                  navigate("../");
                }
              }}
            >
              Back
            </button>
          )
        }
        classNames={{ modal: "custom-modal" }}
      >
        {loading && (
          <div className=" absolute top-0 left-0 w-full h-full  modal flex items-center justify-center z-50">
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
        <div
          className="modal-content   flex flex-col gap-1  border-black border-2 relative "
          ref={contentRef}
        >
          <div className="bg-primaryColor text-white text-xs lg:text-xl   mb-3 flex items-center justify-between px-10 z-50">
            <h className="font-bold underline underline-offset-4">
              Mind Guide: Your Personalized AI Counsellor
            </h>
            <div className="overflow-hidden h-40">
              <img src={hero} alt="" className="object-cover w-full h-full" />
            </div>
          </div>
          <div className="px-10 flex font-medium justify-between text-xs lg:text-lg z-50">
            <div className="flex flex-col  gap-1 ">
              <h1>
                Name:{" "}
                <span className="capitalize underline underline-offset-4 font-semibold">
                  {userInfo?.name}
                </span>
              </h1>
              <h1>
                Email:{" "}
                <span className="underline underline-offset-4 font-semibold">
                  {userInfo?.email}
                </span>
              </h1>
            </div>
            <h1>
              Date:{" "}
              <span className="underline underline-offset-4 font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </h1>
          </div>
          <div className="px-10 mt-2 rounded-lg  py-10 z-50">
            <ReactMarkdown className="flex flex-col gap-3 text-xs lg:text-sm text-justify  ">
              {report}
            </ReactMarkdown>
          </div>
          <div className=" border-b-2 border-black py-2">{/* Footer */}</div>
          <div className="flex gap-2 p-10" style={{ marginTop: "10px" }}>
            <button
              onClick={() => {
                if (uploading) {
                  toast.warning("Please wait, report is being uploaded...");
                } else {
                  downloadReport();
                }
              }}
              className={`px-4 py-2 text-white bg-green-700 rounded-lg  text-xs lg:text-lg${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Download Report
            </button>{" "}
            {counsellorType === "career counselor" && (
              <button
                onClick={handleRoadmapCreation}
                className="bg-gray-400 py-2 rounded-lg px-2 text-white text-xs lg:text-lg"
                disabled={loading}
              >
                {!loading ? "Create Roadmap 🚀" : "Generating Roadmap ⌛"}
              </button>
            )}
          </div>
          <img
            src={ReportBG}
            alt=""
            className="absolute bottom-36 opacity-10 "
          />
        </div>
      </Modal>
    </div>
  );
};

export default ReportModal;
