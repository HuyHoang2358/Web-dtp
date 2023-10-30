import { useMutation } from '@tanstack/vue-query';
import { updateEntity } from '@/services/apis/entiy';

export const useUpdateEntity = () => useMutation(updateEntity);
