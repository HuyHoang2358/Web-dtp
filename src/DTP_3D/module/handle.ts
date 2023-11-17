import * as Cesium from 'cesium';
import { distanceBetweenTwoPoint, formatDistance, getViewer, innerText } from '@/DTP_3D/lib/common';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';
import { useMapStore } from '@/stores/map';
import { getInformationFromEntity, visualizeModelEntity } from '@/DTP_3D/module/entity';
import store from '@/store';
import { drawPointEntity, drawPolyline, updatePolylineEntity } from '@/DTP_3D/module/route';
import { draw_polygon, drawPolygon, updatePolygonEntity } from '@/DTP_3D/module/polygon';
import { fetchArea } from '@/services/apis/area';
import { fetchEntity } from '@/services/apis/entiy';
import { reFormat } from '@/DTP_3D/api/entity';
import libraryController from '@/services/controller/libraryController';
import { fetchPolice } from '@/services/apis/police';
import policeController from '@/services/controller/policeController';
function get_position(movement_position: any) {
  const viewer = getViewer();
  const cartesian = viewer.camera.pickEllipsoid(movement_position, viewer.scene.globe.ellipsoid);
  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitude = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(6));
    const latitude = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(6));
    return {
      latitude: latitude,
      longitude: longitude,
    };
  }
  return null;
}

export function handle_click_object() {
  const viewer = getViewer();
  const click_object_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  click_object_handle.setInputAction(async function (movement: any) {
    const pickedFeature = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedFeature)) {
      // high light selected Entity
      //console.log('pickedFeature', pickedFeature);
      //console.log('id', pickedFeature.id.name);
      //console.log('descriptuon', pickedFeature.id.description.getValue());
      if (pickedFeature.id.description.getValue() === 'police') {
        const res = await fetchPolice(pickedFeature.id.name);
        const data = res?.data || null;
        console.log('data', data);
        if (data) await policeController.showInfoPolice(data);
      } else {
        const storeMap = useMapStore();
        //const info = getInformationFromEntity(pickedFeature.id);
        const res = await fetchEntity(pickedFeature.id.name);
        const data = res.data;
        const info = {
          id: data.id,
          model_id: data.modelUrl,
          model_url: data.modelUrl,
          latitude: data.location.coordinates[1],
          longitude: data.location.coordinates[0],
          height: data.height,
          pitch: data.pitch,
          roll: data.roll,
          heading: data.heading,
          scale: data.scale,
          streetAddress: data.dia_chi.streetAddress,
          commune: data.dia_chi.commune,
          district: data.dia_chi.district,
          province: data.dia_chi.province,
          area: data.dien_tich,
          floor: data.so_tang,
          name: data.ten_toa_nha,
          function: data.phan_loai_toa_nha,
          house_height: data.chieu_cao,
          type: data.type,
          pin_height: data.pin_height,
        };
        //console.log('info', info);
        updateNameOverlay(res.data, movement.position);
        libraryController.editModelEntity(pickedFeature.id, info);
        await storeMap.changeActiveTool(ICON_TOOL_ACTIVE.EDIT_MODEL);
        console.log(pickedFeature.id.name);
        await store.dispatch('VIEWER/setSelectedEntity', pickedFeature.id);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  click_object_handle.setInputAction(function (movement: any) {
    const pickedFeature = viewer.scene.pick(movement.endPosition);
    if (!Cesium.defined(pickedFeature)) {
      const nameOverlay = store.getters['VIEWER/getNameOverLay'];
      nameOverlay.style.display = 'none';
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

export async function setDefaultHandle() {
  const handles = store.getters['VIEWER/getHandles'];
  handles.forEach((handle: any) => {
    stop_handle(handle);
  });
  await store.dispatch('VIEWER/clearHandle');
}
export async function handle_draw_route() {
  await setDefaultHandle();
  const viewer = getViewer();
  const draw_route_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  draw_route_handle.setInputAction(async function (movement: any) {
    const mouse_position = get_position(movement.position);
    if (mouse_position !== null) {
      const point = {
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
        height: 0,
      };
      const point_entity = drawPointEntity(point);
      await store.dispatch('ROUTE/addPoint', point);
      await store.dispatch('ROUTE/addPointEntity', point_entity);

      let polyline = store.getters['ROUTE/getPolyline'];
      //console.log(store.getters['ROUTE/getPoints']);
      if (!polyline) {
        if (store.getters['ROUTE/getPoints'].length >= 2) {
          polyline = drawPolyline(store.getters['ROUTE/getPoints']);
          await store.dispatch('ROUTE/setPolyline', polyline);
        }
      } else {
        updatePolylineEntity(polyline, store.getters['ROUTE/getPoints']);
      }
      await calculate_distance_route();
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  draw_route_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

  await store.dispatch('VIEWER/pushHandle', draw_route_handle);
}

export async function calculate_distance_route() {
  const points = store.getters['ROUTE/getPoints'];
  const num_point = points.length;
  if (num_point >= 2) {
    const last_point = points[num_point - 1];
    const previous_last_point = points[num_point - 2];
    const distance = distanceBetweenTwoPoint(previous_last_point, last_point);
    await store.dispatch('ROUTE/plusToLength', distance);
    const dis = store.getters['ROUTE/getLength'];
    innerText('route_distance', formatDistance(dis));
  }
}
export function stop_handle(handle: any) {
  handle.destroy();
}

export function createNameOverLay() {
  const viewer = store.getters['VIEWER/getViewer'];
  const nameOverlay = document.createElement('div');
  viewer.container.appendChild(nameOverlay);
  nameOverlay.className = 'backdrop';
  nameOverlay.style.display = 'none';
  nameOverlay.style.position = 'absolute';
  nameOverlay.style.bottom = '0';
  nameOverlay.style.left = '0';
  return nameOverlay;
}

function updateNameOverlay(info: any, position: any) {
  const viewer = getViewer();
  const nameOverlay = store.getters['VIEWER/getNameOverLay'];
  // A feature was picked, so show its overlay content
  nameOverlay.style.display = 'block';
  nameOverlay.style.bottom = `${viewer.canvas.clientHeight - position.y}px`;
  nameOverlay.style.left = `${position.x}px`;
  if (info.type === 'building') {
    nameOverlay.innerHTML = `<div
    class="border-4 rounded-lg border-[#00811f] p-4 bg-white text-black text-xs text-left z-50"
  >
    <p><span class="font-bold text-sm">ID: ${info.id}</span></p>
    <p><span class="font-bold">Tên: </span>${info.ten_toa_nha} </p>
    <p><span class="font-bold">Loại đối tượng: </span> ${info.phan_loai_toa_nha}</p>
    <p><span class="font-bold">Diện tích: </span>${info.dien_tich} m2 </p>
    <p><span class="font-bold">Số tầng: </span>${info.so_tang}</p>
    <p><span class="font-bold">Số điện thoại: </span>****** **** **** </p>
    <p><span class="font-bold">Liên hệ:</span> **** ***** *****</p>
    <p><span class="font-bold">Địa chỉ: </span>${info.dia_chi.streetAddress},${info.dia_chi.commune},${info.dia_chi.district},${info.dia_chi.province}</p>
    <p><span class="font-bold">Thiết kế</span> File</p>
  </div>`;
  } else {
    nameOverlay.innerHTML = `<div
    class="border-4 rounded-lg border-[#00811f] p-4 bg-white text-black text-xs text-left z-50"
  >
    <p><span class="font-bold text-sm">ID: ${info.id}</span></p>
    <p><span class="font-bold">Tên: </span>${info.ten_toa_nha} </p>
    <p><span class="font-bold">Loại đối tượng: </span> ${info.phan_loai_toa_nha}</p>
  </div>`;
  }
}

export async function handle_draw_polygon() {
  await setDefaultHandle();
  const viewer = getViewer();
  const draw_polygon_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  draw_polygon_handle.setInputAction(async function (movement: any) {
    const mouse_position = get_position(movement.position);
    if (mouse_position !== null) {
      const point = {
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
        height: 0,
      };
      const point_entity = drawPointEntity(point);
      await store.dispatch('AREA/addPoint', point);
      await store.dispatch('AREA/addPointEntity', point_entity);

      let polygon = store.getters['AREA/getPolygon'];
      //console.log(store.getters['AREA/getPoints']);
      if (!polygon) {
        if (store.getters['AREA/getPoints'].length > 2) {
          polygon = drawPolygon(store.getters['AREA/getPoints']);
          await store.dispatch('AREA/setPolygon', polygon);
        }
      } else {
        updatePolygonEntity(polygon, store.getters['AREA/getPoints']);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  draw_polygon_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

  await store.dispatch('VIEWER/pushHandle', draw_polygon_handle);
}

export async function handle_move_get_position() {
  const viewer = store.getters['VIEWER/getViewer'];
  const move_get_position_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  move_get_position_handle.setInputAction(function (movement: any) {
    const mouse_position = get_position(movement.endPosition);
    if (mouse_position !== null) {
      const point = {
        lat: mouse_position.latitude,
        lng: mouse_position.longitude,
        height: 0,
      };
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  await store.dispatch('VIEWER/pushHandle', move_get_position_handle);

  move_get_position_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

export async function handle_get_positionX() {
  const viewer = store.getters['VIEWER/getViewer'];
  const move_get_position_handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  move_get_position_handle.setInputAction(function (movement: any) {
    console.log('mouse_position', movement);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  await store.dispatch('VIEWER/pushHandle', move_get_position_handle);

  move_get_position_handle.setInputAction(async function () {
    await setDefaultHandle();
  }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
