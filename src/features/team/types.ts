export interface TeamCountResult {
  teamsPerRound: number;
  "2vs2": { male: number; female: number };
  "3vs3": { male: number; female: number };
}

export type RequestParams = Record<string, string | number>;

export interface AdminTeamsParams extends RequestParams {
  status: "APPLIED" | "MATCHED" | "FAILED" | "PARTNER_TEAM_REFUSED";
  membercount: 2 | 3;
  gender: "male" | "female";
}

export interface AdminTeamsResult {
  teams: Team[];
}

export interface Team {
  teamId: string;
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
