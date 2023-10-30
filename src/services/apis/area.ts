import clientWebApi from '@/services/clientWebApi';
import {
  WEB_API_ADD_IMPORTANT_AREA,
  WEB_API_IMPORTANT_AREA,
  WEB_API_IMPORTANT_AREAS,
} from '@/configs/apiPath';

export const addImportantArea = (data: any) =>
  clientWebApi.post(`${WEB_API_ADD_IMPORTANT_AREA}`, data);

export const fetchImportantAreas = () => clientWebApi.get(WEB_API_IMPORTANT_AREAS);

export const fetchArea = (areaId: string) => clientWebApi.get(`${WEB_API_IMPORTANT_AREA}${areaId}`);
