import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouteStore = defineStore('route', () => {
  const p = ref(null);

  return {
    route_entity,
  };
});
