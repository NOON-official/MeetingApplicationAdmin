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

export interface UserStudentCard {
  userId: number;
  nickname: string;
  birth: number;
  university: string;
  gender: string;
  studentCardUrl: string;
}

export interface AdminUserStudentCard {
  users: UserStudentCard[];
}
