import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unlock: false,
};

export const projectSliceReducer = createSlice({
  name: "projects",
  initialState,
  reducers: {
    unlockprojects(state, action) {
      state.unlock = true;
    },
  },
});

export default projectSliceReducer.reducer;
