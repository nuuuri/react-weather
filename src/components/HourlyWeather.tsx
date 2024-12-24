import { ShortTermForecast } from '@/types/weather/ShortTermForecast';

interface HourlyWeatherProps {
  weather: ShortTermForecast;
}

export default function HourlyWeather({ weather }: HourlyWeatherProps) {
  return (
    <div className="flex flex-col text-sm">
      <p>{weather['기준 시간'].replace(/00$/, '시')}</p>
      <p>{weather['1시간 기온']}℃</p>
      <p>{weather.날씨상태}</p>
    </div>
  );
}
