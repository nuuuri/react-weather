import axios from 'axios';
import dayjs from 'dayjs';

class WeatherService {
  private BASE_URL: string =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0';

  // 기상청 초단기예보조회 서비스
  public getCurrentWeather(data: { x: number; y: number }) {
    const date = new Date();

    // 기상청 API 제공 시간에 따라 기준 시간 변경
    if (date.getMinutes() < 45) date.setHours(date.getHours() - 1);

    const baseDate = dayjs(date).format('YYYYMMDD');
    const baseTime = dayjs(date).format('HH30');

    return axios.get(`${this.BASE_URL}/getUltraSrtFcst`, {
      params: {
        serviceKey: import.meta.env.VITE_WEATHER_SERVICE_KEY,
        numOfRows: 60,
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx: data.x,
        ny: data.y,
      },
    });
  }

  // 기상청 단기예보조회 서비스
  public getShortTermForecast(data: { x: number; y: number }) {
    const date = new Date();
    const times = [2, 5, 8, 11, 14, 17, 20, 23];
    const index = Math.floor((date.getHours() + 1) / 3) - 1;

    if (index === -1) {
      date.setDate(date.getDate() - 1);
      date.setHours(23);
    } else date.setHours(times[index]);

    // 기상청 API 제공 시간에 따른 기준 시간 변경
    if (+times[index] === date.getHours() && date.getMinutes() < 10) {
      date.setHours(date.getHours() - 3);
    }

    const baseDate = dayjs(date).format('YYYYMMDD');
    const baseTime = dayjs(date).format('HH00');

    return axios.get(`${this.BASE_URL}/getVilageFcst`, {
      params: {
        serviceKey: import.meta.env.VITE_WEATHER_SERVICE_KEY,
        numOfRows: 12 * 24, // 관측 시간 이후 24시간 동안의 데이터
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx: data.x,
        ny: data.y,
      },
    });
  }
}

export default new WeatherService();
