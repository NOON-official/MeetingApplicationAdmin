import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { STORAGE_KEY_ACCESS_TOKEN } from "@/config/constants";
import browserStorage from "@/utils/browserStorage";
import { loadUserAgreements, logout, refreshJwtToken } from "./asyncActions";

interface UserState {
  accessToken: string | null;
  id: number | null;
  agreement: any;
}

const initialState: UserState = {
  accessToken: browserStorage.getItem(`accessToken`),
  id: null,
  agreement: null,
};

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;

      const payload = jwtDecode<{ sub: number }>(action.payload);
      state.id = payload.sub;

      browserStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = null;
      state.id = null;
      browserStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);
    });
    builder.addCase(refreshJwtToken.fulfilled, (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;

      const payload = jwtDecode<{ sub: number }>(accessToken);
      state.id = payload.sub;

      browserStorage.setItem(STORAGE_KEY_ACCESS_TOKEN, accessToken);
    });
    builder.addCase(refreshJwtToken.rejected, (state) => {
      state.accessToken = null;
      state.id = null;
      browserStorage.removeItem(STORAGE_KEY_ACCESS_TOKEN);
    });
    builder.addCase(loadUserAgreements.fulfilled, (state, action) => {
      state.agreement = action.payload;
    });
  },
});

export const { setAccessToken } = userSlice.actions;

export default userSlice.reducer;
