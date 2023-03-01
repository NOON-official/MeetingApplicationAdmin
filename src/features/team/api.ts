import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from "@/config/constants";
import browserStorage from "@/utils/browserStorage";
import {
  AdminMatchingsResult,
  AdminTeamsParams,
  AdminTeamsResult,
  TeamCountResult,
} from "./types";

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
  tagTypes: [`Teams`, `Matchings`],
  endpoints: (builder) => ({
    getTeamMembersCountOneWeek: builder.query({
      query: () => `teams/members/count/one-week`,
    }),
    getAdminTeamCount: builder.query<TeamCountResult, void>({
      query: () => `admin/teams/count`,
    }),
    getAdminTeams: builder.query<AdminTeamsResult, AdminTeamsParams>({
      query: (params) => ({
        url: `admin/teams`,
        params,
      }),
      providesTags: [`Teams`],
    }),
    getAdminMatchings: builder.query<AdminMatchingsResult, void>({
      query: () => ({
        url: `admin/matchings`,
      }),
      providesTags: [`Matchings`],
    }),
    postMatchings: builder.mutation({
      query() {
        return {
          url: `admin/matchings`,
          method: `POST`,
        };
      },
      invalidatesTags: [`Teams`],
    }),
    deleteTeamId: builder.mutation<any, { teamId: number }>({
      query({ teamId }) {
        return {
          url: `admin/teams/${teamId}`,
          method: `DELETE`,
        };
      },
      invalidatesTags: [`Teams`],
    }),
  }),
});

export const {
  useGetTeamMembersCountOneWeekQuery,
  useGetAdminTeamCountQuery,
  useGetAdminTeamsQuery,
  useGetAdminMatchingsQuery,
  usePostMatchingsMutation,
  useDeleteTeamIdMutation,
} = teamApi;

export default teamApi;
