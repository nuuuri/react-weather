import { useEffect } from 'react';

import { useCurrentWeather, useWeatherActions } from './stores/useWeatherStore';

export default function App() {
  const currentWeather = useCurrentWeather();
  const { fetchCurrentWeather } = useWeatherActions();

  useEffect(() => {
    fetchCurrentWeather().catch((err) => console.error(err));
  }, [fetchCurrentWeather]);

  return (
    <div>
      <div>현재 기온 : {currentWeather.기온}도</div>
      <div>1시간 강수량 : {currentWeather['1시간 강수량']}</div>
    </div>
  );
}
