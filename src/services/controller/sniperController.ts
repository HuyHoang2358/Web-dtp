/*//@ts-nocheck*/
import { BUILDINGS_ROUTE, BUILDINGS_SNIPER } from '@/DTP_3D/config/data3D';
import { getObjectsById } from '@/DTP_3D/api/entity';
import { visualizeModelEntity } from '@/DTP_3D/module/entity';
import store from '@/store';
import { distanceBetweenTwoPoint, formatDistance, getViewer, innerText } from '@/DTP_3D/lib/common';
import { useSniperStore } from '@/stores/sniper';
import {
  addSniperEntity,
  addSniperEntityX,
  modifyConeDegreeSniper,
  modifyRadiusSniper,
  updateLineSniper,
} from '@/DTP_3D/module/sniper';
import { handle_get_positionX } from '@/DTP_3D/module/handle';
import { sniperHandle } from '@/DTP_3D/module/handle/sniperHandle';

export default {
  modifySniperX(height: number) {
    const sniperStore = useSniperStore();
    const newPoint = sniperStore.dstPoint;
    newPoint.height = height;
    sniperStore.dstPoint = newPoint;
    updateLineSniper(sniperStore.sniperEntity, sniperStore.point, newPoint);
  },
  updateSniperX(p: any) {
    const sniperStore = useSniperStore();
    const newPoint = sniperStore.dstPoint;
    newPoint.lat = p.lat;
    newPoint.lng = p.lng;
    sniperStore.dstPoint = newPoint;

    const distance = distanceBetweenTwoPoint(sniperStore.point, newPoint);
    sniperStore.distance = formatDistance(distance);
    //console.log(formatDistance(distance));
    updateLineSniper(sniperStore.sniperEntity, sniperStore.point, newPoint);
  },
  async turnOnHandle() {
    const sniperStore = useSniperStore();
    await sniperHandle();
  },
  async turnOnSniperX() {
    const viewer = getViewer();
    viewer.entities.removeAll();

    const objs = await getObjectsById(BUILDINGS_ROUTE);
    console.log('OBJS', objs);
    for (const obj of objs) {
      const entity = visualizeModelEntity(obj.model);
      await store.dispatch('VIEWER/pushEntity', { info: obj, entity: entity });
      viewer.zoomTo(entity);
    }

    const sniperStore = useSniperStore();
    const point1 = {
      lat: 21.032112,
      lng: 105.83236,
      height: 45,
    };
    const point2 = {
      lat: 21.037187095077478,
      lng: 105.83697823490358,
      height: 1,
    };
    sniperStore.point = point1;
    sniperStore.dstPoint = point2;
    sniperStore.sniperEntity = addSniperEntityX(point1, point2);
    await this.turnOnHandle();
  },
  async turnOnSniper() {
    const viewer = getViewer();
    const objs = await getObjectsById(BUILDINGS_SNIPER);
    console.log('OBJS', objs);
    for (const obj of objs) {
      const entity = visualizeModelEntity(obj.model);
      await store.dispatch('VIEWER/pushEntity', { info: obj, entity: entity });
      viewer.zoomTo(entity);
    }
    const sniperStore = useSniperStore();
    sniperStore.point = {
      lat: 21.007121,
      lng: 105.788504,
      height: 0.01,
    };
    sniperStore.clockVolume = {
      max: 360,
      min: 0,
    };
    sniperStore.coneVolume = {
      max: 90,
      min: 0,
    };
    sniperStore.radii = {
      x: 500,
      y: 500,
      z: 500,
    };
    const sniperConfig = {
      point: sniperStore.point,
      clockVolume: sniperStore.clockVolume,
      coneVolume: sniperStore.coneVolume,
      radii: sniperStore.radii,
    };
    sniperStore.sniperEntity = addSniperEntity(sniperConfig);
    ///

    await handle_get_positionX();
  },
  modifySniper(info: any, type: boolean) {
    //console.log(info);
    const sniperStore = useSniperStore();
    if (type) {
      //console.log(info.coneDegree);
      //console.log(info.radius);
      modifyRadiusSniper(sniperStore.sniperEntity, info.radius);
      modifyConeDegreeSniper(sniperStore.sniperEntity, info.coneDegree);
    }
  },
  turnOffSniper() {
    const viewer = getViewer();
    viewer.entities.removeAll();
    const sniperStore = useSniperStore();
    sniperStore.sniperEntity = null;
  },
};
