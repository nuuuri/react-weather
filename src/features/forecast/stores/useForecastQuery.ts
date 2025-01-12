import { useQuery } from '@tanstack/react-query';

import ForecastService from '@/features/forecast/stores/ForecastService';
import {
  getShortTermForecastBaseDateTime,
  getUltraShortTermForecastBaseDateTime,
} from '@/features/forecast/utils/getForecastBaseDateTime';

export const useFetchUltraShortTermForecast = (params: {
  x: number;
  y: number;
}) => {
  const { x, y } = params;
  const { baseDate, baseTime } = getUltraShortTermForecastBaseDateTime();

  return useQuery({
    queryKey: ['forecast', { type: 'ultra' }, params],
    queryFn: () =>
      ForecastService.getUltraShortTermForecast({ baseDate, baseTime, x, y }),
    enabled: x !== 0 && y !== 0,
  });
};

export const useFetchShortTermForecast = (params: { x: number; y: number }) => {
  const { x, y } = params;
  const { baseDate, baseTime } = getShortTermForecastBaseDateTime();

  return useQuery({
    queryKey: ['forecast', { type: 'short' }, params],
    queryFn: () =>
      ForecastService.getShortTermForecast({ baseDate, baseTime, x, y }),
    enabled: x !== 0 && y !== 0,
  });
};
