import { useMutation } from '@tanstack/vue-query';
import { addEntity, updateEntity } from '@/services/apis/entiy';

export const useUpdateEntity = () => useMutation(updateEntity);
export const useAddEntity = () => useMutation(addEntity);
