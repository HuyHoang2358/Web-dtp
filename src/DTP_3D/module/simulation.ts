import * as Cesium from 'cesium';
import { distanceBetweenTwoPoint, getCesiumColor, getViewer } from '@/DTP_3D/lib/common';
import {
  CAR_AVERAGE_SPEED,
  CAR_MODEL_ASSET_ID,
} from '@/DTP_3D/config/mainConfig';
import store from '@/store';
import { setDefaultMap } from '@/DTP_3D/module/map';
import { setDefaultHandle } from '@/DTP_3D/module/handle';
import { useMapStore } from '@/stores/map';
import { fetchPing } from '@/services/apis/task';
import routeController from '@/services/controller/routeController';
import { changeColorCircle } from '@/DTP_3D/module/entity/shape';

export async function loadModel(
  start: any,
  stop: any,
  positionProperty: any,
  model_AssetID: number,
  isTracking = false,
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

export async function loadAreaModel(
  start: any,
  stop: any,
  positionProperty: any,
  radius:number,
  color:string
) {
  const viewer = getViewer();
  const entity = await viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: start, stop: stop }),
    ]),
    position: positionProperty,
    ellipse: {
      semiMinorAxis: radius,
      semiMajorAxis: radius,
      height: 0,
      material: getCesiumColor(color).withAlpha(0.6),
      outline: false,
    },
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    path: new Cesium.PathGraphics({ width: 0 }),
  });
  return entity;
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
  const mapStore = useMapStore();
  const start = viewer.clock.currentTime;
  const totalSeconds = getTotalTimeOfTour(road_data);
  const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
  viewer.clock.multiplier = 1;
  // Start playing the scene.
  viewer.clock.shouldAnimate = true;
  const positionProperty = preparePositionProperty(road_data, start);
  await loadModel(start, stop, positionProperty, model_AssetID);
  const area1 = await loadAreaModel(start, stop, positionProperty, 50, 'green')
  const area2 = await loadAreaModel(start, stop, positionProperty, 100, 'orange')
  mapStore.carArea1Entity = area1;
  mapStore.carArea2Entity = area2;


}

function prepareDataForSimulationRoute(data:number[]) {
  const points = [];
  for (let i = 0; i < data.length / 2; i++) {
    const ans = {
      lng: data[i * 2],
      lat: data[i * 2 + 1],
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
  const mapStore = useMapStore();
  const road_data = prepareDataForSimulationRoute(mapStore.routPoints);
  await startSimulationCar(road_data, CAR_MODEL_ASSET_ID);

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


export async function getStatus() {
  const pong = await fetchPing();
  console.log(pong);
  const status = pong.data.status;
  const location = {
    lat: pong.data.location[0],
    lng: pong.data.location[1],
  };
  const mapStore = useMapStore();
  switch (status) {
    case "1":
      console.log("Gặp tai nạn");
      routeController.stopClock();
      changeColorCircle(mapStore.carArea1Entity, "red");
      break;
    case "2":
      console.log("Bị khủng bố");
      routeController.stopClock();
      changeColorCircle(mapStore.carArea1Entity, "red");
      break;
    case "3":
      console.log("Bị bao vây");
      routeController.stopClock();
      changeColorCircle(mapStore.carArea1Entity, "red");
      break;
    case "4":
      console.log("An toàn");
      changeColorCircle(mapStore.carArea1Entity, "green");
      break;
    default:
      routeController.continueClock();
      changeColorCircle(mapStore.carArea1Entity, "green");
      console.log("An toàn");
  }


}

export function trackingEntity() {
  console.log("Tracking Entity")
  const mapStore = useMapStore();
  mapStore.is_tracking = true;
  mapStore.tracking_interval = setInterval(async () => {
    await getStatus();
  }, 1000);
}
export function offTrackingEntity(){
  console.log("Off Tracking Entity")
  routeController.continueClock();
  const mapStore = useMapStore();
  clearInterval(mapStore.tracking_interval);
}

export function clickTrackingBtn(){
  const mapStore = useMapStore();
  if(mapStore.is_tracking){
    offTrackingEntity();
  }else{
    trackingEntity();
  }
}