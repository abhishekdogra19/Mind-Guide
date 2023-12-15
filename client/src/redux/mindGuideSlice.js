import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const mindGuideSlice = createSlice({
  name: "mindGuide",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { addUser, removeUser } = mindGuideSlice.actions;
export default mindGuideSlice.reducer;
