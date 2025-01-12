export interface Position {
  longitude: number;
  latitude: number;
}

export interface Region extends Position {
  name: string;
  x: number;
  y: number;
}
