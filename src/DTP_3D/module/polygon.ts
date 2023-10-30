//@ts-ignore
import { getViewer } from '@/DTP_3D/lib/common';
import * as Cesium from 'cesium';

export function draw_polygon(polygon: any) {
  const viewer = getViewer();
  const points = new Array();
  polygon.forEach((e: any) => {
    points.push(e.lng);
    points.push(e.lat);
  });
  console.log(points);
  if (points.length >= 8) {
    viewer.entities.add({
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray(points),
        material: Cesium.Color.RED, // Màu và độ trong suốt của polygon
      },
    });
  }
}

function preparePositions(points: any): any {
  const positions = new Array();
  points.forEach((p: any) => {
    positions.push(p.lng);
    positions.push(p.lat);
  });
  return positions;
}
export function drawPolygon(points: any) {
  const viewer = getViewer();
  const positions = preparePositions(points);
  return viewer.entities.add({
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray(positions),
      material: Cesium.Color.YELLOW.withAlpha(0.3), // Màu và độ trong suốt của polygon
    },
  });
}

export function updatePolygonEntity(polygonEntity: any, points: any) {
  const positions = preparePositions(points);

  polygonEntity.polygon.positions = Cesium.Cartesian3.fromDegreesArray(positions);
}
