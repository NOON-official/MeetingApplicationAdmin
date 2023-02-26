export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;
export const STORAGE_KEY_ACCESS_TOKEN = `accessToken`;
export const STORAGE_KEY_REFRESH_TOKEN = `refresh`;

export const Areas = [
  { name: `강남`, id: 1 },
  { name: `건대`, id: 2 },
  { name: `신촌`, id: 3 },
  { name: `홍대`, id: 4 },
  { name: `상관없음`, id: 5 },
];

// 상관없음 선택지의 ID (알고리즘에 활용)
export const AREA_IGNORE_ID = 5;
