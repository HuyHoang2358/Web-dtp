import clientWebApi from '@/services/clientWebApi';
import { WEB_API_ROIS } from '@/configs/apiPath';

export const fetchRois = () => clientWebApi.get(WEB_API_ROIS);
