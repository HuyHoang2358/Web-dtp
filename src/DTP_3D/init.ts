// @ts-ignore
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { initClock } from '@/DTP_3D/module/time';
import { CESIUM_TOKEN, HANOI_CENTER_POINT } from '@/DTP_3D/config/mainConfig';
import { initMap } from '@/DTP_3D/module/map';
import { flyTo } from '@/DTP_3D/module/camera';
import { getViewer } from '@/DTP_3D/lib/common';

export async function initMapView(HTML_element_id: string) {
  Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;
  await initMap(HTML_element_id);
  initClock();
  flyTo(HANOI_CENTER_POINT);
  const viewer = getViewer();
  viewer.scene.globe.enableLighting = false;
}
