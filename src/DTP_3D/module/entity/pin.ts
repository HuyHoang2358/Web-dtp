import { getViewer } from '@/DTP_3D/lib/common';
import * as Cesium from 'cesium';

export function addPinByIcon(pos: any, name: string, status = true) {
  const viewer = getViewer();
  const pinBuilder = new Cesium.PinBuilder();
  const url = Cesium.buildModuleUrl('Assets/Textures/maki/police.png');
  return viewer.entities.add({
    name: name,
    description: 'police',
    position: Cesium.Cartesian3.fromDegrees(pos.lng, pos.lat),
    billboard: {
      image: status
        ? pinBuilder.fromUrl(url, Cesium.Color.GREEN, 48)
        : pinBuilder.fromUrl(url, Cesium.Color.RED, 48),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
}
export function createPinPosition(pos: any, name: string, iconId: string, colorId: number) {
  const viewer = getViewer();
  const colors = [Cesium.Color.GREEN, Cesium.Color.RED, Cesium.Color.YELLOW];
  const pinBuilder = new Cesium.PinBuilder();
  const url = Cesium.buildModuleUrl('Assets/Textures/maki/' + iconId);
  return viewer.entities.add({
    name: name,
    description: 'important-area',
    position: Cesium.Cartesian3.fromDegrees(pos.lng, pos.lat),
    billboard: {
      image: pinBuilder.fromUrl(url, colors[colorId], 48),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  });
}

export function updatePinNewPosition(pinEntity: any, newPos: any) {
  pinEntity.position = Cesium.Cartesian3.fromDegrees(newPos.lng, newPos.lat);
}
