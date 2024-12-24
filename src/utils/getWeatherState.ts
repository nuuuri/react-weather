import { Weather } from '@/types/Weather';

export const getWeatherState = (weather: Weather) => {
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

  if (weather.precipitation === '0' || weather.precipitation === '강수없음') {
    if (+weather.sky <= 5) return '맑음';

    if (+weather.sky <= 8) return '구름 많음';

    return '흐림';
  }

  return weatherStates[+weather.precipitationForm];
};
