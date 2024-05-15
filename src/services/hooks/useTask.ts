import { useMutation, useQuery } from '@tanstack/vue-query';
import { createTargetReconnaissances, deleteTargetReconnaissances, fetchTasks } from '@/services/apis/task';

export const TASKS_QUERY_KEY = 'TASKS_QUERY_KEY';

export const useTasks = (type?:string) =>
  useQuery({
    queryKey: [TASKS_QUERY_KEY, type],
    queryFn: () => fetchTasks(type),
    keepPreviousData: true,
    retry: 2,
  });

export const useAddNewTargetReconnaissance= () => useMutation(createTargetReconnaissances);

export const useDeleteTargetReconnaissance = () => useMutation(deleteTargetReconnaissances);
