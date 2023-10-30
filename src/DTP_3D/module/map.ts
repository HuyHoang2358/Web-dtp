import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import store from '@/store';
import { getViewer, hiddenHTMLElementByClassName } from '@/DTP_3D/lib/common';
import type { AreaMetaData, BaseMapLayer } from '@/DTP_3D/type/DTP3D.type';
import { flyTo } from '@/DTP_3D/module/camera';
import { DATA3D_TILES } from '@/DTP_3D/config/data3D';
import { addTileSet, visualizeModelEntity } from '@/DTP_3D/module/entity';
import { getNoTextureObjects, getTextureObjects } from '@/DTP_3D/api/entity';
import { createNameOverLay, stop_handle } from '@/DTP_3D/module/handle';

function getMapType(map_type: string) {
  return map_type.substring(0, 2);
}
function mountViewer(HTML_element_id: string) {
  return new Cesium.Viewer(HTML_element_id, {
    baseLayerPicker: true, //  type map
    vrButton: false,
    geocoder: false,
    navigationHelpButton: false,
    selectionIndicator: true,
    shadows: false,
    timeline: false,
    sceneModePicker: false, // type show map
    animation: true,
    fullscreenButton: false,
  });
}

// Export Function
export async function initMap(HTML_element_id: string) {
  const viewer = mountViewer(HTML_element_id);
  // @ts-ignore
  viewer.cesiumWidget.creditContainer.parentNode.removeChild(viewer.cesiumWidget.creditContainer);
  await store.dispatch('VIEWER/setViewer', viewer);
  hiddenHTMLElementByClassName('cesium-viewer-fullscreenContainer');
  hiddenHTMLElementByClassName('cesium-viewer-animationContainer');
  hiddenHTMLElementByClassName('cesium-viewer-toolbar');

  const nameOverLay = createNameOverLay();
  await store.dispatch('VIEWER/setNameOverLay', nameOverLay);
  stop_handle(viewer.screenSpaceEventHandler);
}

export async function changeBaseMap(baseMapLayer: BaseMapLayer) {
  const viewer = getViewer();
  // @ts-ignore
  const new_baseMapLayer = new Cesium.UrlTemplateImageryProvider(baseMapLayer.options);
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(new_baseMapLayer);
}

export function fullscreen() {
  Cesium.Fullscreen.requestFullscreen(document.body);
}

export function exitFullscreen() {
  Cesium.Fullscreen.exitFullscreen();
}

export function setDefaultMap() {
  const viewer = getViewer();
  store.getters['VIEWER/getTileset'].forEach((tile: any) => {
    tile.tileset.show = false;
  });
  viewer.entities.removeAll();
  /*store.getters['VIEWER/getEntities'].forEach((entity: any) => {
    entity.entity.show = false;
  });*/
}

export async function turnOnArea(area: AreaMetaData, isDefault = true) {
  if (isDefault) setDefaultMap();
  flyTo(area.center_point);
  switch (getMapType(area.type_key)) {
    case '2D':
      break;
    case '3D':
      //draw_polygon();
      if (area.type_data === 'tile') {
        // Tile
        const data_tile = DATA3D_TILES.find((e) => e.area_id === area.id);
        if (data_tile) {
          let tileInStore = store.getters['VIEWER/getTileset'].find((e: any) => e.id === area.id);
          if (!tileInStore) {
            const tileset = await addTileSet(data_tile);
            tileInStore = { ...area, tileset: tileset };
            await store.dispatch('VIEWER/pushTile', tileInStore);
          }
          tileInStore.tileset.show = true;
        }
      } else {
        let objs = null;
        if (area.type_key.includes('NO')) {
          // No Texture
          objs = await getNoTextureObjects(area);
        } else {
          // Text ture
          objs = await getTextureObjects(area);
        }

        //console.log('OBJs', objs);
        for (const obj of objs) {
          const entity = visualizeModelEntity(obj.model);
          await store.dispatch('VIEWER/pushEntity', { info: obj, entity: entity });
        }
      }
      break;
    case '4D':
      break;
    default:
      break;
  }
}
