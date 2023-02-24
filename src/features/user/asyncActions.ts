import { createAsyncThunk } from "@reduxjs/toolkit";
import backend from "@/utils/backend";

export const logout = createAsyncThunk(`user/logout`, async () => {
  const response = await backend.get(`/auth/signout`);

  return response.data;
});

export const refreshJwtToken = createAsyncThunk(
  `user/refreshJwtToken`,
  async () => {
    const response = await backend.get(`/auth/refresh`, {
      withCredentials: true,
    });

    return response.data;
  }
);
