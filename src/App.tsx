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
      <div>{currentWeather.기온}℃</div>
      <div>{currentWeather.날씨상태}</div>
    </div>
  );
}
