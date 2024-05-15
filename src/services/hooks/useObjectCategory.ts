import { fetchObjectCategories} from '@/services/apis/objectCategory';
import { useQuery } from '@tanstack/vue-query';

const OBJECT_CATEGORY_QUERY_KEY = 'OBJECT_CATEGORY_QUERY_KEY';
export const useObjectCategories = () =>
  useQuery({
    queryKey: [OBJECT_CATEGORY_QUERY_KEY],
    queryFn: fetchObjectCategories,
    retry: 2,
    refetchOnWindowFocus: true,
  });
