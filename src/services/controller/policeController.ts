import { addPinByIcon } from '@/DTP_3D/module/entity/pin';
import { fetchPolices } from '@/services/apis/police';
import { useMapStore } from '@/stores/map';
import { flyTo } from '@/DTP_3D/module/camera';
import { getViewer } from '@/DTP_3D/lib/common';

export default {
  async turnOnPolice() {
    const res = await fetchPolices();
    const polices = res?.data || [];
    for (let i = 0; i < polices.length; i++) {
      const pos = {
        lng: polices[i].location.coordinates[0],
        lat: polices[i].location.coordinates[1],
      };
      const status = Math.floor(Math.random() * 10) > 4;
      addPinByIcon(pos, polices[i].id, status);
    }
  },
  async turnOffPolice() {
    const viewer = getViewer();
    viewer.entities.removeAll();
  },
  async showInfoPolice(info: any) {
    const mapStore = useMapStore();
    mapStore.policeDetail = true;
    mapStore.policeDetailInfo = info;
    flyTo({
      latitude: info.location.coordinates[1],
      longitude: info.location.coordinates[0],
      height: 1000,
    });
  },
};
