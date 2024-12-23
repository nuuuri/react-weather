import { useEffect } from 'react';

import dayjs from 'dayjs';

import {
  useCurrentRegion,
  useCurrentWeather,
  useShortTermForecast,
  useWeatherActions,
} from './stores/useWeatherStore';

export default function App() {
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
      <div>{currentRegion}</div>
      <div>{currentWeather.기온}℃</div>
      <div>{currentWeather.날씨상태}</div>
      <div>오늘의 날씨</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {shortTermForecast.map((forecast, idx) => (
          <div key={idx}>
            <div>{dayjs(forecast['기준 날짜']).format('MM/DD')}</div>
            <div>{forecast['기준 시간'].replace(/00$/, ':00')}</div>
            <div>{forecast['1시간 기온']}℃</div>
            <div>{forecast.날씨상태}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
