import { getViewer } from '@/DTP_3D/lib/common';
import * as Cesium from 'cesium';
import { CAMERA_AMOUNT_METE_ZOOM } from '@/DTP_3D/config/mainConfig';
import type { PositionLatLng } from '@/DTP_3D/type/DTP3D.type';

export function show_camera_position() {
  const viewer = getViewer();
  const camera = viewer.camera;
  const positionCartographic = camera.positionCartographic;
  return {
    latitude: Cesium.Math.toDegrees(positionCartographic.latitude),
    longitude: Cesium.Math.toDegrees(positionCartographic.longitude),
    height: positionCartographic.height,
    heading: camera.heading,
    pitch: camera.pitch,
    roll: camera.roll,
  };
}
export function zoom_in_map(amount_mete_zoom?: number) {
  const viewer = getViewer();
  if (!amount_mete_zoom) amount_mete_zoom = CAMERA_AMOUNT_METE_ZOOM;
  const camera_position = show_camera_position();
  if (camera_position.heading < amount_mete_zoom)
    amount_mete_zoom = Math.floor(camera_position.height / 2);
  viewer.camera.zoomIn(amount_mete_zoom);
}
export function zoom_out_map(amount_mete_zoom?: number) {
  const viewer = getViewer();
  if (!amount_mete_zoom) amount_mete_zoom = CAMERA_AMOUNT_METE_ZOOM;
  viewer.camera.zoomOut(amount_mete_zoom);
}

export function flyTo(pos: PositionLatLng) {
  const viewer = getViewer();
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(pos.longitude, pos.latitude, pos.height),
    orientation: { heading: pos.heading, pitch: pos.pitch, roll: pos.roll },
  });
}
