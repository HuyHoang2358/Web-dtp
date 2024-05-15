import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ProtectTask } from '@/Types';


export const useTaskStore = defineStore('task', () => {
  const protectTasks = ref();



  function getTaskById(id:number){
    return protectTasks.value.find((task:ProtectTask) => task.id === id);
  }

  return {
    protectTasks,
    getTaskById,
  };
});
