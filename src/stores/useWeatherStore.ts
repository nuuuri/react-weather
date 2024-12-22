import { create } from 'zustand';

import WeatherService from '@/services/WeatherService';

import {
  CurrentWeather,
  CurrentWeatherCategory,
  CurrentWeatherData,
} from '@/types/weather/CurrentWeather';
import { ShortTermForecast } from '@/types/weather/ShortTermForecast';

interface WeatherStoreType {
  currentWeather: CurrentWeather;
  shortTermForecast: ShortTermForecast[];
  actions: { fetchCurrentWeather: () => Promise<void> };
}

const useWeatherStore = create<WeatherStoreType>((set, get) => ({
  currentWeather: {} as CurrentWeather,
  shortTermForecast: [],
  actions: {
    fetchCurrentWeather: async () => {
      const items = await WeatherService.getCurrentWeather().then(
        (res) => res.data.response.body.items.item
      );

      const newObj = {} as CurrentWeather;

      (items as CurrentWeatherData[]).forEach((item) => {
        const category =
          CurrentWeatherCategory[
            item.category as keyof typeof CurrentWeatherCategory
          ];

        newObj[category] = item.obsrValue;
      });

      set({ currentWeather: newObj });
    },
  },
}));

export const useCurrentWeather = () =>
  useWeatherStore((state) => state.currentWeather);

export const useWeatherActions = () =>
  useWeatherStore((state) => state.actions);
