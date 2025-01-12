import { ForecastData, Weather, WeatherAttrs } from '@/types/Weather';

import { getWeatherCondition } from './getWeatherCondition';

export const convertForecastViewModel = (data: ForecastData[]) => {
  const forecast: Weather[] = [];

  let lowestTemp = 100;
  let highestTemp = -100;

  for (let i = 0; i < data.length; i += 12) {
    const forecastData = data.slice(i, i + 12);

    const weather = forecastData.reduce((acc, cur) => {
      const attr = WeatherAttrs[cur.category] as keyof Weather;

      if (attr) acc[attr] = cur.fcstValue;

      if (attr === 'temp') {
        if (+cur.fcstValue < lowestTemp) lowestTemp = +cur.fcstValue;
        if (+cur.fcstValue > highestTemp) highestTemp = +cur.fcstValue;
      }
      return acc;
    }, {} as Weather);

    weather.fcstDate = forecastData[0].fcstDate;
    weather.fcstTime = forecastData[0].fcstTime;
    weather.condition = getWeatherCondition(weather);

    forecast.push(weather);
  }

  return { forecast, lowestTemp, highestTemp };
};
