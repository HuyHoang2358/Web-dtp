import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';

export const useMapStore = defineStore('map', () => {
  const iconToolActive = ref<ICON_TOOL_ACTIVE | undefined>(undefined);
  const selectingModelInfo = ref();
  const selectingModelEntity = ref();
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
    changeSelectingModel,
    selectingModelInfo,
    selectingModelEntity,
  };
});
