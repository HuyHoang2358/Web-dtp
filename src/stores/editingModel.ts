import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditingModel = defineStore('editingModel', () => {
  const model_info = ref({
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
  const model_entity = ref();

  const isOpen = ref(false);
  const isEditing = ref(false);

  return {
    model_info,
    model_entity,
    isOpen,
    isEditing,
  };
});
