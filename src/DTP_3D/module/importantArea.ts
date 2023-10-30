import { getViewer } from '@/DTP_3D/lib/common';
import store from '@/store';
import { setDefaultMap } from '@/DTP_3D/module/map';
import { setDefaultHandle } from '@/DTP_3D/module/handle';
import * as Cesium from 'cesium';

export async function stopDrawImportantArea() {
  const viewer = getViewer();

  const points = store.getters['AREA/getPointEntities'];
  for (let i = 0; i < points.length; i++) if (points[i]) viewer.entities.remove(points[i]);

  const route = store.getters['AREA/getPolygon'];
  if (route) viewer.entities.remove(route);

  await store.dispatch('AREA/clearPolygon');
  await store.dispatch('AREA/clearPoints');
  await store.dispatch('AREA/clearPointEntities');
  await setDefaultHandle();
  setDefaultMap();
}

export async function drawFootprintImportantAreas(areas: any) {
  const viewer = getViewer();
  for (let i = 0; i < areas.length; i++) {
    const area = areas[i];
    const points = new Array();
    area.footprint.coordinates[0].forEach((e: any) => {
      points.push(e[1]);
      points.push(e[0]);
    });
    if (points.length >= 8) {
      viewer.entities.add({
        name: area.id,
        description: 'importantArea',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray(points),
          material: Cesium.Color.RED.withAlpha(0.4), // Màu và độ trong suốt của polygon
        },
      });
    }
  }
}
