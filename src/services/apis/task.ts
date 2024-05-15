import {
  WEB_API_PING, WEB_API_ROUTE_PUBLISH,
  WEB_API_TASK_TARGET_RECONNAISSANCE_ADD,
  WEB_API_TASK_TARGET_RECONNAISSANCE_DELETE,
  WEB_API_TASKS
} from '@/configs/apiPath';
import type { Item } from '@/services/apis/user';
import clientWebApi from '@/services/clientWebApi';


export interface TaskResType {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
  items: Item[];
}


export const fetchTasks = (type?:string) => {
  if (!type) {
    return clientWebApi.get(WEB_API_TASKS);
  }
  return clientWebApi.get(`${WEB_API_TASKS}${type}`);
}

export const fetchPing = () => {
  return clientWebApi.get(WEB_API_PING);
}

export const publishRoute= (data: any) => clientWebApi.post(WEB_API_ROUTE_PUBLISH, data)


export const createTargetReconnaissances= (data: any) => clientWebApi.post(WEB_API_TASK_TARGET_RECONNAISSANCE_ADD, data);

export const deleteTargetReconnaissances = (id: number) => clientWebApi.delete(`${WEB_API_TASK_TARGET_RECONNAISSANCE_DELETE}${id}`);