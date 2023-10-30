import { WEB_API_ENTITY, WEB_API_GET_ENTITIES, WEB_API_UPDATE_ENTITY } from '@/configs/apiPath';
import type { EntityRequestParams } from '@/services/commonTypes';
import clientWebApi from '@/services/clientWebApi';
import axios from 'axios';

const fetchDataFromTXTFile = (url: string) => axios.get(url);

const fetchDataFromJson = (url: string) => axios.get(url);

const fetchEntityFromJson = async (url: string) => {
  try {
    const res = await fetchDataFromJson(url);
    return res.data;
  } catch {
    return null;
  }
};
const getIds = async (txt_file: string) => {
  try {
    const res = await fetchDataFromTXTFile(txt_file);
    const ids = res.data.split('\n');
    return ids.map((id: string) => id.slice(0, -1));
  } catch {
    return [];
  }
};
export const fetchEntities = (params: EntityRequestParams) =>
  clientWebApi.get(WEB_API_GET_ENTITIES, { params });

export const fetchEntitiesOffline = async (slug: string, type: string) => {
  const url = '/data3D/gltf/ids/' + slug + '_' + type + '_ids.txt';
  const ids = await getIds(url);
  const objs = [];
  for (const id of ids) {
    const url_json = '/data3D/gltf/formattedJson/' + slug + '/' + id + '.json';
    const obj = await fetchEntityFromJson(url_json);
    if (obj) objs.push(obj);
  }
  return objs;
};

export const fetchInfoDetailEntity = (url: string) => axios.get(url);

export const fetchEntity = (entityId: string) => clientWebApi.get(`${WEB_API_ENTITY}${entityId}`);

export const updateEntity = (data: any) =>
  clientWebApi.post(`${WEB_API_UPDATE_ENTITY}${data.id}/attrs`, data);
