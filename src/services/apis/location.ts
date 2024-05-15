import { WEB_API_LOCATION_CATEGORIES } from '@/configs/apiPath';
import clientWebApi from '@/services/clientWebApi';




export const fetchLocationCategories = () => clientWebApi.get(WEB_API_LOCATION_CATEGORIES);