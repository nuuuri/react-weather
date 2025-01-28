import { ForecastData, Weather, WeatherAttrs } from '../model/types';

import { getWeatherCondition } from './getWeatherCondition';

export const convertCurrentWeatherViewModel = (data: ForecastData[]) => {
  const weatherData = data
    .sort((a, b) => {
      if (a.fcstDate === b.fcstDate) return a.fcstTime < b.fcstTime ? -1 : 1;

      return a.fcstDate < b.fcstDate ? -1 : 1;
    })
    .slice(0, 10);

  const weather = weatherData.reduce((acc, cur) => {
    const attr = WeatherAttrs[cur.category] as keyof Weather;

    if (attr) acc[attr] = cur.fcstValue;
    return acc;
  }, {} as Weather);

  weather.fcstDate = data[0].fcstDate;
  weather.fcstTime = data[0].fcstTime;
  weather.condition = getWeatherCondition(weather);

  return weather;
};
