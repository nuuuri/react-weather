const BaseCategory = {
  UUU: '동서바람성분',
  VVV: '남북바람성분',
  REH: '습도',
  PTY: '강수형태',
  VEC: '풍향',
  WSD: '풍속',
  SKY: '하늘상태',
} as const;

/**
 * 초단기예보 카테고리 (Ultra ShortTerm Forcast Category)
 */
export const UltraSrtFcstCategory = {
  ...BaseCategory,
  T1H: '기온',
  RN1: '1시간 강수량',
  LGT: '낙뢰',
} as const;

/**
 * 단기예보 카테고리 (ShortTerm Forcast Category)
 */
export const SrtFcstCategory = {
  POP: '강수확률',
  PCP: '1시간 강수량',
  SNO: '1시간 신적설',
  TMP: '1시간 기온',
  TMN: '일 최저기온',
  TMX: '일 최고기온',
  WAV: '파고',
} as const;

export type UltraSrtFcstCategoryKey = keyof typeof UltraSrtFcstCategory;

export type UltraSrtFcstCategoryType =
  (typeof UltraSrtFcstCategory)[keyof typeof UltraSrtFcstCategory];

export type SrtFcstCategoryType =
  (typeof SrtFcstCategory)[keyof typeof SrtFcstCategory];

export interface ForecastData {
  baseDate: string;
  baseTime: string;
  category: UltraSrtFcstCategoryType | SrtFcstCategoryType;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface Weather {
  fcstDate: string;
  fcstTime: string;
  temp: string;
  precipitationForm: string; // 강수 형태
  precipitation: string; // 강수량
  sky: string;

  highestTemp?: string;
  lowestTemp?: string;

  condition: string;
}

export const WeatherAttrs: { [key: string]: string } = {
  T1H: 'temp',
  TMP: 'temp',
  PTY: 'precipitationForm',
  RN1: 'precipitation',
  PCP: 'precipitation',
  SKY: 'sky',
} as const;
