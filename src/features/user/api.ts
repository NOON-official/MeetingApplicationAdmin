import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from '@/config/constants';
import browserStorage from '@/utils/browserStorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminUserStudentCardImg, AdminUsersResult } from './types';

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
    getAdminStudentCardImg: builder.query<AdminUserStudentCardImg, void>({
      query: () => ({
        url: `admin/users/student-card`,
      }),
      providesTags: [`Users`],
    }),
    postAdminTing: builder.mutation<
      any,
      {
        tingUserId: number;
        tingCount: number;
      }
    >({
      query({ tingUserId, tingCount }) {
        return {
          url: `admin/users/${tingUserId}/tings`,
          method: `POST`,
          body: { tingCount },
        };
      },
      invalidatesTags: [`Users`],
    }),
    deleteAdminTing: builder.mutation<
      any,
      { tingUserId: number; tingCount: number }
    >({
      query({ tingUserId, tingCount }) {
        return {
          url: `admin/users/${tingUserId}/tings/${tingCount}`,
          method: `DELETE`,
        };
      },
      invalidatesTags: [`Users`],
    }),
    putAdminUsersUserIdStudentCardVerify: builder.mutation<
      any,
      { userId: number }
    >({
      query({ userId }) {
        return {
          url: `admin/users/${userId}/student-card/verify`,
          method: `PUT`,
        };
      },
      invalidatesTags: [`Users`],
    }),
    putAdminUsersUserIdStudentCardDecline: builder.mutation<
      any,
      { userId: number }
    >({
      query({ userId }) {
        return {
          url: `admin/users/${userId}/student-card/decline`,
          method: `PUT`,
        };
      },
      invalidatesTags: [`Users`],
    }),
    postAdminUsersTing: builder.mutation<void, void>({
      query() {
        return {
          url: `admin/users/ting`,
          method: `POST`,
        };
      },
      invalidatesTags: [`Users`],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useGetAdminStudentCardImgQuery,
  usePostAdminTingMutation,
  useDeleteAdminTingMutation,
  usePutAdminUsersUserIdStudentCardVerifyMutation,
  usePutAdminUsersUserIdStudentCardDeclineMutation,
  usePostAdminUsersTingMutation,
} = userApi;

export default userApi;
