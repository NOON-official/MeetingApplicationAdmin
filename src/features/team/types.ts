import { RequestParams } from "../types";

export interface TeamCountResult {
  teamsPerRound: number;
  "2vs2": { male: number; female: number };
  "3vs3": { male: number; female: number };
}

export interface AdminTeamsParams extends RequestParams {
  status: "APPLIED" | "MATCHED" | "FAILED" | "PARTNER_TEAM_REFUSED";
  membercount: 2 | 3;
  gender: "male" | "female";
}

export interface AdminTeamsResult {
  teams: Team[];
}

export interface Team {
  teamId: number;
  matchingCount: number;
  nickname: string;
  intro: string;
  memberCount: number;
  phone: string;
  averageAge: number;
  prefAge: number[];
  areas: number[];
  universities: number[];
  prefSameUniversity: boolean;
  drink: number;
  partnerTeamId: number;
  appliedAt: string;
  matchedAt: string;
  failedAt: string;
  refusedAt: string;
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
