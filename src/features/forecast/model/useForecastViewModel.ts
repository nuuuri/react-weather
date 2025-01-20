import { convertCurrentWeatherViewModel } from '../utils/convertCurrentWeatherViewModel';
import { convertForecastViewModel } from '../utils/convertForecastViewModel';

import { ForecastData, Weather } from './types';
import {
  useFetchShortTermForecast,
  useFetchUltraShortTermForecast,
} from './useForecastQuery';

import { Region } from '@/features/region';

interface ForecastViewModel {
  currentWeather: Weather | undefined;
  forecast: Weather[];
  isLoading: boolean;
}

export const useForecastViewModel = (region: Region): ForecastViewModel => {
  const { x, y } = region;

  const {
    data: ultraShortTermForecastData,
    isLoading: isUltraShortTermForecastLoading,
  } = useFetchUltraShortTermForecast({
    x,
    y,
  });
  const { data: shortTermForecastData, isLoading: isShortTermForecastLoading } =
    useFetchShortTermForecast({ x, y });

  if (!ultraShortTermForecastData || !shortTermForecastData)
    return { currentWeather: undefined, forecast: [], isLoading: false };

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

  return {
    currentWeather,
    forecast,
    isLoading: isUltraShortTermForecastLoading || isShortTermForecastLoading,
  };
};
