import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
const ReportModal = ({ report }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const userInfo = useSelector((state) => state.mindGuide.userInfo);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: "custom-modal" }}
      >
        <div className="modal-content">
          <h2>
            Greetings{" "}
            <span className="capitalize underline font-extrabold">
              {userInfo?.name}
            </span>
            , Here is your <span className="text-green-600">report</span>.
          </h2>
          <ReactMarkdown>{report}</ReactMarkdown>
          <button className="px-4 py-2 text-white bg-green-700 rounded-lg">
            Download Report
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ReportModal;
