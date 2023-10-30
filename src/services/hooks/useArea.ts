import { useMutation, useQuery } from '@tanstack/vue-query';
import { addImportantArea, fetchImportantAreas } from '@/services/apis/area';
export const IMPORTANT_AREAS_QUERY_KEY = 'IMPORTANT_AREAS_QUERY_KEY';

export const useAddImportantArea = () => useMutation(addImportantArea);

export const useImportantAreas = () =>
  useQuery({
    queryKey: [IMPORTANT_AREAS_QUERY_KEY],
    queryFn: fetchImportantAreas,
    retry: 2,
    refetchOnWindowFocus: true,
  });
