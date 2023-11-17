import * as Cesium from 'cesium';
import { getViewer } from '@/DTP_3D/lib/common';
import type { Point } from '@/DTP_3D/type/DTP3D.type';

export function addLabelEntity(text: string, position: Point) {
  const viewer = getViewer();
  const label_entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(position.lng, position.lat, position.height),
    label: {
      text: text,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
      font: '6px Times New Roman',
      fillColor: Cesium.Color.WHITE,
      backgroundColor: Cesium.Color.RED.withAlpha(0.8),
      distanceDisplayCondition: 5000,
      height: 30,
    },
  });
  label_entity.label.showBackground = true;
  return label_entity;
}
export function updateHeightLabelEntity(labelEntity: any, info: any) {
  //.log(info.height);
  //console.log(typeof info.height);
  labelEntity.label.text = info.text;
  labelEntity.position = Cesium.Cartesian3.fromDegrees(info.lng, info.lat, info.height);
}
export function updateLabelEntity(labelEntity: any, LabelOption: any) {
  labelEntity.position = Cesium.Cartesian3.fromDegrees(
    LabelOption.lng,
    LabelOption.lat,
    LabelOption.height,
  );
  labelEntity.label.text = LabelOption.text;
  labelEntity.label.height = LabelOption.height;
}
