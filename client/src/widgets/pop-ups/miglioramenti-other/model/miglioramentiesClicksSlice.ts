import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  data: miglioramentiInterface | null;
} = {
  data: null,
};

export const miglioramentiClicksSlice = createSlice({
  name: "miglioramentiClicks",
  initialState,
  reducers: {
    setMiglioramentiClicks: (
      state,
      action: PayloadAction<miglioramentiInterface | null>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setMiglioramentiClicks } = miglioramentiClicksSlice.actions;

export default miglioramentiClicksSlice.reducer;
