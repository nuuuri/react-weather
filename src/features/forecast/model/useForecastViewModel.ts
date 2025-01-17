import { convertCurrentWeatherViewModel } from '../utils/convertCurrentWeatherViewModel';
import { convertForecastViewModel } from '../utils/convertForecastViewModel';

import {
  useFetchShortTermForecast,
  useFetchUltraShortTermForecast,
} from './useForecastQuery';

import { ForecastData, Weather } from '@/features/forecast/model/types';
import { Region } from '@/features/region/model/types';

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
