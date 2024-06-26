// @ts-nocheck
import * as Cesium from 'cesium';
import { getViewer } from '@/DTP_3D/lib/common';
import store from '@/store';
import { draw_polygon } from '@/DTP_3D/module/polygon';
import { handle_move_get_position } from '@/DTP_3D/module/handle';
import type { ModelEntityInfo } from '@/DTP_3D/type/DTP3D.type';
import { SHOW_PIN_BUILDINGS } from '@/DTP_3D/config/data3D';
import { addLabelEntity } from '@/DTP_3D/module/entity/label';
import { DOMAIN_GLB_STORAGE } from '@/configs/constants';

function is_showPin(building_id) {
  for (let i = 0; i < SHOW_PIN_BUILDINGS.length; i++) {
    if (building_id === SHOW_PIN_BUILDINGS[i]) return true;
  }
  return false;
}
export function changeHeightTileset(tileset: any, heightOffset: any) {
  const boundingSphere = tileset.boundingSphere;
  const cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
  const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
  const offset = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    heightOffset,
  );
  const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}

export async function addTileSet(tile: any) {
  const viewer = getViewer();
  const tileset = await Cesium.Cesium3DTileset.fromUrl(tile.tileset_json_path, {
    preloadWhenHidden: false,
    maximumScreenSpaceError: 4,
    preferLeaves: true,
    //dynamicScreenSpaceError: true,
    /// dynamicScreenSpaceErrorDensity: 0.00278,
    //dynamicScreenSpaceErrorFactor: 4.0,
    //dynamicScreenSpaceErrorHeightFalloff: 0.25,
    //skipLevelOfDetail: true,
    show: true,
  });
  viewer.scene.primitives.add(tileset);
  if (tile.change_height > 0) changeHeightTileset(tileset, tile.change_height);
  viewer.zoomTo(tileset);
  return tileset;
}

function prepare_position(
  long: number,
  lat: number,
  height: number,
  heading: number,
  pitch: number,
  roll: number,
) {
  // heading, pitch, roll is degrees
  const position = Cesium.Cartesian3.fromDegrees(long, lat, height);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    position,
    new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(heading),
      Cesium.Math.toRadians(pitch),
      Cesium.Math.toRadians(roll),
    ),
  );
  return { position: position, orientation: orientation };
}

export function prepare_model_url(model_id: string, is_texture = false) {
  let domain = '';
  domain = is_texture ? '/data3D/gltf/texture/' : '/data3D/gltf/glb/';
  return `${domain}${model_id}.glb`;
}
export function visualizeModelEntity(model: any) {
  const viewer = getViewer();
  const position_info = prepare_position(
    model.longitude,
    model.latitude,
    model.height,
    model.heading,
    model.pitch,
    model.roll,
  );
  /*  if (model.footprint) {
    draw_polygon(model.footprint);
  }*/
  if (is_showPin(model.model_id)) {
    addLabelEntity(model.name, {
      lat: model.latitude,
      lng: model.longitude,
      height: model.pin_height,
    });
  }
  return viewer.entities.add({
    name: model.model_id,
    description: 'building',
    position: position_info.position,
    orientation: position_info.orientation,
    model: {
      uri: model.model_url,
      scale: model.scale,
    },
  });
}


// TODO: This function is visualize city Object in viewer
export function visualizeCityObj(obj: any) {
  const viewer = getViewer();
  const position_info = prepare_position(
    obj.position.longitude,
    obj.position.latitude,
    obj.position.height,
    obj.city_model.heading,
    obj.city_model.pitch,
    obj.city_model.roll,
  );

  return viewer.entities.add({
    name: obj.id,
    description: 'building',
    position: position_info.position,
    orientation: position_info.orientation,
    model: {
      uri: DOMAIN_GLB_STORAGE + obj.city_model.texture_model_url,
      scale:  obj.city_model.scale,
    },
  });
}

export function getInformationFromEntity(entity: any) {
  const viewer = getViewer();
  const position = entity.position.getValue(viewer.clock.currentTime);
  const cartographic = Cesium.Cartographic.fromCartesian(position);
  const latitude = Cesium.Math.toDegrees(cartographic.latitude);
  const longitude = Cesium.Math.toDegrees(cartographic.longitude);
  const height = cartographic.height;

  const orientation = entity.orientation.getValue();
  const hpr = new Cesium.HeadingPitchRoll(0, 0, 0);
  Cesium.HeadingPitchRoll.fromQuaternion(orientation, hpr);
  const heading = Cesium.Math.toDegrees(hpr.heading);
  //const pitch = Cesium.Math.toDegrees(hpr.pitch);
  //const roll = Cesium.Math.toDegrees(hpr.roll);
  const scale = entity.model.scale.getValue();
  //console.log(entity.name);
  return {
    model_id: entity.name,
    id: entity.name,
    latitude: latitude,
    longitude: longitude,
    height: height,
    heading: heading,
    pitch: 0,
    roll: 0,
    scale: scale,
  };
}

export function updateSelectingModel(mode_info: any) {
  const selectingModel = store.getters['VIEWER/getSelectedEntity'];
  const position_info = prepare_position(
    mode_info.longitude,
    mode_info.latitude,
    mode_info.height,
    mode_info.heading,
    mode_info.pitch,
    mode_info.roll,
  );
  selectingModel.position = position_info.position;
  selectingModel.orientation = position_info.orientation;
  selectingModel.model.scale = mode_info.scale;
}

/*
export function updateSelectingModelLL(lat, lng: any) {
  const selectingModel = store.getters['VIEWER/getSelectedEntity'];
  const position_info = prepare_position(lat, lng, 0, 0, 0, 0);
  selectingModel.position = position_info.position;
  selectingModel.orientation = position_info.orientation;
  selectingModel.model.scale = mode_info.scale;
}
*/

export async function addModel(model: any) {
  const viewer = getViewer();
  const position_info = prepare_position(
    model.longitude,
    model.latitude,
    model.height,
    model.heading,
    model.pitch,
    model.roll,
  );
  if (model.footprint) {
    draw_polygon(model.footprint);
  }
  const model_e = viewer.entities.add({
    name: model.model_id,
    description: 'building',
    position: position_info.position,
    orientation: position_info.orientation,
    model: {
      uri: model.model_url,
      scale: model.scale,
    },
  });
  await store.dispatch('VIEWER/setSelectedEntity', model_e);

  await handle_move_get_position();
}

export function updateModelEntity(model_entity: any, model_info: ModelEntityInfo) {
  //console.log(model_info);
  const position_info = prepare_position(
    model_info.longitude,
    model_info.latitude,
    parseFloat(model_info.height),
    model_info.heading,
    model_info.pitch,
    model_info.roll,
  );
  model_entity.position = position_info.position;
  model_entity.orientation = position_info.orientation;
  model_entity.model.scale = model_info.scale;
}

export function addModelEntity(model: ModelEntityInfo) {
  const viewer = getViewer();
  const position_info = prepare_position(
    model.longitude,
    model.latitude,
    model.height,
    model.heading,
    model.pitch,
    model.roll,
  );
  return viewer.entities.add({
    name: model.name,
    description: model.description,
    position: position_info.position,
    orientation: position_info.orientation,
    model: {
      uri: model.model_url,
      scale: model.scale,
    },
  });
}

export function removeEntity(entity) {
  const viewer = getViewer();
  if (entity) viewer.entities.remove(entity);
}
