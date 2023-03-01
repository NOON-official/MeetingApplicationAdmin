import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from "@/config/constants";
import browserStorage from "@/utils/browserStorage";
import { AdminUsersResult } from "./types";

const userApi = createApi({
  reducerPath: `userApi`,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const accessToken = browserStorage.getItem(STORAGE_KEY_ACCESS_TOKEN);
      if (accessToken) {
        headers.set(`Authorization`, `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: [`Users`],
  endpoints: (builder) => ({
    getAdminUsers: builder.query<AdminUsersResult, void>({
      query: () => ({
        url: `admin/users`,
      }),
      providesTags: [`Users`],
    }),
  }),
});

export const { useGetAdminUsersQuery } = userApi;

export default userApi;
