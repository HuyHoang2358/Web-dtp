export type BaseMapLayer = {
  id: string;
  name: string;
  preview_image?: string;
  options: {
    url?: string;
    subdomains?: string[];
  };
};
export type PositionLatLng = {
  latitude: number;
  longitude: number;
  height: number;
  heading: number; // radian
  pitch: number; // radian
  roll: number; // radian
};
