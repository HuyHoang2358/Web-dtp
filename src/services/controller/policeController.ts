import { addPinByIcon } from '@/DTP_3D/module/entity/pin';
import { fetchPolices } from '@/services/apis/police';
import { useMapStore } from '@/stores/map';
import { flyTo } from '@/DTP_3D/module/camera';
import { getViewer } from '@/DTP_3D/lib/common';
import { map } from 'leaflet';

export default {
  async turnOffPolice() {
    const mapStore = useMapStore();
    const viewer = getViewer();
    const policeEntities = mapStore.policeEntities;
    policeEntities.forEach((entity: any) => {
      viewer.entities.remove(entity);
    });
    mapStore.policeEntities = [];
  },

  async turnOnPolice() {
    await this.turnOffPolice();
    const mapStore = useMapStore();
    const resPolices = await fetchPolices() || [];
    const polices = resPolices.data;
    for (let i = 0; i < polices.length; i++) {
      const pos = {
        lng: polices[i]?.position?.longitude,
        lat: polices[i]?.position?.latitude,
      };
      const status = polices[i]?.status === 'active';
      const entity = addPinByIcon(pos, polices[i].id, status);
      mapStore.policeEntities.push(entity);
    }
  },


  async showInfoPolice(info: any) {
    const mapStore = useMapStore();
    mapStore.policeDetail = true;
    mapStore.policeDetailInfo = info;
    flyTo({
      latitude: info.position.latitude,
      longitude: info.position.longitude,
      height: 1000,
    });
  },
};
