// 초단기예보 데이터
export const CurrentWeatherCategory = {
  T1H: '기온',
  RN1: '1시간 강수량',
  SKY: '하늘상태',
  UUU: '동서바람성분',
  VVV: '남북바람성분',
  REH: '습도',
  PTY: '강수형태',
  LGT: '낙뢰',
  VEC: '풍향',
  WSD: '풍속',
} as const;

export type CurrentWeatherCategoryType =
  (typeof CurrentWeatherCategory)[keyof typeof CurrentWeatherCategory];

export interface CurrentWeatherData {
  baseDate: string;
  baseTiem: string;
  category: CurrentWeatherCategoryType;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export type CurrentWeather = {
  [key in CurrentWeatherCategoryType]: string;
};
