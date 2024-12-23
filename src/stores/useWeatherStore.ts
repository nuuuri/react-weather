import { create } from 'zustand';

import WeatherService from '@/services/WeatherService';

import { getCoordinates } from '@/utils/getCoordinates';

import {
  CurrentWeather,
  CurrentWeatherCategory,
  CurrentWeatherData,
} from '@/types/weather/CurrentWeather';
import { ShortTermForecast } from '@/types/weather/ShortTermForecast';

interface Coordinate {
  x: number;
  y: number;
}

interface WeatherStoreType {
  currentCoordinate: Coordinate;
  currentWeather: CurrentWeather;
  shortTermForecast: ShortTermForecast[];
  actions: {
    setCurrentCoordinate: (lon: number, lat: number) => void;
    fetchCurrentWeather: () => Promise<void>;
  };
}

const useWeatherStore = create<WeatherStoreType>((set, get) => ({
  currentCoordinate: { x: -1, y: -1 },
  currentWeather: {} as CurrentWeather,
  shortTermForecast: [],
  actions: {
    setCurrentCoordinate: (lon: number, lat: number) => {
      const { x, y } = getCoordinates(lon, lat);

      set({ currentCoordinate: { x, y } });
    },
    fetchCurrentWeather: async () => {
      const { currentCoordinate } = get();

      if (currentCoordinate.x === -1 && currentCoordinate.y === -1) return;

      const items = await WeatherService.getCurrentWeather(
        currentCoordinate
      ).then((res) => res.data.response.body.items.item);

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
