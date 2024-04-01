import { useState, useRef } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { Link } from "react-router-dom";
import axios from "axios";
const ReportModal = ({ report }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const userInfo = useSelector((state) => state.mindGuide.userInfo);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleRoadmaButton = async () => {
    // await
  };
  const downloadReport = () => {
    const content = contentRef.current;

    if (content) {
      // Clone the content to create a separate HTML element for PDF conversion
      const pdfContent = content.cloneNode(true);

      // Remove the button from the PDF content
      const buttonToRemove = pdfContent.querySelector("button");
      if (buttonToRemove) {
        buttonToRemove.remove();
      }

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
      <button onClick={onOpenModal}>Open modal</button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
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
            </button>
            <button onClick={handleRoadmaButton}>Create Roadmap 🚀</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportModal;
