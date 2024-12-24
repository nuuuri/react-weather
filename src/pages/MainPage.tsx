import { useEffect, useState } from 'react';

import CurrentWeather from '@/components/CurrentWeather';
import HourlyWeather from '@/components/HourlyWeather';

import { useCurrentRegion, useRegionActions } from '@/stores/useRegionStore';

export default function MainPage() {
  const [keyword, setKeyword] = useState('');

  const currentRegion = useCurrentRegion();
  const { setCurrentRegion } = useRegionActions();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setCurrentRegion(longitude, latitude).catch(() => {});
    });
  }, [setCurrentRegion]);

  if (!currentRegion) return <div>loading...</div>;

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-1/5 h-full bg-slate-300">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <button>검색</button>
      </div>
      <div className="flex flex-col justify-center w-4/5 gap-20 p-10">
        <CurrentWeather data={currentRegion} />
        <div className="flex w-full gap-5 p-5 overflow-x-auto">
          {currentRegion.forecast?.map((weather, idx) => (
            <HourlyWeather key={idx} data={weather} />
          ))}
        </div>
      </div>
    </div>
  );
}
