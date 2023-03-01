export interface User {
  userId: number;
  nickname: string;
  matchingStatus: string;
  phone: string;
  createdAt: string;
  referralId: string;
  ticketCount: number;
  discount50CouponCount: number;
  freeCouponCount: number;
  userInvitaionCount: number;
}

export interface AdminUsersResult {
  users: User[];
}
