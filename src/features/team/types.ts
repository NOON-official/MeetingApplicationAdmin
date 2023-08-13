import { RequestParams } from '../types';

export interface TeamCountResult {
  teamsPerRound: number;
  '2vs2': { male: number; female: number };
  '3vs3': { male: number; female: number };
  '4vs4': { male: number; female: number };
}

export interface AdminTeamsParams extends RequestParams {
  gender: 'male' | 'female';
}

export interface AdminTeamsResult {
  teams: Team[];
}

export interface Team {
  teamId: number;
  nickname: string;
  kakaoId: string;
  teamName: string;
  intro: string;
  memberCount: number;
  memberCounts: number[];
  phone: string;
  age: number;
  prefAge: number[];
  areas: number[];
  universities?: number[];
  drink: number;
  appliedAt: Date;
  userId: number;
}

export interface AdminMatchingsResult {
  matchings: Matching[];
}

export interface Matching {
  matchingId: number;
  maleTeamId: number;
  maleTeamNickname: string;
  maleTeamPhone: string;
  femaleTeamId: number;
  femaleTeamNickname: string;
  femaleTeamPhone: string;
  matchedAt: string;
  chatIsCreated: boolean;
}

export interface AdminOurteamRefusedTeamsResult {
  teams: OurteamRefusedTeam[];
}

export interface OurteamRefusedTeam {
  teamId: number;
  nickname: string;
  gender: string;
  phone: string;
  refusedAt: string;
  matchingRefuseReason: string;
}
