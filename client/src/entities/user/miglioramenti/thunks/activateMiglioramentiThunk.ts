import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const activateMiglioramentiThunk = createAsyncThunk(
  "activateMiglioramenti",
  async (id: number) => {
    const responce = await api.post(apiRoutes.activateMiglioramenti, { id });
    return responce.data;
  }
);
