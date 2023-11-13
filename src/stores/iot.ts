import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useIOTStore = defineStore('iot', () => {
  const app = ref();
  const db = ref();
  const intervalId = ref();
  const gps_entity = ref();
  const isInitFirebase = computed(() => !(app.value || db.value));
  const isTrackingGPS = ref(false);
  return {
    app,
    db,
    isInitFirebase,
    isTrackingGPS,
    intervalId,
    gps_entity,
  };
});
