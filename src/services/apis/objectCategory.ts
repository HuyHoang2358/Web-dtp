import clientWebApi from '@/services/clientWebApi';
import { WEB_API_OBJECT_CATEGORIES } from '@/configs/apiPath';

export const fetchObjectCategories = () => clientWebApi.get(WEB_API_OBJECT_CATEGORIES);