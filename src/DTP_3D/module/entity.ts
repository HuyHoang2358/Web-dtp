// @ts-ignore
import * as Cesium from 'cesium';
import { getViewer } from '@/DTP_3D/lib/common';

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
  domain = is_texture ? '/data3D/gltf/glb_texture/' : '/data3D/gltf/glb/';
  return `${domain}${model_id}.glb`;
}
export function visualizeModelEntity(model: any, is_texture: boolean) {
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
    name: model.id,
    description: 'building',
    position: position_info.position,
    orientation: position_info.orientation,
    model: {
      uri: prepare_model_url(model.id, is_texture),
      scale: model.scale,
      color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
      colorBlendAmount: 1,
    },
  });
}
