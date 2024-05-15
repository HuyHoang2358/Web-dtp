import { createPinPosition, updatePinNewPosition } from '@/DTP_3D/module/entity/pin';

import { useEditingPos } from '@/stores/editingPos';
import { posHandle } from '@/DTP_3D/module/handle/posHandle';

import { fetchRois } from '@/services/apis/roi';
import { fetchTasks } from '@/services/apis/task';
import { useMapStore } from '@/stores/map';
import { getViewer } from '@/DTP_3D/lib/common';

export default {
  async turnOffPosition() {
    const mapStore = useMapStore();
    const viewer = getViewer();
    const positionEntities = mapStore.positionEntities;
    positionEntities.forEach((entity: any) => {
      viewer.entities.remove(entity);
    });
    mapStore.positionEntities = [];
  },

  updatePos(pos: any) {
    const editingPosStore = useEditingPos();
    editingPosStore.info.position.latitude = pos.lat;
    editingPosStore.info.position.longitude = pos.lng;
    let posEntity = editingPosStore.entity;
    if (posEntity) {
      updatePinNewPosition(posEntity, pos,editingPosStore.info.pin);
    } else {
      posEntity = createPinPosition(
        pos,
        editingPosStore.info.pin,
      );
      editingPosStore.entity = posEntity;
    }
  },

  async getPosition() {
    console.log('getPos');
    await posHandle();
  },

  async turnOnPosition() {
    await this.turnOffPosition()
    const res = await fetchTasks("reconnaissance");
    const tasks = res?.data || [];
    let reconnaissancePoints : any[] = [];
    tasks.forEach((task: any) => {
      reconnaissancePoints = reconnaissancePoints.concat(task.target_reconnaissances);
    });
    console.log("reconnaissancePoints", reconnaissancePoints);
    const mapStore = useMapStore();
    for (let i = 0; i < reconnaissancePoints.length; i++) {
      mapStore.positionEntities.push(createPinPosition(
        {
              lat: reconnaissancePoints[i].position.latitude,
              lng: reconnaissancePoints[i].position.longitude,
            },
        {
              color: reconnaissancePoints[i].location_category.color,
              cesium_icon: reconnaissancePoints[i].location_category.cesium_icon,
        }));
    }
  },

  addSuccess() {
    const editingPosStore = useEditingPos();
    editingPosStore.entity = null;
  },
};
