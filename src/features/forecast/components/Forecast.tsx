import { useForecastViewModel } from '../model/useForecastViewModel';

import CurrentWeather from './CurrentWeather';
import HourlyWeatherList from './HourlyWeatherList';

import { Region } from '@/features/region';

interface ForecastProps {
  region: Region;
}

export default function Forecast({ region }: ForecastProps) {
  const { currentWeather, forecast, isLoading } = useForecastViewModel(region);

  if (isLoading || !currentWeather) return <div>loading...</div>;

  return (
    <div className="w-full">
      <CurrentWeather region={region} weather={currentWeather} />
      <HourlyWeatherList forecast={forecast} />
    </div>
  );
}
