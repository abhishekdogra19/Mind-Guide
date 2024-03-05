import React, { useState } from "react";
import ReactDOM from "react-dom";
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
          <h2 className="greeting">
            Greetings {userInfo?.name}, Here is your report.
          </h2>
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      </Modal>
    </div>
  );
};

export default ReportModal;
