import * as Cesium from 'cesium';

import { getViewer } from '@/DTP_3D/lib/common';
import {
  ROUTE_COLOR,
  ROUTE_POINT_COLOR,
  ROUTE_POINT_SIZE,
  ROUTE_WIDTH,
} from '@/DTP_3D/config/mainConfig';

export function drawPointEntity(dataPoint: any) {
  const viewer = getViewer();
  return viewer.entities.add({
    description: `Point Route`,
    position: Cesium.Cartesian3.fromDegrees(dataPoint.lng, dataPoint.lat, dataPoint.height),
    point: { pixelSize: ROUTE_POINT_SIZE, color: ROUTE_POINT_COLOR },
  });
}

function preparePositions(points: any): any {
  const positions = new Array();
  points.forEach((p: any) => {
    positions.push(p.lng);
    positions.push(p.lat);
  });
  return positions;
}
export function drawPolyline(points: any) {
  const viewer = getViewer();
  const positions = preparePositions(points);
  return viewer.entities.add({
    name: 'Route',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(positions),
      width: ROUTE_WIDTH,
      material: ROUTE_COLOR,
      clampToGround: true,
    },
  });
}
export function updatePolylineEntity(polylineEntity: any, points: any) {
  const positions = preparePositions(points);

  console.log('positions', positions);
  console.log('polylineEntity', polylineEntity);
  polylineEntity.polyline.positions = Cesium.Cartesian3.fromDegreesArray(positions);
}

export function addRouteEntity(points: any) {
  const viewer = getViewer();
  return viewer.entities.add({
    name: 'Route',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(points),
      width: ROUTE_WIDTH,
      material: ROUTE_COLOR,
      clampToGround: true,
    },
  });
}
