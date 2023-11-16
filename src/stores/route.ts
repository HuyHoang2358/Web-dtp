import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRouteStore = defineStore('route', () => {
  const route_entity = ref(null);

  return {
    route_entity,
  };
});
