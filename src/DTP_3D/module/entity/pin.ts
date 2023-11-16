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
