import * as Cesium from 'cesium';
import { setDefaultHandle } from '@/DTP_3D/module/handle';
import { get_position, getViewer } from '@/DTP_3D/lib/common';
import store from '@/store';
import posController from '@/services/controller/posController';

export async function posHandle() {
  await setDefaultHandle();
  const viewer = getViewer();
  const pos_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  pos_handle.setInputAction(function (movement: any) {
    const mouse_position = get_position(movement.endPosition);
    if (mouse_position !== null) {
      const point2 = {
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
      };
      posController.updatePos(point2);
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  await store.dispatch('VIEWER/pushHandle', pos_handle);

  pos_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
