import { useQuery } from '@tanstack/vue-query';
import { fetchLocationCategories } from '@/services/apis/location';


export const LOCATION_CATEGORIES_QUERY_KEY = 'LOCATION_CATEGORIES_QUERY_KEY';

export const useLocationCategories = () =>
  useQuery({
    queryKey: [LOCATION_CATEGORIES_QUERY_KEY],
    queryFn: fetchLocationCategories,
    keepPreviousData: true,
    retry: 2,
  });





