import dayjs from 'dayjs';

export const getUltraShortTermForecastBaseDateTime = () => {
  const date = new Date();

  // 기상청 API 제공 시간에 따라 기준 시간 변경
  if (date.getMinutes() < 45) date.setHours(date.getHours() - 1);

  const baseDate = dayjs(date).format('YYYYMMDD');
  const baseTime = dayjs(date).format('HH30');

  return { baseDate, baseTime };
};

export const getShortTermForecastBaseDateTime = () => {
  const date = new Date();

  date.setDate(date.getDate() - 1);

  const baseDate = dayjs(date).format('YYYYMMDD');
  const baseTime = dayjs(date).format('2300');

  return { baseDate, baseTime };
};
