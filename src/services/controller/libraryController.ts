import { addModelEntity, removeEntity, updateModelEntity } from '@/DTP_3D/module/entity';
import { useLibraryStore } from '@/stores/library';
import { LOCAL_GLTF_FOLDER } from '@/configs/mainConfig';
import { changePositionModelHandle } from '@/DTP_3D/module/handle/modelPositionHandle';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';
import { useMapStore } from '@/stores/map';
import { useEditingModel } from '@/stores/editingModel';
import {
  addLabelEntity,
  updateHeightLabelEntity,
  updateLabelEntity,
} from '@/DTP_3D/module/entity/label';
import { DOMAIN_GLB_STORAGE } from '@/configs/constants';

export type LibraryItem = {
  modelId: string;
  preview_img: string;
  type: string;
};

export type MousePosition = {
  lat: number;
  lng: number;
  height: number;
};

export function updatePositionModel(newPosition: MousePosition) {
  const editingModelStore = useEditingModel();
  const infoModel = editingModelStore.model_info;

  infoModel.latitude = newPosition.lat;
  infoModel.longitude = newPosition.lng;

  const infoLabel = {
    lat: newPosition.lat,
    lng: newPosition.lng,
    height: infoModel.pin_height,
    text: editingModelStore.label_text,
  };

  editingModelStore.model_info = infoModel;
  updateModelEntity(editingModelStore.model_entity, infoModel);
  if (editingModelStore.label_entity) updateLabelEntity(editingModelStore.label_entity, infoLabel);
}

export default {
  async moveModel() {
    await changePositionModelHandle();
  },
  async addCityObject(libraryItem: LibraryItem) {
    const editingModelStore = useEditingModel();
    editingModelStore.model_info = {
      name: "",
      description: "",
      city_id: "ha_noi",
      address: "",

      latitude: 0,
      longitude: 0,
      height: 0,

      model_code: libraryItem.modelId,
      model_url: `${DOMAIN_GLB_STORAGE}texture/${libraryItem.modelId}.glb`,
      scale:1,
      heading: 0,
      pitch: 0,
      roll: 0,
      type: libraryItem.type,
      is_show_name: 0,
      name_height: 30,
    }
    console.log("model_info", editingModelStore.model_info)
    editingModelStore.model_entity = addModelEntity(editingModelStore.model_info);
    editingModelStore.isOpen = true;
    editingModelStore.isEditing = false;

    const mapStore = useMapStore();
    mapStore.iconToolActive = ICON_TOOL_ACTIVE.EDIT_MODEL;
    await this.moveModel();
  },

  async addModel(libraryItem: LibraryItem) {
    const editingModelStore = useEditingModel();
    editingModelStore.model_info = {
      name: libraryItem.modelId,
      description: libraryItem.type,
      model_url: `${LOCAL_GLTF_FOLDER}/${libraryItem.modelId}.glb`,
      scale: 1,
      latitude: 0,
      longitude: 0,
      height: 0,
      heading: 0,
      pitch: 0,
      roll: 0,
      pin_height: 80,
      type: libraryItem.type,
    };
    editingModelStore.model_entity = addModelEntity(editingModelStore.model_info);

    const label_point = {
      lng: 0,
      lat: 0,
      height: 80,
    };
    if (libraryItem.type === 'building') {
      editingModelStore.label_text = 'Chưa có tên';
      editingModelStore.label_entity = addLabelEntity(editingModelStore.label_text, label_point);
    }

    editingModelStore.isOpen = true;
    editingModelStore.isEditing = false;

    const mapStore = useMapStore();
    mapStore.iconToolActive = ICON_TOOL_ACTIVE.EDIT_MODEL;
    await this.moveModel();
  },
  editModelEntity(entity: any, info: any) {
    const editingModelStore = useEditingModel();
    editingModelStore.isOpen = true;
    editingModelStore.isEditing = true;
    editingModelStore.model_entity = entity;
    editingModelStore.model_info = {
      name: info.name,
      description: 'building',
      model_url: `${LOCAL_GLTF_FOLDER}/${info.model_id}.glb`,
      scale: info.scale,
      latitude: info.latitude,
      longitude: info.longitude,
      height: info.height,
      heading: info.heading,
      pitch: info.pitch,
      roll: info.roll,
      pin_height: info.pin_height,
      type: info.type,
      id: info.id,
    };
    const label_point = {
      lat: info.latitude,
      lng: info.longitude,
      height: info.pin_height,
    };
    if (info.type === 'building') {
      editingModelStore.label_text = info.name;
      editingModelStore.label_entity = addLabelEntity(editingModelStore.label_text, label_point);
    }
  },
  modifyPositionModelEntity(model_info: any) {
    const editingModelStore = useEditingModel();
    editingModelStore.model_info = model_info;
    updateModelEntity(editingModelStore.model_entity, editingModelStore.model_info);
  },
  modifyPinEntity(model_info: any) {
    const editingModelStore = useEditingModel();
    const editInfo = {
      lat: model_info.latitude,
      lng: model_info.longitude,
      height: parseFloat(model_info.pin_height),
      text: model_info.name,
    };
    if (editingModelStore.label_entity)
      updateHeightLabelEntity(editingModelStore.label_entity, editInfo);
  },
  closeAll() {
    const editingModelStore = useEditingModel();
    //removeEntity(editingModelStore.model_entity);
    editingModelStore.model_entity = null;
    removeEntity(editingModelStore.label_entity);
    editingModelStore.label_entity = null;
  },
};
