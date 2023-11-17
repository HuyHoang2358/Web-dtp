import { createRoi, fetchRois } from '@/services/apis/roi';
import { useMutation, useQuery } from '@tanstack/vue-query';

const ROIS_QUERY_KEY = 'ROIS_QUERY_KEY';
export const useAddNewRoi = () => useMutation(createRoi);

export const useRois = () =>
  useQuery({
    queryKey: [ROIS_QUERY_KEY],
    queryFn: fetchRois,
    retry: 2,
    refetchOnWindowFocus: true,
  });
