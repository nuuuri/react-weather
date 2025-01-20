import { useQuery } from '@tanstack/react-query';

import ForecastAPI from '../api/ForecastAPI';
import {
  getShortTermForecastBaseDateTime,
  getUltraShortTermForecastBaseDateTime,
} from '../utils/getForecastBaseDateTime';

export const useFetchUltraShortTermForecast = (params: {
  x: number;
  y: number;
}) => {
  const { x, y } = params;
  const { baseDate, baseTime } = getUltraShortTermForecastBaseDateTime();

  return useQuery({
    queryKey: ['forecast', { type: 'ultra' }, params.x, params.y],
    queryFn: () =>
      ForecastAPI.getUltraShortTermForecast({ baseDate, baseTime, x, y }),
    enabled: x !== 0 && y !== 0,
    staleTime: 1000 * 10, // 10분 이내에는 캐시된 결과를 사용
  });
};

export const useFetchShortTermForecast = (params: { x: number; y: number }) => {
  const { x, y } = params;
  const { baseDate, baseTime } = getShortTermForecastBaseDateTime();

  return useQuery({
    queryKey: ['forecast', { type: 'short' }, params.x, params.y],
    queryFn: () =>
      ForecastAPI.getShortTermForecast({ baseDate, baseTime, x, y }),
    enabled: x !== 0 && y !== 0,
    staleTime: 1000 * 10,
  });
};
