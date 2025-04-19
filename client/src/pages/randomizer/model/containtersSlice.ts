import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { ContainerInterface, ContainerSliceInterface } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  data: ContainerSliceInterface[];
  keys: number;
  allContainers: ContainerInterface[];
} = {
  data: [],
  keys: 0,
  allContainers: [],
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
    setAllContainers: (state, action: PayloadAction<ContainerInterface[]>) => {
      state.allContainers = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getContainers.fulfilled, (state, action) => {
      state.allContainers = action.payload;
    });
  },
});

export const {
  setContainers,
  addContainer,
  setContainerKeys,
  setAllContainers,
} = containersSlice.actions;

export default containersSlice.reducer;
