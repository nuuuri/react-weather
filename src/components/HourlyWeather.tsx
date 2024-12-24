import dayjs from 'dayjs';

import { ShortTermForecast } from '@/types/weather/ShortTermForecast';

interface HourlyWeatherProps {
  weather: ShortTermForecast;
}

export default function HourlyWeather({ weather }: HourlyWeatherProps) {
  return (
    <div>
      <div>{dayjs(weather['기준 날짜']).format('MM/DD')}</div>
      <div>{weather['기준 시간'].replace(/00$/, ':00')}</div>
      <div>{weather['1시간 기온']}℃</div>
      <div>{weather.날씨상태}</div>
    </div>
  );
}
