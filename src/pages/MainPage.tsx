import { useEffect } from 'react';

import CurrentWeather from '@/components/CurrentWeather';
import HourlyWeather from '@/components/HourlyWeather';

import {
  useCurrentRegion,
  useCurrentWeather,
  useShortTermForecast,
  useWeatherActions,
} from '@/stores/useWeatherStore';

export default function MainPage() {
  const currentWeather = useCurrentWeather();
  const currentRegion = useCurrentRegion();
  const shortTermForecast = useShortTermForecast();

  const {
    setCurrentCoordinate,
    setCurrentRegion,
    fetchCurrentWeather,
    fetchShortTermForecast,
  } = useWeatherActions();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setCurrentCoordinate(longitude, latitude);
      setCurrentRegion(longitude, latitude).catch(() => {});
      fetchCurrentWeather().catch(() => {});
      fetchShortTermForecast().catch(() => {});
    });
  }, [
    setCurrentCoordinate,
    setCurrentRegion,
    fetchCurrentWeather,
    fetchShortTermForecast,
  ]);

  return (
    <div>
      <CurrentWeather region={currentRegion} weather={currentWeather} />
      <div>오늘의 날씨</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {shortTermForecast.map((weather, idx) => (
          <HourlyWeather key={idx} weather={weather} />
        ))}
      </div>
    </div>
  );
}
