import { createPinPosition, updatePinNewPosition } from '@/DTP_3D/module/entity/pin';

import { useEditingPos } from '@/stores/editingPos';
import { posHandle } from '@/DTP_3D/module/handle/posHandle';

import { fetchRois } from '@/services/apis/roi';

export default {
  updatePos(pos: any) {
    const editingPosStore = useEditingPos();
    editingPosStore.info.lat = pos.lat;
    editingPosStore.info.lng = pos.lng;
    let posEntity = editingPosStore.entity;
    if (posEntity) {
      updatePinNewPosition(posEntity, pos);
    } else {
      posEntity = createPinPosition(
        pos,
        editingPosStore.info.name,
        editingPosStore.info.type,
        editingPosStore.info.colorId,
      );
      editingPosStore.entity = posEntity;
    }
  },
  async getPosition() {
    console.log('getPos');
    await posHandle();
  },

  async turnOnPosition() {
    const res = await fetchRois();
    const rois = res?.data || [];
    console.log(rois);
    for (let i = 0; i < rois.length; i++) {
      const pos = {
        lng: rois[i].location.coordinates[0],
        lat: rois[i].location.coordinates[1],
      };
      let type = '';
      let colorId = 0;
      if (rois[i].status === '/images/BCA/hospital.png') {
        type = 'hospital.png';
        colorId = 1;
      } else if (rois[i].status === '/images/BCA/ca.png') {
        type = 'star.png';
        colorId = 2;
      } else {
        type = 'town.png';
        colorId = 0;
      }
      createPinPosition(pos, rois[i].name, type, colorId);
    }
  },

  addSuccess() {
    const editingPosStore = useEditingPos();
    editingPosStore.entity = null;
  },
};
