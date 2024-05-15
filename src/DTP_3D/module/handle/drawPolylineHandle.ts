import * as Cesium from 'cesium';
import { setDefaultHandle } from '@/DTP_3D/module/handle';
import { get_position, getViewer } from '@/DTP_3D/lib/common';
import store from '@/store';
import { addPolylineEntity, updatePolylineEntity } from '@/DTP_3D/module/route';
import { useEditPolyline } from '@/stores/editPolyline';

export async function drawPolylineHandle() {
  await setDefaultHandle();

  const viewer = getViewer();
  const draw_polyline_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  draw_polyline_handle.setInputAction(function (movement: any) {
    const mouse_position = get_position(movement.position);
    if (mouse_position !== null) {
    /*  console.log({
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
        height: 0,
      });*/
      const editPolyline = useEditPolyline();
      editPolyline.points.push({  lat: mouse_position.latitude, lng: mouse_position.longitude})
      if (editPolyline.points.length === 1) {
        editPolyline.points.push({  lat: mouse_position.latitude, lng: mouse_position.longitude})
        editPolyline.polylineEntity = addPolylineEntity(editPolyline.points ,'blue')
      } else
      updatePolylineEntity(editPolyline.polylineEntity, editPolyline.points)
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  await store.dispatch('VIEWER/pushHandle', draw_polyline_handle);

  draw_polyline_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
