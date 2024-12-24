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
    <div>
      <div>{region}</div>
      <div>{weather.기온}℃</div>
      <div>{weather.날씨상태}</div>
    </div>
  );
}
