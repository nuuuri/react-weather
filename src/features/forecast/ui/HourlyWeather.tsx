import WeatherIcon from './WeatherIcon';

import { Weather } from '@/features/forecast';

interface HourlyWeatherProps {
  data: Weather;
}

export default function HourlyWeather({ data }: HourlyWeatherProps) {
  return (
    <div className="flex flex-col items-center flex-shrink-0 [&_svg]:w-8 [&_svg]:h-8 [&_svg]:flex-shrink-0">
      <p>{data.fcstTime.replace(/00$/, '시')}</p>
      <WeatherIcon condition={data.condition} time={data.fcstTime} />
      <p>{data.temp}℃</p>
    </div>
  );
}
