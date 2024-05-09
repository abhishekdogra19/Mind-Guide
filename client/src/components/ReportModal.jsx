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

const ReportModal = ({ report, open }) => {
  const contentRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const userInfo = useSelector((state) => state.mindGuide.userInfo);

  const { type: counsellorType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      saveReportToCloud();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleRoadmapCreation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/chat/roadmap",
        {
          roadmap: {},
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error("Error in fetching initial messages");
      }
    } catch (error) {
      console.error("Error in fetching roadmap", error);
    }
  };

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
            .post(
              `http://localhost:3001/api/v1/user/uploadpdf/${counsellorType}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
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
                  navigate("../counselors");
                }
              }}
            >
              Back
            </button>
          )
        }
        classNames={{ modal: "custom-modal" }}
      >
        <div
          className="modal-content bg-slate-200 flex flex-col gap-1  border-black border-2 p-4"
          ref={contentRef}
        >
          <div className="bg-slate-800 text-white text-3xl px-2 py-10 rounded-lg mb-3">
            Mind Guide: Your Personalized AI Counsellor
          </div>
          <div className="flex font-medium justify-between text-lg">
            <div className="flex flex-col  gap-1 ">
              <h1>
                Name:{" "}
                <span className="capitalize underline underline-offset-4">
                  {userInfo?.name}
                </span>
              </h1>
              <h1>
                Email:{" "}
                <span className="underline underline-offset-4">
                  {userInfo?.email}
                </span>
              </h1>
            </div>
            <h1>
              Date:{" "}
              <span className="underline underline-offset-4">
                {new Date().toLocaleDateString()}
              </span>
            </h1>
          </div>
          <div className="px-6 mt-2 rounded-lg  py-10 bg-slate-50 ">
            <ReactMarkdown className="flex flex-col gap-3 text-[16px] text-justify ">
              {report}
            </ReactMarkdown>
          </div>
          <div className=" border-b-2 border-black py-2">{/* Footer */}</div>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => {
                if (uploading) {
                  toast.warning("Please wait, report is being uploaded...");
                } else {
                  downloadReport();
                }
              }}
              className={`px-4 py-2 text-white bg-green-700 rounded-lg ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Download Report
            </button>{" "}
            {counsellorType === "career counselor" && (
              <button
                onClick={handleRoadmapCreation}
                className="bg-gray-400 py-2 rounded-lg px-2 text-white"
                disabled={uploading}
              >
                Create Roadmap 🚀
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportModal;
