import axios from 'axios';

import { Position } from '@/features/region/model/types';

const headers = {
  Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
};

class LocalService {
  private BASE_URL: string = 'https://dapi.kakao.com/v2/local';

  public getRegionInfo(data: Position) {
    const { longitude, latitude } = data;

    return axios.get(`${this.BASE_URL}/geo/coord2regioncode.json`, {
      params: { x: longitude, y: latitude },
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
