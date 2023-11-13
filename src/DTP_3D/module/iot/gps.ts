import * as Cesium from 'cesium';
import { getViewer } from '@/DTP_3D/lib/common';
export async function createGPSEntity(point: any) {
  const viewer = getViewer();
  const position = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.height);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0),
    ),
  );
  const entity = viewer.entities.add({
    name: 'car GPS',
    description: 'Car GPS',
    position: position,
    orientation: orientation,
    model: {
      uri: '/data3D/models/car.glb',
      scale: 50,
    },
  });

  viewer.flyTo(entity);
  return entity;
}
export function removeGPSEntity(entity: any) {
  const viewer = getViewer();
  viewer.entities.remove(entity);
}
export function updateGPSEntity(entity: any, new_point: any) {
  //console.log('new_point', new_point);
  //console.log('entity', entity);
  const position = Cesium.Cartesian3.fromDegrees(new_point.lng, new_point.lat, new_point.height);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0),
    ),
  );
  entity.position = position;
  entity.orientation = orientation;
}
