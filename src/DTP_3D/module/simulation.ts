import * as Cesium from 'cesium';
import { distanceBetweenTwoPoint, getViewer } from '@/DTP_3D/lib/common';
import {
  CAR_AVERAGE_SPEED,
  CAR_MODEL_ASSET_ID,
  HANOI_CENTER_POINT,
} from '@/DTP_3D/config/mainConfig';
import store from '@/store';
import { setDefaultMap, turnOnArea } from '@/DTP_3D/module/map';
import { setDefaultHandle } from '@/DTP_3D/module/handle';
import { ROUTE_PHUTT_MYDINH } from '@/DTP_3D/config/data3D';

export async function loadModel(
  start: any,
  stop: any,
  positionProperty: any,
  model_AssetID: number,
  isTracking = true,
) {
  const viewer = getViewer();
  const modelUri = await Cesium.IonResource.fromAssetId(model_AssetID);

  const entity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: start, stop: stop }),
    ]),
    position: positionProperty,
    model: {
      uri: modelUri,
      scale: 50,
    },
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    path: new Cesium.PathGraphics({ width: 0 }),
  });
  await store.dispatch('ROUTE/setModel', entity);
  if (isTracking) viewer.trackedEntity = entity;
}

function preparePositionProperty(roadData: any, start: any) {
  const positionProperty = new Cesium.SampledPositionProperty();

  let sumTime = 0;
  for (let i = 0; i < roadData.length; i++) {
    const dataPoint = roadData[i];
    sumTime = sumTime + dataPoint.time;
    const time = Cesium.JulianDate.addSeconds(start, sumTime, new Cesium.JulianDate());
    const position = Cesium.Cartesian3.fromDegrees(dataPoint.lng, dataPoint.lat, dataPoint.height);
    positionProperty.addSample(time, position);
  }
  return positionProperty;
}
function getTotalTimeOfTour(data: any) {
  let totalS = 0;
  for (let i = 0; i < data.length; i++) totalS = totalS + data[i].time;
  return totalS;
}

async function startSimulationCar(road_data: any, model_AssetID: any) {
  const viewer = getViewer();
  const start = viewer.clock.currentTime;
  const totalSeconds = getTotalTimeOfTour(road_data);
  const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
  viewer.clock.multiplier = 1;
  // Start playing the scene.
  viewer.clock.shouldAnimate = true;
  const positionProperty = preparePositionProperty(road_data, start);
  await loadModel(start, stop, positionProperty, model_AssetID);
}

function prepareDataForSimulationRoute() {
  const points = [];
  for (let i = 0; i < ROUTE_PHUTT_MYDINH.length / 2; i++) {
    const ans = {
      lng: ROUTE_PHUTT_MYDINH[i * 2],
      lat: ROUTE_PHUTT_MYDINH[i * 2 + 1],
      height: 0,
    };
    points.push(ans);
  }

  /*const points = store.getters['ROUTE/getPoints'];*/
  if (points.length == 0) return [];
  const ans = [{ ...points[0], time: 0 }];
  for (let i = 1; i < points.length; i++) {
    const last_point = points[i];
    const previous_last_point = points[i - 1];
    const distance = distanceBetweenTwoPoint(previous_last_point, last_point) / 1000;
    const time = Math.floor((distance / CAR_AVERAGE_SPEED) * 60 * 60);
    ans.push({ ...points[i], time: time });
  }
  return ans;
}

export async function simulationRoute() {
  const road_data = prepareDataForSimulationRoute();
  await startSimulationCar(road_data, CAR_MODEL_ASSET_ID);
  /* await turnOnArea(
    {
      id: '2000000000000001212',
      name: 'Thành phố Hà Nội',
      description: 'Bản đồ 3D có texture khu vực TP. Hà Nội',
      type_key: '3D_TEXTURE',
      type_data: 'gltf',
      slug: 'hanoi',
      preview_image: '/images/preview/HaNoi_texture_preview.png',
      center_point: HANOI_CENTER_POINT,
      active: true,
    },
    false,
  );*/
}

export async function stopSimulationRoute() {
  const viewer = getViewer();
  const entity = store.getters['ROUTE/getModel'];
  viewer.entities.remove(entity);
  await store.dispatch('ROUTE/clearModel');

  const points = store.getters['ROUTE/getPointEntities'];
  console.log(points);
  for (let i = 0; i < points.length; i++) if (points[i]) viewer.entities.remove(points[i]);

  const route = store.getters['ROUTE/getPolyline'];
  if (route) viewer.entities.remove(route);

  await store.dispatch('ROUTE/clearPolyline');
  await store.dispatch('ROUTE/clearModel');
  await store.dispatch('ROUTE/clearPoints');
  await store.dispatch('ROUTE/clearPointEntities');
  setDefaultMap();
  await setDefaultHandle();
}

export function trackingEntity() {
  const viewer = getViewer();
  if (!viewer.trackedEntity) {
    viewer.trackedEntity = store.getters['ROUTE/getModel'];
  } else {
    viewer.trackedEntity = null;
  }
  console.log(viewer.trackedEntity);
}
