import { API_URL, STORAGE_KEY_ACCESS_TOKEN } from '@/config/constants';
import browserStorage from '@/utils/browserStorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminUserStudentCard, AdminUsersResult } from './types';

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
    getAdminUserStudentCard: builder.query<AdminUserStudentCard, void>({
      query: () => ({
        url: `admin/users/student-card`,
      }),
      providesTags: [`Users`],
    }),
    postCoupon: builder.mutation<
      any,
      { userId: number; couponTypeId: number; expiresAt: string }
    >({
      query({ userId, couponTypeId, expiresAt }) {
        return {
          url: `admin/users/coupons/${userId}`,
          method: `POST`,
          body: {
            couponTypeId,
            expiresAt,
          },
        };
      },
      invalidatesTags: [`Users`],
    }),
    deleteTicket: builder.mutation<
      any,
      { userId: number; ticketCount: number }
    >({
      query({ userId, ticketCount }) {
        return {
          url: `admin/users/${userId}/tickets/${ticketCount}`,
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
  useGetAdminUserStudentCardQuery,
  usePostCouponMutation,
  useDeleteTicketMutation,
  usePutAdminUsersUserIdStudentCardVerifyMutation,
  usePutAdminUsersUserIdStudentCardDeclineMutation,
  usePostAdminUsersTingMutation,
} = userApi;

export default userApi;
