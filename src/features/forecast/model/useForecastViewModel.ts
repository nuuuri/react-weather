import {
  useFetchShortTermForecast,
  useFetchUltraShortTermForecast,
} from '../stores/useForecastQuery';
import { convertCurrentWeatherViewModel } from '../utils/convertCurrentWeatherViewModel';
import { convertForecastViewModel } from '../utils/convertForecastViewModel';

import { ForecastData } from '@/features/forecast/model/types';
import { Region } from '@/features/region/model/types';

export const useForecastViewModel = (region: Region) => {
  const { x, y } = region;

  const { data: ultraShortTermForecastData } = useFetchUltraShortTermForecast({
    x,
    y,
  });
  const { data: shortTermForecastData } = useFetchShortTermForecast({ x, y });

  if (!ultraShortTermForecastData || !shortTermForecastData)
    return { currentWeather: null, forecast: [] };

  const ultraShortTermForecastItems = ultraShortTermForecastData.data.response
    .body.items.item as ForecastData[];
  const shortTermForecastItems =
    shortTermForecastData.data.response.body.items.item;

  const currentWeather = convertCurrentWeatherViewModel(
    ultraShortTermForecastItems
  );
  const { forecast, lowestTemp, highestTemp } = convertForecastViewModel(
    shortTermForecastItems
  );

  currentWeather.highestTemp = `${highestTemp}`;
  currentWeather.lowestTemp = `${lowestTemp}`;

  return { currentWeather, forecast };
};
