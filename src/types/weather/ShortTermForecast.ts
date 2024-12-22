// 단기예보 데이터
export const ShortTermForecastCategory = {
  POP: '강수확률',
  PTY: '강수형태',
  PCP: '1시간 강수량',
  REH: '습도',
  SNO: '1시간 신적설',
  SKY: '하늘상태',
  TMP: '1시간 기온',
  TMN: '일 최저기온',
  TMX: '일 최고기온',
  UUU: '풍속(동서성분)',
  VVV: '풍속(남북성분)',
  WAV: '파고',
  VEC: '풍향',
  WSD: '풍속',
} as const;

export type ShortTermForecastCategoryType =
  (typeof ShortTermForecastCategory)[keyof typeof ShortTermForecastCategory];

export interface ShortTermForecastData {
  baseDate: string;
  baseTiem: string;
  category: ShortTermForecastCategoryType;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export type ShortTermForecast = {
  [key in ShortTermForecastCategoryType]: string;
};
