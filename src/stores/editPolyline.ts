import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditPolyline = defineStore('editPolyline', () => {
  const polylineEntity = ref();
  const points = ref([]);


  return {
    polylineEntity,
    points,
  };
});
