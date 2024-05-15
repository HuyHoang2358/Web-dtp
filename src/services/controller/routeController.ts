import { addPolylineEntity, addRouteEntity } from '@/DTP_3D/module/route';
import { useRouteStore } from '@/stores/route';
import { removeEntity, visualizeCityObj, visualizeModelEntity } from '@/DTP_3D/module/entity';
import { BUILDINGS_ROUTE } from '@/DTP_3D/config/data3D';
import { getCityObjects, getObjectsById } from '@/DTP_3D/api/entity';
import store from '@/store';
import { useTaskStore } from '@/stores/task';
import { getViewer, mergerPointIntoArray } from '@/DTP_3D/lib/common';
import { AREAS } from '@/DTP_3D/config/MapConfig';
import { addCircle, addCylinder, changeColorCircle } from '@/DTP_3D/module/entity/shape';
import { useMapStore } from '@/stores/map';
import { drawPolylineHandle } from '@/DTP_3D/module/handle/drawPolylineHandle';
import { useEditPolyline } from '@/stores/editPolyline';
import { publishRoute } from '@/services/apis/task';
import { draw_tunnel } from '@/DTP_3D/module/entity/tunnel';



export default {
  // TODO: off traffic in map
  async turnOffTraffic(){
    const mapStore = useMapStore();
    const viewer = getViewer();
    mapStore.trafficEntities.forEach((entity) => {
      viewer.entities.remove(entity);
    });
    mapStore.trafficEntities = [];
  },
  // TODO: on traffic in map
  async turnOnTraffic(){
    await this.turnOffTraffic();

    const helicopterLocations = [
      {
        lat: 21.037154,
        lng: 105.837521,
        height:200,
      },
      {
        lat: 21.040858,
        lng: 105.833751,
        height: 200,
      },
      {
        lat: 21.033824,
        lng: 105.843225,
        height: 200,
      },
      {
        lat: 21.034117,
        lng: 105.840156 ,
        height: 200,
      },


    ]
    const mapStore = useMapStore();

    helicopterLocations.forEach((location) => {
      mapStore.trafficEntities.push(addCylinder('Helicopter', location, 25));
    });
  },
  // TODO: on building in map
  async turnOnBuilding(){
    const area = AREAS[13];
    const objs = await getCityObjects(area);

    for (const obj of objs) {
      const entity = visualizeCityObj(obj);
      await store.dispatch('VIEWER/pushEntity', { info: obj, entity: entity });
    }
  },

  // TODO: show route in map
  onclickProtectTask(task_id: number) {
    const taskStore = useTaskStore();
    const task = taskStore.getTaskById(task_id);
    const routePoints = mergerPointIntoArray(task.route.points);
    const routeEntity = addRouteEntity(routePoints);
    const mapStore = useMapStore();
    mapStore.routPoints = routePoints;
  },

  stopClock(){
    const viewer = getViewer();
    const clock = viewer.clockViewModel;
    clock.shouldAnimate  = false;
  },
  continueClock(){
    const viewer = getViewer();
    const clock = viewer.clockViewModel;
    clock.shouldAnimate  = true;
  },

  // TODO: dẫn đường
  async direction() {
    const mapStore = useMapStore();
    mapStore.is_directing = true;
    const editPolylineStore = useEditPolyline();
    editPolylineStore.points = []
    await drawPolylineHandle();
  },

  async publishRoute() {
    console.log("publish route");
    const mapStore = useMapStore();
    mapStore.is_directing = false;
    const editPolylineStore = useEditPolyline();
    console.log(editPolylineStore.points)
    const  data = {
      points: editPolylineStore.points
    }
     await publishRoute(data);
  },

  async clickDirectionBtn(){
    const mapStore = useMapStore();
    if (mapStore.is_directing) {
      await this.publishRoute()
    } else {
      await this.direction();
    }
  },

  turnOnTunnel(){
    const data = [
      {
        "lat": 21.0395,
        "lng": 105.835799
      },
      {
        "lat": 21.0395,
        "lng": 105.835799
      },
      {
        "lat": 21.039264,
        "lng": 105.83578
      },
      {
        "lat": 21.039122,
        "lng": 105.83583
      },
      {
        "lat": 21.039055,
        "lng": 105.836172
      },
      {
        "lat": 21.038913,
        "lng": 105.836955
      },
      {
        "lat": 21.038862,
        "lng": 105.837008
      },
      {
        "lat": 21.038114,
        "lng": 105.836884
      },
      {
        "lat": 21.036735,
        "lng": 105.836603
      },
      {
        "lat": 21.035744,
        "lng": 105.836369
      },
      {
        "lat": 21.03562,
        "lng": 105.836359
      },
      {
        "lat": 21.035115,
        "lng": 105.836806
      },
      {
        "lat": 21.034885,
        "lng": 105.836981
      },
      {
        "lat": 21.031562,
        "lng": 105.833009
      }
    ]
    draw_tunnel()


  }
};
