import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useEditingPos = defineStore('editingPos', () => {
  const info = reactive({
    task_id: 2,
    position: {
      latitude: 0,
      longitude: 0,
      height: 0,
    },
    user_id: 0,
    position_type_id: 1,
    status: 'chuẩn bị',
    description: '',
    documents: '',
    pin: {
      color: 'red',
      cesium_icon: '',
    }
  });
  const entity = ref();
  return {
    info,
    entity,
  };
});
