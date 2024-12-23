// 기상청 단기예보 조회서비스 오픈 API 활용가이드 참조
const LamcParameterValue = {
  Re: 6371.00877, // 지도반경 [km]
  grid: 5.0, // 격자간격 [km]
  slat1: 30.0, // 표준위도 1 [degree]
  slat2: 60.0, // 표준위도 2 [degree]
  olon: 126.0, // 기준점 경도 [degree]
  olat: 38.0, // 기준점 위도 [degree]
  xo: 42, // 기준점 X좌표 (210 / grid)
  yo: 135, // 기준점 Y좌표 (675 / grid)
  first: 0, // 시작여부 (0 = 시작)
} as const;

const lamcproj = (lon: number, lat: number) => {
  const map = LamcParameterValue;

  const PI = Math.asin(1.0) * 2.0;
  const DEGRAD = PI / 180.0;

  const re = map.Re / map.grid;
  const slat1 = map.slat1 * DEGRAD;
  const slat2 = map.slat2 * DEGRAD;
  const olon = map.olon * DEGRAD;
  const olat = map.olat * DEGRAD;

  let sn =
    Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > PI) theta -= 2.0 * PI;
  if (theta < -PI) theta += 2.0 * PI;
  theta *= sn;

  const x = ra * Math.sin(theta) + map.xo;
  const y = ro - ra * Math.cos(theta) + map.yo;

  return { x: x, y: y };
};

export const getCoordinates = (lon: number, lat: number) => {
  const lon1 = lon;
  const lat1 = lat;
  const { x, y } = lamcproj(lon1, lat1);

  return { x: ~~(x + 1.5), y: ~~(y + 1.5) };
};
