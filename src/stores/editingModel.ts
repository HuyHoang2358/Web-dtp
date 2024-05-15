import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEditingModel = defineStore('editingModel', () => {
  const model_info = ref();
  const model_entity = ref();
  const label_text = ref('');
  const label_entity = ref();
  const isOpen = ref(false);
  const isEditing = ref(false);

  return {
    model_info,
    model_entity,
    label_text,
    label_entity,
    isOpen,
    isEditing,
  };
});
