import { useEffect } from 'react';

import {
  useCurrentRegion,
  useCurrentWeather,
  useWeatherActions,
} from './stores/useWeatherStore';

export default function App() {
  const currentWeather = useCurrentWeather();
  const currentRegion = useCurrentRegion();
  const { setCurrentCoordinate, setCurrentRegion, fetchCurrentWeather } =
    useWeatherActions();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setCurrentCoordinate(longitude, latitude);
      setCurrentRegion(longitude, latitude).catch(() => {});
      fetchCurrentWeather().catch(() => {});
    });
  }, [setCurrentCoordinate, setCurrentRegion, fetchCurrentWeather]);

  return (
    <div>
      <div>{currentRegion}</div>
      <div>현재 기온 : {currentWeather.기온}도</div>
      <div>1시간 강수량 : {currentWeather['1시간 강수량']}</div>
    </div>
  );
}
