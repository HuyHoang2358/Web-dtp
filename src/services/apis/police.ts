import clientWebApi from '@/services/clientWebApi';
import { WEB_API_ADD_POLICE, WEB_API_POLICE, WEB_API_POLICES } from '@/configs/apiPath';

export const createPolice = (data: any) => clientWebApi.post(WEB_API_ADD_POLICE, data);
export const fetchPolices = () => clientWebApi.get(WEB_API_POLICES);
export const fetchPolice = (id: string) => clientWebApi.get(`${WEB_API_POLICE}${id}`);
