import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';

export const useMapStore = defineStore('map', () => {
  const iconToolActive = ref<ICON_TOOL_ACTIVE | undefined>(undefined);

  function changeActiveTool(value?: ICON_TOOL_ACTIVE) {
    iconToolActive.value = value;
  }

  return {
    iconToolActive,
    changeActiveTool,
  };
});
