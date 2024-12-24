import { useEffect, useState } from 'react';

import CurrentWeather from '@/components/CurrentWeather';
import HourlyWeather from '@/components/HourlyWeather';

import {
  useCurrentRegion,
  useRegionActions,
  useSearchedRegion,
} from '@/stores/useRegionStore';

export default function MainPage() {
  const [keyword, setKeyword] = useState('');

  const currentRegion = useCurrentRegion();
  const searchedRegion = useSearchedRegion();
  const { setRegion, fetchRegionPosition, removeSearchedRegion } =
    useRegionActions();

  const search = () => {
    fetchRegionPosition(keyword)
      .then((res) => {
        console.log(res);
        if (res) {
          setRegion(res.lon, res.lat, 'searched').catch(() => {});
        }
      })
      .catch(() => {});
  };

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
        <div className="flex gap-1 pb-5">
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button
            className=" flex-shrink-0 px-1 py-0.5 rounded-sm text-white bg-slate-700 text-sm "
            onClick={search}>
            검색
          </button>
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
