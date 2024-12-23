import { create } from 'zustand';

import LocalService from '@/services/LocalService';
import WeatherService from '@/services/WeatherService';

import {
  CurrentWeather,
  CurrentWeatherCategory,
  CurrentWeatherData,
} from '@/types/weather/CurrentWeather';
import { ShortTermForecast } from '@/types/weather/ShortTermForecast';

import { convertLonLatToXY } from '@/utils/convertLonLatToXY';
import { getWeatherState } from '@/utils/getWeatherState';

interface Coordinate {
  x: number;
  y: number;
}

interface WeatherStoreType {
  currentCoordinate: Coordinate;
  currentRegion: string;
  currentWeather: CurrentWeather;
  shortTermForecast: ShortTermForecast[];

  actions: {
    setCurrentCoordinate: (lon: number, lat: number) => void;
    setCurrentRegion: (lon: number, lat: number) => Promise<void>;
    fetchCurrentWeather: () => Promise<void>;
  };
}

const useWeatherStore = create<WeatherStoreType>((set, get) => ({
  currentCoordinate: { x: -1, y: -1 },
  currentRegion: '',
  currentWeather: {} as CurrentWeather,
  shortTermForecast: [],

  actions: {
    setCurrentCoordinate: (lon: number, lat: number) => {
      const { x, y } = convertLonLatToXY(lon, lat);

      set({ currentCoordinate: { x, y } });
    },

    setCurrentRegion: async (lon: number, lat: number) => {
      const { documents } = await LocalService.getRegionInfo({ lon, lat }).then(
        (res) => res.data
      );

      const doc = documents.find(
        (document: { region_type: 'H' | 'B' }) => document.region_type === 'H'
      );

      set({ currentRegion: doc.address_name });
    },

    fetchCurrentWeather: async () => {
      const { currentCoordinate } = get();

      if (currentCoordinate.x === -1 && currentCoordinate.y === -1) return;

      const items = await WeatherService.getCurrentWeather(
        currentCoordinate
      ).then((res) => res.data.response.body.items.item);

      const newObj = {} as CurrentWeather;

      const currentData = (items as CurrentWeatherData[])
        .sort((a, b) => (a.fcstTime < b.fcstTime ? -1 : 1))
        .slice(0, 10);

      currentData.forEach((item) => {
        const category =
          CurrentWeatherCategory[
            item.category as keyof typeof CurrentWeatherCategory
          ];

        newObj[category] = item.fcstValue;
      });

      // 날씨 상태 값 업데이트 (ex. 맑음, 흐림, ...)
      newObj.날씨상태 = getWeatherState(newObj);

      console.log(newObj.날씨상태);

      set({ currentWeather: newObj });
    },
  },
}));

export const useCurrentWeather = () =>
  useWeatherStore((state) => state.currentWeather);

export const useCurrentRegion = () =>
  useWeatherStore((state) => state.currentRegion);

export const useWeatherActions = () =>
  useWeatherStore((state) => state.actions);
