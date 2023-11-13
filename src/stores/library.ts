import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ModelEntityInfo } from '@/DTP_3D/type/DTP3D.type';

export const useLibraryStore = defineStore('library', () => {
  const model_info = ref<ModelEntityInfo>({
    name: '',
    description: '',
    model_url: '',
    scale: 1,
    latitude: 0,
    longitude: 0,
    height: 0,
    heading: 0,
    pitch: 0,
    roll: 0,
  });
  const model_entity = ref(null);

  const isExistModel = computed(() => Boolean(model_info.value) && Boolean(model_entity.value));
  function changeLatLng(newLat: number, newLng: number) {
    model_info.value.latitude = newLat;
    model_info.value.longitude = newLng;
  }

  return {
    model_info,
    model_entity,
    isExistModel,
    changeLatLng,
  };
});
