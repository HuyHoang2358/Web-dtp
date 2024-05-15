import { type Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';

export const useMapStore = defineStore('map', () => {
  const iconToolActive = ref<ICON_TOOL_ACTIVE | undefined>(ICON_TOOL_ACTIVE.POLYGON);
  const selectingModelInfo = ref();
  const selectingModelEntity = ref();
  const policeDetail = ref(false);
  const policeDetailInfo = ref({
    id: '6555f06166bd8e5f0f198a11',
    name: 'Nguyễn Văn XƯ',
    code: 'MK3',
    phone: '0868695328',
    avatar_path: '/images/BCA/police.jpg',
    email: '',
    position: {
      id: '',
      latitude: 0,
      longitude: 0,
      height: 0,
    },
    'status': 'active',
  });
  const selectingModel = ref({
    id: '',
    model_id: '',
    latitude: 0,
    longitude: 0,
    height: 0,
    pitch: 0,
    roll: 0,
    heading: 0,
    scale: 1,
  });
  const labelEntities = ref([]);

  const policeEntities:Ref<any[]>  = ref([])
  const positionEntities :Ref<any[]> = ref([])

  const trafficEntities:Ref<any[]> = ref([])
  const carArea1Entity = ref([])
  const carArea2Entity = ref([])
  const routPoints :Ref<number[]> = ref([])

  const is_tracking = ref(false)
  const tracking_interval = ref()

  const is_directing = ref(false)

  function changeSelectingModel(model: any) {
    selectingModel.value = model;
  }
  function changeActiveTool(value?: ICON_TOOL_ACTIVE) {
    iconToolActive.value = value;
  }

  return {
    iconToolActive,
    changeActiveTool,
    selectingModel,
    policeDetail,
    policeDetailInfo,
    changeSelectingModel,
    selectingModelInfo,
    selectingModelEntity,
    labelEntities,
    policeEntities,
    positionEntities,
    trafficEntities,
    carArea1Entity,
    carArea2Entity,
    routPoints,
    is_tracking,
    tracking_interval,
    is_directing
  };
});
