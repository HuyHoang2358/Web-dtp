import * as Cesium from 'cesium';
import { setDefaultHandle } from '@/DTP_3D/module/handle';
import { get_position, getViewer } from '@/DTP_3D/lib/common';
import store from '@/store';
import { updatePositionModel } from '@/services/controller/libraryController';

export async function changePositionModelHandle() {
  await setDefaultHandle();
  const viewer = getViewer();
  const change_position_model_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  change_position_model_handle.setInputAction(function (movement: any) {
    const mouse_position = get_position(movement.endPosition);
    if (mouse_position !== null) {
      updatePositionModel({
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
        height: 0,
      });
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  await store.dispatch('VIEWER/pushHandle', change_position_model_handle);

  change_position_model_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
