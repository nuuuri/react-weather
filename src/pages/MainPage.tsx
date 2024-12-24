import { useEffect } from 'react';

import CurrentWeather from '@/components/CurrentWeather';
import HourlyWeather from '@/components/HourlyWeather';

import { useCurrentRegion, useRegionActions } from '@/stores/useRegionStore';

export default function MainPage() {
  const currentRegion = useCurrentRegion();
  const { setCurrentRegion } = useRegionActions();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setCurrentRegion(longitude, latitude).catch(() => {});

      // test: 강남구 신사동
      // setCurrentRegion(127.0361285, 37.525431).catch(() => {});
    });
  }, [setCurrentRegion]);

  if (!currentRegion) return <div>loading...</div>;

  return (
    <div>
      <CurrentWeather data={currentRegion} />
      <div className="flex gap-5">
        {currentRegion.forecast?.map((weather, idx) => (
          <HourlyWeather key={idx} data={weather} />
        ))}
      </div>
    </div>
  );
}
