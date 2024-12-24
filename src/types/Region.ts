import { Weather } from './Weather';

export interface Region {
  name: string;
  lon: number;
  lat: number;
  x: number | undefined;
  y: number | undefined;
  currentWeather: Weather;
  forecast: Weather[];
}
