import { useEffect } from 'react';

import { useCurrentWeather, useWeatherActions } from './stores/useWeatherStore';

export default function App() {
  const currentWeather = useCurrentWeather();
  const { setCurrentCoordinate, fetchCurrentWeather } = useWeatherActions();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setCurrentCoordinate(longitude, latitude);
      fetchCurrentWeather().catch(() => {});
    });
  }, [setCurrentCoordinate, fetchCurrentWeather]);

  return (
    <div>
      <div>현재 기온 : {currentWeather.기온}도</div>
      <div>1시간 강수량 : {currentWeather['1시간 강수량']}</div>
    </div>
  );
}
