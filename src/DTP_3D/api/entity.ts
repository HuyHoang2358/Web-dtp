import type { AreaMetaData } from '@/DTP_3D/type/DTP3D.type';
import { IS_ONLINE } from '@/configs/mainConfig';
import { MODEL3D_TYPES } from '@/configs/constants';
import { fetchEntities, fetchEntitiesOffline, fetchEntity } from '@/services/apis/entiy';

export function reFormat(obj: any, is_texture: boolean) {
  if (obj) {
    let model_url = `/data3D/gltf/glb_texture/${obj.modelUrl}.glb`;
    if (!is_texture) model_url = `/data3D/gltf/glb/${obj.modelUrl}.glb`;
    return {
      id: obj.id,
      model: {
        model_url: model_url,
        model_id: obj.id,
        longitude: obj.location.coordinates[0],
        latitude: obj.location.coordinates[1],
        scale: obj.scale,
        height: 0,
        heading: obj.heading,
        pitch: obj.pitch,
        roll: obj.roll,
      },
      type: obj.type,
    };
  }
  return null;
}

function reFormatJson(obj: any, is_texture: boolean) {
  if (obj) {
    let model_url = `/data3D/gltf/glb_texture/${obj.model.model_id}.glb`;
    if (!is_texture) model_url = `/data3D/gltf/glb/${obj.model.model_id}.glb`;
    const new_obj = obj;
    new_obj.model.model_id = obj.id;
    new_obj.model.model_url = model_url;
    new_obj.model.longitude = obj.model.location.lon;
    new_obj.model.latitude = obj.model.location.lat;
    return new_obj;
  }
  return null;
}
export async function getObjectsById(ids: any) {
  const ans = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const res = await fetchEntity(id);
    const data = reFormat(res.data, true);
    ans.push(data);
  }

  return ans;
}
export async function getNoTextureObjects(area: AreaMetaData) {
  console.log('getNoTextureObjects', area);
  const entities = [];
  if (IS_ONLINE) {
    for (const type of MODEL3D_TYPES) {
      const res = await fetchEntities({ type: type.value, province: area.name });
      if (res.data.length > 0) {
        for (let i = 0; i <= res.data.length; i++) {
          const new_data = reFormat(res.data[i], false);
          if (new_data !== null) entities.push(new_data);
        }
      }
    }
  } else {
    for (const type of MODEL3D_TYPES) {
      const objs = await fetchEntitiesOffline(area.slug, type.value);
      objs.forEach((obj) => {
        const new_data = reFormatJson(obj, false);
        if (new_data) entities.push(new_data);
      });
    }
  }

  return entities;
}

export async function getTextureObjects(area: AreaMetaData) {
  console.log('getTextureObjects', area);
  const entities = [];
  if (IS_ONLINE) {
    for (const type of MODEL3D_TYPES) {
      const res = await fetchEntities({ type: type.value, province: area.name });
      if (res.data.length > 0) {
        for (let i = 0; i <= res.data.length; i++) {
          const new_data = reFormat(res.data[i], true);
          if (new_data !== null) entities.push(new_data);
        }
      }
    }
  }
  return entities;
}
