import { CurrentWeather as CurrentWeatherType } from '@/types/weather/CurrentWeather';

interface CurrentWeatherProps {
  region: string;
  weather: CurrentWeatherType;
}

export default function CurrentWeather({
  region,
  weather,
}: CurrentWeatherProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xl">{region}</p>
      <p className="text-3xl">{weather.기온}℃</p>
      <p className="text-lg">{weather.날씨상태}</p>
    </div>
  );
}
