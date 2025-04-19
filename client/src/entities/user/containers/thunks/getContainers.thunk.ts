import { api } from "@/shared/api/base";
import { apiRoutes } from "@/shared/config/apiRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getContainers = createAsyncThunk(
  "containers/getContainers",
  async () => {
    const responce = await api.get(apiRoutes.containers);
    return responce.data;
  }
);
