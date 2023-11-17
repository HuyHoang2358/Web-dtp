import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';

export const useMapStore = defineStore('map', () => {
  const iconToolActive = ref<ICON_TOOL_ACTIVE | undefined>(undefined);
  const selectingModelInfo = ref();
  const selectingModelEntity = ref();
  const policeDetail = ref(false);
  const policeDetailInfo = ref({
    id: '6555f06166bd8e5f0f198a11',
    name: 'Nguyễn Văn XƯ',
    code: 'MK3',
    phone: '0868695328',
    avatarUrl: '/images/BCA/police.jpg',
    description: '',
    addressDto: {
      province: 'Thành phố Hà Nội',
      district: 'Quận Ba Đình',
      commune: 'Phường Trúc Bạch',
      streetAddress: '',
    },
    position: 'Thành viên',
    birthday: '19/07/1982',
    location: {
      type: 'Point',
      coordinates: [105.8278872181121, 21.03092759331635],
    },
    importantLocationId: '',
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
  };
});
