import React from "react";
import { InfiniteMovingCards } from "./UI/InfiniteMovingCards";

export function InfiniteMovingCardsDemo({ data }) {
  return (
    <div className=" rounded-md flex flex-col antialiased bg-white  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={data} direction="left" speed="fast" />
    </div>
  );
}
