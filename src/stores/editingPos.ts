import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useEditingPos = defineStore('editingPos', () => {
  const info = reactive({
    name: 'no name',
    type: 'hospital.png',
    colorId: 1,
    lat: 0,
    lng: 0,
  });
  const entity = ref();
  return {
    info,
    entity,
  };
});
