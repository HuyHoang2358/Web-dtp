import { getCesiumColor, getViewer } from '@/DTP_3D/lib/common';
import * as Cesium from 'cesium';
export const addCylinder = (name:string, position: any, radius:number) => {
  const viewer = getViewer();
  return viewer.entities.add({
    name: name,
    position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.height),
    cylinder: {
      length: position.height * 2,
      topRadius: radius,
      bottomRadius: radius,
      material: Cesium.Color.BLUE.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.BLUE,
    }
  });
}

export const addCircle = (name:string, position: any, radius:number, color:string) => {
  const viewer = getViewer();
  return viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.height),
    name: name,
    ellipse: {
      semiMinorAxis: radius,
      semiMajorAxis: radius,
      height: position.height,
      material: getCesiumColor(color).withAlpha(0.5),
      outline: false,
    },
  });
}

export const changeColorCircle = (circleEntity:any, color:string) => {
  circleEntity.ellipse.material = getCesiumColor(color).withAlpha(0.5);
}