import { Region } from '@/features/region';

import { Weather } from '../model/types';

import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  region: Region;
  weather: Weather;
}

export default function CurrentWeather({
  region,
  weather,
}: CurrentWeatherProps) {
  const { name } = region;
  const { temp, condition, highestTemp, lowestTemp } = weather;

  // 초단기예보의 기준 시간은 전일 23시이기 때문에, 현재 시간 기준으로 해/달 아이콘 설정
  const time = new Date().getHours();

  return (
    <div className="flex flex-col items-center gap-2 [&_svg]:w-32 [&_svg]:h-32">
      <p className="text-lg">{name}</p>
      <p className="text-5xl">{temp}℃</p>
      <WeatherIcon condition={condition} time={`${time}00`} />
      <p className="text-gray-500">{condition}</p>
      <div className="flex gap-4">
        <p>최고 : {highestTemp}℃</p>
        <p>최저 : {lowestTemp}℃</p>
      </div>
    </div>
  );
}
