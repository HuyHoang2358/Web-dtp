import { addRouteEntity } from '@/DTP_3D/module/route';
import { useRouteStore } from '@/stores/route';
import { removeEntity, visualizeModelEntity } from '@/DTP_3D/module/entity';
import { BUILDINGS_ROUTE } from '@/DTP_3D/config/data3D';
import { getObjectsById } from '@/DTP_3D/api/entity';
import store from '@/store';

export default {
  async turnOnRoute(route_data: any) {
    const routeStore = useRouteStore();
    routeStore.route_entity = addRouteEntity(route_data);
    //console.log(BUILDINGS_ROUTE);
    const objs = await getObjectsById(BUILDINGS_ROUTE);
    console.log('OBJS', objs);
    for (const obj of objs) {
      const entity = visualizeModelEntity(obj.model);

      await store.dispatch('VIEWER/pushEntity', { info: obj, entity: entity });
    }
  },

  turnOffRoute() {
    const routeStore = useRouteStore();
    if (routeStore.route_entity) {
      const entity = routeStore.route_entity;
      routeStore.route_entity = null;
      removeEntity(entity);
    }
  },

  onClickRoute(route_data: any) {
    const routeStore = useRouteStore();
    if (routeStore.route_entity) this.turnOffRoute();
    else this.turnOnRoute(route_data);
  },
};
