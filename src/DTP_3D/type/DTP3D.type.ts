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
export type AreaCenterCamera = {
  latitude: number;
  longitude: number;
  height: number;
  heading: number;
  pitch: number;
  roll: number;
};

export type AreaMetaData = {
  id: string;
  name: string;
  slug: string;
  description: string;
  type_key: string;
  type_data: string;
  preview_image: string;
  center_point: AreaCenterCamera;
  active?: boolean;
};
export type Point = {
  lat: number;
  lng: number;
  height: number;
};

export type EntityPosition = {
  latitude: number;
  longitude: number;
  height: number;
  heading: number;
  pitch: number;
  roll: number;
};

export type ModelEntityInfo = {
  model_url: string;
  name: string;
  scale: number;
  description: string;
} & EntityPosition;
