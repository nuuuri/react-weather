import axios from 'axios';

interface ForecastRequest {
  baseDate: string;
  baseTime: string;
  x: number;
  y: number;
}

class ForecastAPI {
  private BASE_URL: string =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0';

  // 기상청 초단기예보조회 서비스
  public getUltraShortTermForecast(data: ForecastRequest) {
    const { baseDate, baseTime, x, y } = data;

    return axios.get(`${this.BASE_URL}/getUltraSrtFcst`, {
      params: {
        serviceKey: import.meta.env.VITE_WEATHER_SERVICE_KEY,
        numOfRows: 60,
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx: x,
        ny: y,
      },
    });
  }

  // 기상청 단기예보조회 서비스
  public getShortTermForecast(data: ForecastRequest) {
    const { baseDate, baseTime, x, y } = data;

    return axios.get(`${this.BASE_URL}/getVilageFcst`, {
      params: {
        serviceKey: import.meta.env.VITE_WEATHER_SERVICE_KEY,
        numOfRows: 12 * 25, // 관측 시간 이후 24시간 동안의 데이터
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx: x,
        ny: y,
      },
    });
  }
}

export default new ForecastAPI();
