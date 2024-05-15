import { useTasks } from '@/services/hooks/useTask';
import { fetchTasks } from '@/services/apis/task';

export default {
  async turnOnTask() {
    console.log('turnOnTask');

    const protectTasks = await fetchTasks('protect');
    const reconnaissanceTasks = await fetchTasks('reconnaissance');

    console.log('protectTasks', protectTasks.data);
    console.log('reconnaissanceTasks', reconnaissanceTasks.data);

  },
}