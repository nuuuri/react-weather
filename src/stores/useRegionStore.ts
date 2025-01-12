import { create } from 'zustand';

import LocalService from '@/services/LocalService';

import { Region } from '@/types/Region';
import { ForecastData, WeatherAttrs, Weather } from '@/types/Weather';

import ForecastService from '@/features/forecast/stores/ForecastService';
import { convertLonLatToXY } from '@/features/forecast/utils/convertLonLatToXY';
import { convertWeatherViewModel } from '@/features/forecast/utils/convertWeatherViewModel';
import {
  getShortTermForecastBaseDateTime,
  getUltraShortTermForecastBaseDateTime,
} from '@/features/forecast/utils/getForecastBaseDateTime';
import { getWeatherCondition } from '@/features/forecast/utils/getWeatherCondition';

interface RegionStoreType {
  currentRegion: Region | undefined;
  searchedRegion: Region | undefined;
  actions: {
    setRegion: (
      lon: number,
      lat: number,
      type?: 'current' | 'searched'
    ) => Promise<void>;
    fetchCurrentWeather: (x: number, y: number) => Promise<Weather>;
    fetchForecast: (
      x: number,
      y: number
    ) => Promise<{
      forecast: Weather[];
      highestTemp: number;
      lowestTemp: number;
    }>;
    removeSearchedRegion: () => void;
  };
}

const useRegionStore = create<RegionStoreType>((set, get) => ({
  currentRegion: undefined,
  searchedRegion: undefined,
  actions: {
    setRegion: async (lon: number, lat: number, type = 'current') => {
      const { actions } = get();
      const { x, y } = convertLonLatToXY(lon, lat);

      const currentRegionDoc = await LocalService.getRegionInfo({
        lon,
        lat,
      }).then((res) =>
        res.data.documents.find(
          (document: { region_type: 'H' | 'B' }) => document.region_type === 'B'
        )
      );

      const { forecast, highestTemp, lowestTemp } = await actions.fetchForecast(
        x,
        y
      );
      const currentWeather = await actions.fetchCurrentWeather(x, y);

      currentWeather.highestTemp = highestTemp + '';
      currentWeather.lowestTemp = lowestTemp + '';

      const region = {
        name: currentRegionDoc.address_name,
        lon,
        lat,
        x,
        y,
        currentWeather,
        forecast,
      };

      if (type === 'current') {
        set({ currentRegion: region });
      } else {
        set({ searchedRegion: region });
      }
    },

    fetchCurrentWeather: async (x: number, y: number) => {
      const { baseDate, baseTime } = getUltraShortTermForecastBaseDateTime();

      const items = (await ForecastService.getUltraShortTermForecast({
        baseDate,
        baseTime,
        x,
        y,
      }).then((res) => res.data.response.body.items.item)) as ForecastData[];

      const currentWeather = convertWeatherViewModel(items);

      return currentWeather;
    },

    fetchForecast: async (x: number, y: number) => {
      const { baseDate, baseTime } = getShortTermForecastBaseDateTime();

      const items = (await ForecastService.getShortTermForecast({
        baseDate,
        baseTime,
        x,
        y,
      }).then((res) => res.data.response.body.items.item)) as ForecastData[];

      const forecast: Weather[] = [];

      let lowestTemp = 100;
      let highestTemp = -100;

      for (let i = 0; i < items.length; i += 12) {
        const datas = items.slice(i, i + 12);

        const weather = datas.reduce((acc, cur) => {
          const attr = WeatherAttrs[cur.category] as keyof Weather;

          if (attr) acc[attr] = cur.fcstValue;

          if (attr === 'temp') {
            if (+cur.fcstValue < lowestTemp) lowestTemp = +cur.fcstValue;
            if (+cur.fcstValue > highestTemp) highestTemp = +cur.fcstValue;
          }
          return acc;
        }, {} as Weather);

        weather.fcstDate = datas[0].fcstDate;
        weather.fcstTime = datas[0].fcstTime;
        weather.condition = getWeatherCondition(weather);

        forecast.push(weather);
      }

      return { forecast, highestTemp, lowestTemp };
    },

    removeSearchedRegion: () => {
      set({ searchedRegion: undefined });
    },
  },
}));

export const useCurrentRegion = () =>
  useRegionStore((state) => state.currentRegion);

export const useSearchedRegion = () =>
  useRegionStore((state) => state.searchedRegion);

export const useRegionActions = () => useRegionStore((state) => state.actions);
