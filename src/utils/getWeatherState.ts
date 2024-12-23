import { CurrentWeather } from '@/types/weather/CurrentWeather';

export const getWeatherState = (weather: CurrentWeather) => {
  const weatherStates = [
    '',
    '비',
    '비/눈',
    '눈',
    '소나기',
    '빗방울',
    '빗방울 눈날림',
    '눈날림',
  ];

  if (weather.강수형태 === '0') {
    if (+weather.하늘상태 <= 5) return '맑음';

    if (+weather.하늘상태 <= 8) return '구름 많음';

    return '흐림';
  }

  return weatherStates[+weather.강수형태];
};
