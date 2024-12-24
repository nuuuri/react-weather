import {
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
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
}

export default function WeatherIcon({ condition }: WeatherIconProps) {
  return (
    <>
      {
        {
          맑음: <WiDaySunny />,
          '구름 많음': <WiDayCloudy />,
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
