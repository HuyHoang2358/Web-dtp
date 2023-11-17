import clientWebApi from '@/services/clientWebApi';
import { WEB_API_ADD_ROI, WEB_API_ROIS } from '@/configs/apiPath';

export const fetchRois = () => clientWebApi.get(WEB_API_ROIS);
export const createRoi = (data: any) => clientWebApi.post(WEB_API_ADD_ROI, data);
