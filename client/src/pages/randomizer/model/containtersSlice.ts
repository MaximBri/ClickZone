import { ContainerInterface, ContainerSliceInterface } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  data: ContainerSliceInterface[];
  keys: number;
} = {
  data: [],
  keys: 0,
};

const containersSlice = createSlice({
  name: "containers",
  initialState,
  reducers: {
    setContainers: (
      state,
      action: PayloadAction<ContainerSliceInterface[]>
    ) => {
      state.data = action.payload;
    },
    addContainer: (state, action: PayloadAction<ContainerInterface>) => {
      const item = state.data.find((item) => item.name === action.payload.name);
      if (item) {
        item.count++;
      } else {
        state.data.push({ ...action.payload, count: 1 });
      }
    },
    setContainerKeys: (state, action: PayloadAction<number>) => {
      state.keys = action.payload;
    },
  },
});

export const { setContainers, addContainer, setContainerKeys } =
  containersSlice.actions;

export default containersSlice.reducer;
