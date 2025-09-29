import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnectons: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      return null;
    },
  },
});

export const { addConnectons, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
