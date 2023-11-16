import { getViewer } from '@/DTP_3D/lib/common';
import * as Cesium from 'cesium';
import { ROUTE_COLOR, ROUTE_WIDTH } from '@/DTP_3D/config/mainConfig';

export function addSniperEntity(sniperConfig: any) {
  const viewer = getViewer();
  viewer.scene.globe.depthTestAgainstTerrain = true;

  return viewer.entities.add({
    name: 'Sniper Volume',
    position: Cesium.Cartesian3.fromDegrees(
      sniperConfig.point.lng,
      sniperConfig.point.lat,
      sniperConfig.point.height,
    ),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(
      Cesium.Cartesian3.fromDegrees(
        sniperConfig.point.lng,
        sniperConfig.point.lat,
        sniperConfig.point.height,
      ),
      new Cesium.HeadingPitchRoll(Cesium.Math.PI, 0, 0.0),
    ),
    ellipsoid: {
      radii: new Cesium.Cartesian3(
        sniperConfig.radii.x,
        sniperConfig.radii.y,
        sniperConfig.radii.z,
      ),
      innerRadii: new Cesium.Cartesian3(0.005, 0.005, 0.005),
      minimumClock: Cesium.Math.toRadians(sniperConfig.clockVolume.min),
      maximumClock: Cesium.Math.toRadians(sniperConfig.clockVolume.max),
      minimumCone: Cesium.Math.toRadians(sniperConfig.coneVolume.min),
      maximumCone: Cesium.Math.toRadians(sniperConfig.coneVolume.max),
      material: Cesium.Color.YELLOW.withAlpha(0.8),
    },
  });
}

function preparePositions(p1: any, p2: any): any {
  return;
}

function computeCircle(radius: number) {
  const positions = [];
  for (let i = 0; i < 360; i++) {
    const radians = Cesium.Math.toRadians(i);
    positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
  }
  return positions;
}
export function addSniperEntityX(p1: any, p2: any) {
  const viewer = getViewer();
  return viewer.entities.add({
    name: 'Route',
    polylineVolume: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        p1.lng,
        p1.lat,
        p1.height,
        p2.lng,
        p2.lat,
        p2.height,
      ]),
      shape: computeCircle(0.2),
      material: Cesium.Color.RED,
    },
  });
}
export function updateLineSniper(entity: any, point1: any, point2: any) {
  entity.polylineVolume.positions = Cesium.Cartesian3.fromDegreesArrayHeights([
    point1.lng,
    point1.lat,
    point1.height,
    point2.lng,
    point2.lat,
    point2.height,
  ]);
}
export function modifyRadiusSniper(entity: any, radius: number) {
  entity.ellipsoid.radii = new Cesium.Cartesian3(radius, radius, radius);
}
export function modifyConeDegreeSniper(entity: any, coneDegree: number) {
  entity.ellipsoid.minimumCone = Cesium.Math.toRadians(coneDegree);
}
