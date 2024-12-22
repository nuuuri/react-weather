import { useEffect } from 'react';

import WeatherService from './services/WeatherService';

export default function App() {
  useEffect(() => {
    WeatherService.getShortTermForecast()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return <div></div>;
}
