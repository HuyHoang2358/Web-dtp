import { createPolice, fetchPolices } from '@/services/apis/police';
import { useMutation, useQuery } from '@tanstack/vue-query';

const POLICES_QUERY_KEY = 'POLICES_QUERY_KEY';
export const useAddNewPolice = () => useMutation(createPolice);
export const usePolices = () =>
  useQuery({
    queryKey: [POLICES_QUERY_KEY],
    queryFn: fetchPolices,
    retry: 2,
    refetchOnWindowFocus: true,
  });
