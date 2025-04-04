import { RootState } from "@/app/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface miglioramentiInterface {
  id: number;
  name: string;
  description: string;
  cost: number;
  isInfinite: boolean;
  imagePath: string;
}

const initialState: { data: miglioramentiInterface[] } = {
  data: [],
};

const miglioramentiSlice = createSlice({
  name: "miglioramenti",
  initialState,
  reducers: {
    setMiglioramentiList: (
      state,
      action: PayloadAction<miglioramentiInterface[]>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setMiglioramentiList } = miglioramentiSlice.actions;

export const getMiglioramentiList = (state: RootState) =>
  state.miglioramenti.data;

export default miglioramentiSlice.reducer;
