import { addModelEntity, updateModelEntity } from '@/DTP_3D/module/entity';
import { useLibraryStore } from '@/stores/library';
import { LOCAL_GLTF_FOLDER } from '@/configs/mainConfig';
import { changePositionModelHandle } from '@/DTP_3D/module/handle/modelPositionHandle';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';
import { useMapStore } from '@/stores/map';
import { useEditingModel } from '@/stores/editingModel';

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
  editingModelStore.model_info = infoModel;
  updateModelEntity(editingModelStore.model_entity, infoModel);
}

export default {
  async moveModel() {
    await changePositionModelHandle();
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
    };
    editingModelStore.model_entity = addModelEntity(editingModelStore.model_info);
    editingModelStore.isOpen = true;
    editingModelStore.isEditing = false;
    const mapStore = useMapStore();
    mapStore.iconToolActive = ICON_TOOL_ACTIVE.EDIT_MODEL;
    await this.moveModel();
  },
  modifyPositionModelEntity(model_info: any) {
    const editingModelStore = useEditingModel();
    editingModelStore.model_info = model_info;
    updateModelEntity(editingModelStore.model_entity, editingModelStore.model_info);
  },
};
