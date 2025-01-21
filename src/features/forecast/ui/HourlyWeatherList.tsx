import { Weather } from '../model/types';

import HourlyWeather from './HourlyWeather';

interface HourlyWeatherListProps {
  forecast: Weather[];
}

export default function HourlyWeatherList({
  forecast,
}: HourlyWeatherListProps) {
  return (
    <div className="flex max-w-full gap-5 p-5 overflow-x-auto w-fit">
      {forecast.map((weather, idx) => (
        <HourlyWeather key={idx} data={weather} />
      ))}
    </div>
  );
}
