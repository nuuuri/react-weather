import axios from 'axios';

class LocalService {
  private BASE_URL: string = 'https://dapi.kakao.com/v2/local/geo';

  public getRegionInfo(data: { lon: number; lat: number }) {
    return axios.get(`${this.BASE_URL}/coord2regioncode.json`, {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
      params: { x: data.lon, y: data.lat },
    });
  }
}

export default new LocalService();
