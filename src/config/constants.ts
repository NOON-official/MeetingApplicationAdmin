export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;
export const STORAGE_KEY_ACCESS_TOKEN = `accessToken`;
export const STORAGE_KEY_REFRESH_TOKEN = `refresh`;

export const Areas = [
  { name: `강남`, id: 1 },
  { name: `건대`, id: 2 },
  { name: `수원`, id: 3 },
  { name: `신촌`, id: 4 },
  { name: `인천`, id: 5 },
  { name: `홍대`, id: 6 },
  { name: `경대 북문`, id: 7 },
  { name: `계대 앞`, id: 8 },
  { name: `동성로`, id: 9 },
  { name: `영대역`, id: 10 },
  { name: `경대 앞`, id: 11 },
  { name: `부산대 앞`, id: 12 },
  { name: `서면`, id: 13 },
  { name: `해운대`, id: 14 },
];

// 상관없음 선택지의 ID (알고리즘에 활용)
export const AREA_IGNORE_ID = 5;

export const CouponTypes = [
  {
    name: `미팅학개론 50% 할인 쿠폰`,
    discountRate: 50,
    condition: `이용권 1장에만 사용 가능`,
    applicableProducts: [1],
    id: 1,
  },
  {
    name: `미팅학개론 1회 무료 이용 쿠폰`,
    discountRate: 100,
    condition: `이용권 1장에만 사용 가능`,
    applicableProducts: [1],
    id: 2,
  },
];
