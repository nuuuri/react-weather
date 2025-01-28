import axios from 'axios';

const headers = {
  Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
};

class SearchAPI {
  private BASE_URL: string = 'https://dapi.kakao.com/v2/local';

  public getRegionByKeyword(data: { query: string }) {
    return axios.get(`${this.BASE_URL}/search/address.json`, {
      params: { query: data.query },
      headers,
    });
  }
}

export default new SearchAPI();
