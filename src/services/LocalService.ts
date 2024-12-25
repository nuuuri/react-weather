import axios from 'axios';

const headers = {
  Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
};

class LocalService {
  private BASE_URL: string = 'https://dapi.kakao.com/v2/local';

  public getRegionInfo(data: { lon: number; lat: number }) {
    return axios.get(`${this.BASE_URL}/geo/coord2regioncode.json`, {
      params: { x: data.lon, y: data.lat },
      headers,
    });
  }

  public getRegionByKeyword(data: { query: string }) {
    return axios.get(`${this.BASE_URL}/search/address.json`, {
      params: { query: data.query },
      headers,
    });
  }
}

export default new LocalService();
