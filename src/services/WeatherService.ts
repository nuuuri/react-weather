import axios from 'axios';

class WeatherService {
  private BASE_URL: string =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0';

  // 기상청 초단기실황조회 서비스
  public getCurrentWeather() {
    return axios.get(`${this.BASE_URL}/getUltraSrtNcst`, {
      params: {
        serviceKey: import.meta.env.VITE_WEATHER_SERVICE_KEY,
        numOfRows: 10,
        pageNo: 1,
        dataType: 'JSON',
        base_date: '20241223',
        base_time: '0600',
        nx: 55,
        ny: 127,
      },
    });
  }

  // 기상청 단기예보조회 서비스
  public getShortTermForecast() {
    return axios.get(`${this.BASE_URL}/getVilageFcst`, {
      params: {
        serviceKey: import.meta.env.VITE_WEATHER_SERVICE_KEY,
        numOfRows: 12 * 24, // 관측 시간 이후 24시간 동안의 데이터
        pageNo: 1,
        dataType: 'JSON',
        base_date: '20241223',
        base_time: '0500',
        nx: 55,
        ny: 127,
      },
    });
  }
}

export default new WeatherService();
