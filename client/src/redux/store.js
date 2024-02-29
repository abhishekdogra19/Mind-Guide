import { configureStore } from "@reduxjs/toolkit";
import mindGuideReducer from "./mindGuideSlice";
export const store = configureStore({
  reducer: {
    mindGuide: mindGuideReducer,
  },
});
