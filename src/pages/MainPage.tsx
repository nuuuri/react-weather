import { useEffect, useState } from 'react';

import CurrentWeather from '@/components/CurrentWeather';
import HourlyWeather from '@/components/HourlyWeather';

import { useDebounce } from '@/utils/useDebounce';

import {
  useKeyItems,
  useKeyword,
  useKeywordActions,
} from '@/stores/useKeywordStore';
import {
  useCurrentRegion,
  useRegionActions,
  useSearchedRegion,
} from '@/stores/useRegionStore';

export default function MainPage() {
  const currentRegion = useCurrentRegion();
  const searchedRegion = useSearchedRegion();
  const { setRegion, removeSearchedRegion } = useRegionActions();

  const keyword = useKeyword();
  const keyItems = useKeyItems();
  const { setKeyword, fetchKeyItems } = useKeywordActions();

  const debouncedKeyword = useDebounce(keyword, 200);

  useEffect(() => {
    fetchKeyItems(debouncedKeyword).catch(() => {});
  }, [debouncedKeyword, fetchKeyItems]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setRegion(longitude, latitude).catch(() => {});
    });
  }, [setRegion]);

  const region = searchedRegion ?? currentRegion;

  if (!region) return <div>loading...</div>;

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-1/5 h-full px-5 py-10 bg-slate-300">
        <div className="relative flex gap-1 mb-5">
          <input
            className="w-full"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          {keyItems.length > 0 && (
            <div className="absolute top-[100%] bg-white mt-1 p-1">
              {keyItems.map((item) => (
                <div
                  key={item.addressName}
                  className="text-gray-400 cursor-pointer hover:text-gray-900"
                  onClick={() => {
                    setRegion(item.lon, item.lat, 'searched').catch(() => {});
                    setKeyword('');
                  }}>
                  {item.placeName}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="p-2 border rounded-md cursor-pointer"
          onClick={removeSearchedRegion}>
          <p className="text-sm font-bold">현재 위치</p>
          {currentRegion?.name}
        </div>
      </div>
      <div className="flex flex-col justify-center w-4/5 gap-20 p-10">
        <CurrentWeather data={region} />
        <div className="flex w-full gap-5 p-5 overflow-x-auto">
          {region.forecast?.map((weather, idx) => (
            <HourlyWeather key={idx} data={weather} />
          ))}
        </div>
      </div>
    </div>
  );
}
