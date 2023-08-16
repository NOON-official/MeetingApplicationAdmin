import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from '@/config/constants';
import browserStorage from '@/utils/browserStorage';
import {
  AdminMatchingsResult,
  AdminTeamsParams,
  AdminTeamsResult,
  TeamCountResult,
  AdminOurteamRefusedTeamsResult,
  AdminAppliedAndRecievedResult,
} from './types';

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
    getAdminMatchingsApplied: builder.query<AdminAppliedAndRecievedResult, void>({
      query: () => ({
        url: `admin/matchings/applied`,
      }),
      providesTags: [`Matchings`],
    }),
    getAdminMatchingsSucceeded: builder.query<AdminMatchingsResult, void>({
      query: () => ({
        url: `admin/matchings/succeeded`,
      }),
      providesTags: [`Matchings`],
    }),
    getAdminOurteamRefusedTeams: builder.query<AdminOurteamRefusedTeamsResult, void>({
      query: () => ({
        url: `admin/teams/ourteam-refused`,
      }),
      providesTags: [`Teams`],
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
    putChat: builder.mutation<any, { matchingId: number }>({
      query({ matchingId }) {
        return {
          url: `admin/matchings/${matchingId}/chat`,
          method: `PUT`,
        };
      },
      invalidatesTags: [`Matchings`],
    }),
    deleteMatchingId: builder.mutation<any, { matchingId: number }>({
      query({ matchingId }) {
        return {
          url: `admin/matchings/${matchingId}`,
          method: `DELETE`,
        };
      },
      invalidatesTags: [`Matchings`],
    }),
    postMatching: builder.mutation<any, { maleTeamId: number; femaleTeamId: number }>({
      query({ maleTeamId, femaleTeamId }) {
        return {
          url: `admin/matchings/${maleTeamId}/${femaleTeamId}`,
          method: `POST`,
        };
      },
      invalidatesTags: [`Matchings`],
    }),
    deleteOurteamRefusedTeamId: builder.mutation<any, { teamId: number }>({
      query({ teamId }) {
        return {
          url: `admin/teams/ourteam-refused/${teamId}`,
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
  useGetAdminMatchingsAppliedQuery,
  useGetAdminMatchingsSucceededQuery,
  useGetAdminOurteamRefusedTeamsQuery,
  usePostMatchingsMutation,
  useDeleteTeamIdMutation,
  usePutChatMutation,
  useDeleteMatchingIdMutation,
  usePostMatchingMutation,
  useDeleteOurteamRefusedTeamIdMutation,
} = teamApi;

export default teamApi;
