import { create } from 'zustand';

import LocalService from '@/services/LocalService';
import WeatherService from '@/services/WeatherService';

import { Region } from '@/types/Region';
import { ForecastData, WeatherAttrs, Weather } from '@/types/Weather';

import { convertLonLatToXY } from '@/utils/convertLonLatToXY';
import { getWeatherState } from '@/utils/getWeatherState';

interface RegionStoreType {
  currentRegion: Region | undefined;
  bookmarkItems: Region[];

  actions: {
    setCurrentRegion: (lon: number, lat: number) => Promise<void>;
    fetchCurrentWeather: (x: number, y: number) => Promise<Weather>;
    fetchForecast: (x: number, y: number) => Promise<Weather[]>;
    addBookmark: (region: Region) => void;
    removeBookmark: (name: string) => void;
  };
}

const useRegionStore = create<RegionStoreType>((set, get) => ({
  currentRegion: undefined,
  bookmarkItems: [],
  actions: {
    setCurrentRegion: async (lon: number, lat: number) => {
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

      const currentWeather = await actions.fetchCurrentWeather(x, y);
      const forecast = await actions.fetchForecast(x, y);

      console.log(forecast);

      set({
        currentRegion: {
          name: currentRegionDoc.address_name,
          lon,
          lat,
          x,
          y,
          currentWeather,
          forecast,
        },
      });
    },

    fetchCurrentWeather: async (x: number, y: number) => {
      const items = (await WeatherService.getUltraShortTermForecast({
        x,
        y,
      }).then((res) => res.data.response.body.items.item)) as ForecastData[];

      const currentWeatherData = items
        .sort((a, b) => {
          if (a.fcstDate === b.fcstDate)
            return a.fcstTime < b.fcstTime ? -1 : 1;

          return a.fcstDate < b.fcstDate ? -1 : 1;
        })
        .slice(0, 10);

      const currentWeather = currentWeatherData.reduce((acc, cur) => {
        const attr = WeatherAttrs[cur.category] as keyof Weather;

        if (attr) acc[attr] = cur.fcstValue;
        return acc;
      }, {} as Weather);

      currentWeather.fcstDate = items[0].fcstDate;
      currentWeather.fcstTime = items[0].fcstTime;
      currentWeather.condition = getWeatherState(currentWeather);

      return currentWeather;
    },

    fetchForecast: async (x: number, y: number) => {
      const items = (await WeatherService.getShortTermForecast({ x, y }).then(
        (res) => res.data.response.body.items.item
      )) as ForecastData[];

      const forecast: Weather[] = [];

      for (let i = 0; i < items.length; i += 12) {
        const datas = items.slice(i, i + 12);

        const weather = datas.reduce((acc, cur) => {
          const attr = WeatherAttrs[cur.category] as keyof Weather;

          if (attr) acc[attr] = cur.fcstValue;
          return acc;
        }, {} as Weather);

        weather.fcstDate = datas[0].fcstDate;
        weather.fcstTime = datas[0].fcstTime;
        weather.condition = getWeatherState(weather);

        forecast.push(weather);
      }

      return forecast;
    },

    addBookmark: () => {},
    removeBookmark: () => {},
  },
}));

export const useCurrentRegion = () =>
  useRegionStore((state) => state.currentRegion);

export const useRegionActions = () => useRegionStore((state) => state.actions);
