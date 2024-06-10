import React from "react";
import { motion } from "framer-motion";
import doc from "../assets/google-docs.png";
import { InfiniteMovingCardsDemo } from "./InfiniteMovingCardsDemo";

const ReportsCarousel = ({ reports }) => {
  const displayReports = reports.slice(0, 6);
  return <InfiniteMovingCardsDemo data={displayReports} />;
};

export default ReportsCarousel;
