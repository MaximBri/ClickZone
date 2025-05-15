import { miglioramentiInterface } from "@/widgets/clicker-shop/model/miglioramentiSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Начальное состояние - объект с полем data - объект улучшения, которое активировано
 */
const initialState: {
  data: miglioramentiInterface | null;
} = {
  data: null,
};

export const miglioramentiClicksSlice = createSlice({
  name: "miglioramentiClicks",
  initialState,
  reducers: {
    /**
     * Метод, который устанавливает в активное улучшение улучшение из параметра либо null, что означает, что показывать окно с активацией улучшений показывать не нужно
     */
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
