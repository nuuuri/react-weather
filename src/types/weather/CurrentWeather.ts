// 초단기실황 데이터
export const CurrentWeatherCategory = {
  T1H: '기온',
  RN1: '1시간 강수량',
  UUU: '동서바람성분',
  VVV: '남북바람성분',
  REH: '습도',
  PTY: '강수형태',
  VEC: '풍향',
  WSD: '풍속',
} as const;

export type CurrentWeatherCategoryType =
  (typeof CurrentWeatherCategory)[keyof typeof CurrentWeatherCategory];

export interface CurrentWeatherData {
  baseDate: string;
  baseTiem: string;
  category: CurrentWeatherCategoryType;
  nx: number;
  ny: number;
  obsrValue: string;
}

export type CurrentWeather = {
  [key in CurrentWeatherCategoryType]: string;
};
