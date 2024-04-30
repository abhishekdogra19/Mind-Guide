/* eslint-disable react/prop-types */
import { useRef } from "react";
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
  const userInfo = useSelector((state) => state.mindGuide.userInfo);

  const handleRoadmapCreation = async () => {
    // const jsonData = JSON.stringify(setReport);
    // console.log(jsonData);
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

      // Generate PDF and output as a blob
      html2pdf()
        .from(pdfContent)
        .set(pdfOptions)
        .output("blob")
        .then(function (blob) {
          // Create a FormData object and append the file with name 'file'
          const formData = new FormData();
          formData.append("file", blob, "report.pdf");

          // Send a POST request to the server with the PDF file
          toast.promise(() => {
            axios
              .post("http://localhost:3001/api/v1/user/uploadpdf", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log("Server response:", response.data);
                // After uploading the PDF to the server, download the PDF in the client
                downloadBlob(blob, "report.pdf");
              })
              .catch((error) => {
                console.error("Upload error:", error.response);
              }),
              {
                loading: "Uploading report...",
                success: "Report uploaded successfully",
                error: "Error uploading report",
              };
          });
        });
    }
  };

  // Function to trigger browser download of a Blob
  function downloadBlob(blob, filename) {
    // Create an invisible anchor element
    const anchor = document.createElement("a");
    const url = window.URL.createObjectURL(blob);

    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = "none";

    // Append anchor to the body
    document.body.appendChild(anchor);

    // Trigger download
    anchor.click();

    // Clean up and remove the anchor element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(anchor);
  }
  const { type: counsellorType } = useParams();
  console.log(open);
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        open={open}
        center
        closeOnOverlayClick={false}
        closeIcon={
          <button className="bg-red-700 px-2 py-1  rounded-xl font-bold text-white">
            Back{" "}
          </button>
        }
        onClose={() => {
          navigate("../counselors");
        }}
        classNames={{ modal: "custom-modal" }}
      >
        <div className="modal-content" ref={contentRef}>
          <h2>
            Greetings{" "}
            <span className="capitalize underline font-extrabold">
              {userInfo?.name}
            </span>
            , Here is your <span className="text-green-600">report</span>.
          </h2>
          <ReactMarkdown>{report}</ReactMarkdown>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => {
                downloadReport();
              }}
              className="px-4 py-2  text-white bg-green-700 rounded-lg"
            >
              Download Report
            </button>{" "}
            {counsellorType == "career counselor" && (
              <button
                onClick={handleRoadmapCreation}
                className="bg-gray-400 py-2 rounded-lg px-2 text-white"
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
