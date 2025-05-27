import { RootState } from "@/app/store/store";
import { getMiglioramenti } from "@/entities/user/miglioramenti/thunks/getMiglioramenti.thunk";
import { createSlice } from "@reduxjs/toolkit";

export interface miglioramentiInterface {
  id: number;
  name: string;
  description: string;
  cost: number;
  isInfinite: boolean;
  imagePath: string;
}

/**
 * Начальное состояние глобального объекта, связанного с улучшениями
 */
const initialState: { data: miglioramentiInterface[] } = {
  data: [],
};

const miglioramentiSlice = createSlice({
  name: "miglioramenti",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMiglioramenti.fulfilled, (state, action) => {
      state.data = action.payload.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          imagePath: item.image_path,
          cost: item.cost_coins,
          isInfinite: item.upgrade_type === "permanent" ? true : false,
        };
      });
    });
  },
});

export const getMiglioramentiList = (state: RootState) =>
  state.miglioramenti.data;

export default miglioramentiSlice.reducer;
