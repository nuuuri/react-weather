import { Region } from '@/types/Region';

interface CurrentWeatherProps {
  data: Region;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const { name, currentWeather } = data;

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xl">{name}</p>
      <p className="text-3xl">{currentWeather.temp}℃</p>
      <p className="text-lg">{currentWeather.condition}</p>
    </div>
  );
}
