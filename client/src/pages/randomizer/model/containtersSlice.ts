import { getContainers } from "@/entities/user/containers/thunks/getContainers.thunk";
import { fetchClickerData, loginUser } from "@/entities/user/model/thunks";
import { ContainerInterface, ContainerSliceInterface } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  data: ContainerSliceInterface[];
  keys: number;
  allContainers: ContainerInterface[];
  activeContainer: ContainerInterface | null;
} = {
  data: [],
  keys: 0,
  allContainers: [],
  activeContainer: null,
};

const setContainersData = (
  state: {
    data: ContainerSliceInterface[];
    keys: number;
    allContainers: ContainerInterface[];
  },
  data: any
) => {
  state.data = data.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      imagePath: item.imagePath,
      price: item.price,
      rewards: item.rewards,
      count: item.quantity,
    };
  });
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
    setActiveContainer: (state, action: PayloadAction<ContainerInterface | null>) => {
      state.activeContainer = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getContainers.fulfilled, (state, action) => {
      state.allContainers = action.payload;
    });
    builder.addCase(fetchClickerData.fulfilled, (state, action) => {
      setContainersData(state, action.payload.containers);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      setContainersData(state, action.payload.containers);
    });
  },
});

export const {
  setContainers,
  addContainer,
  setContainerKeys,
  setAllContainers,
  setActiveContainer,
} = containersSlice.actions;

export default containersSlice.reducer;
