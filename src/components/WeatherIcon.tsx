import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiNightAltCloudy,
  WiNightClear,
  WiRain,
  WiRainMix,
  WiRainWind,
  WiShowers,
  WiSleet,
  WiSnow,
  WiSnowWind,
} from 'react-icons/wi';

interface WeatherIconProps {
  condition: string;
  time: string;
}

export default function WeatherIcon({ condition, time }: WeatherIconProps) {
  const hour = +time.replace(/00$/, '');
  const isNight = hour < 6 || hour >= 18;

  return (
    <>
      {
        {
          맑음: isNight ? <WiNightClear /> : <WiDaySunny />,
          '구름 많음': isNight ? <WiNightAltCloudy /> : <WiDayCloudy />,
          흐림: <WiCloudy />,
          비: <WiRain />,
          '비/눈': <WiRainMix />,
          눈: <WiSnow />,
          소나기: <WiShowers />,
          빗방울: <WiSleet />,
          '빗방울 눈날림': <WiRainWind />,
          눈날림: <WiSnowWind />,
        }[condition]
      }
    </>
  );
}
