import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import store from '@/store';
import { getViewer, hiddenHTMLElementByClassName } from '@/DTP_3D/lib/common';
import type { BaseMapLayer } from '@/DTP_3D/type/DTP3D.type';
import { flyTo } from '@/DTP_3D/module/camera';
import { DATA3D_TILES } from '@/DTP_3D/config/data3D';
import { addTileSet, visualizeModelEntity } from '@/DTP_3D/module/entity';

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
  store.getters['VIEWER/getTileset'].forEach((tile: any) => {
    tile.tileset.show = false;
  });
  store.getters['VIEWER/getEntities'].forEach((entity: any) => {
    entity.entity.show = false;
  });
}

export async function turnOnArea(area: any) {
  setDefaultMap();
  flyTo(area.center_point);
  switch (getMapType(area.type_key)) {
    case '2D':
      break;
    case '3D':
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
        // GLTF
        //  Texture
        const data_gltf: any = DATA3D_TILES.find((e) => e.area_id === area.id);
        if (data_gltf) {
          fetch(data_gltf.entities_id)
            .then((response) => response.text())
            .then((text) => {
              const objs = text.split('\n');
              objs.forEach((obj) => {
                fetch(`/data3D/gltf/json/${obj}.json`)
                  .then((response) => {
                    return response.json();
                  })
                  .then(async (data) => {
                    let model_id = obj;
                    if (area.type_key.includes('NO')) model_id = model_id + 'NO_Texture';
                    else model_id = model_id + 'Texture';

                    let entityStore = store.getters['VIEWER/getEntities'].find(
                      (e: any) => e.key === model_id,
                    );
                    if (!entityStore) {
                      const model = {
                        key: model_id,
                        id: obj,
                        longitude: data['result']['location']['lng'],
                        latitude: data['result']['location']['lat'],
                        height: 0,
                        heading: data?.result?.bearing || 0,
                        pitch: 0,
                        roll: 0,
                        scale: 1,
                      };
                      const entity_c = visualizeModelEntity(model, !area.type_key.includes('NO'));
                      entityStore = { ...model, entity: entity_c };
                      await store.dispatch('VIEWER/pushEntity', entityStore);
                    }
                    entityStore.entity.show = true;
                  });
              });
            });
        }
        // No texture

        console.log('3D - GLTF');
      }
      break;
    case '4D':
      break;
    default:
      break;
  }
}
