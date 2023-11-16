import * as Cesium from 'cesium';
import { setDefaultHandle } from '@/DTP_3D/module/handle';
import { get_position, getViewer } from '@/DTP_3D/lib/common';
import store from '@/store';
import sniperController from '@/services/controller/sniperController';

export async function sniperHandle() {
  await setDefaultHandle();
  const viewer = getViewer();
  const sniper_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  sniper_handle.setInputAction(function (movement: any) {
    const mouse_position = get_position(movement.endPosition);
    if (mouse_position !== null) {
      /*console.log({
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
        height: 0,
      });*/
      const point2 = {
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
      };
      sniperController.updateSniperX(point2);
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  await store.dispatch('VIEWER/pushHandle', sniper_handle);

  sniper_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
