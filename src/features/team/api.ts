import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from "@/config/constants";
import browserStorage from "@/utils/browserStorage";
import { AdminTeamsParams, AdminTeamsResult, TeamCountResult } from "./types";

const teamApi = createApi({
  reducerPath: `teamApi`,
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
  endpoints: (builder) => ({
    getTeamMembersCountOneWeek: builder.query({
      query: () => `teams/members/count/one-week`,
    }),
    getTeamCounts: builder.query<TeamCountResult, void>({
      query: () => `teams/counts`,
    }),
    getAdminTeams: builder.query<AdminTeamsResult, AdminTeamsParams>({
      query: (params) => ({
        url: `admin/teams`,
        params,
      }),
    }),
  }),
});

export const {
  useGetTeamMembersCountOneWeekQuery,
  useGetTeamCountsQuery,
  useGetAdminTeamsQuery,
} = teamApi;

export default teamApi;
