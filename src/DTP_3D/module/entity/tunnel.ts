import * as Cesium from 'cesium';
import { getViewer } from '@/DTP_3D/lib/common';
export const draw_tunnel = () => {
  const data = [
    {
      "lat": 21.040939,
      "lng": 105.834007
    },
    {
      "lat": 21.040939,
      "lng": 105.834007
    },
    {
      "lat": 21.040688,
      "lng": 105.834912
    },
    {
      "lat": 21.040593,
      "lng": 105.83495
    },
    {
      "lat": 21.040411,
      "lng": 105.835998
    },
    {
      "lat": 21.039342,
      "lng": 105.835736
    },
    {
      "lat": 21.039117,
      "lng": 105.835688
    },
    {
      "lat": 21.039283,
      "lng": 105.83449
    },
    {
      "lat": 21.038937,
      "lng": 105.833297
    },
    {
      "lat": 21.038645,
      "lng": 105.834106
    },
    {
      "lat": 21.038467,
      "lng": 105.833852
    },
    {
      "lat": 21.037805,
      "lng": 105.834435
    },
    {
      "lat": 21.036869,
      "lng": 105.834188
    },
    {
      "lat": 21.036716,
      "lng": 105.835033
    },
    {
      "lat": 21.035326,
      "lng": 105.834745
    },
    {
      "lat": 21.034132,
      "lng": 105.8345
    },
    {
      "lat": 21.033911,
      "lng": 105.835739
    },
    {
      "lat": 21.034941,
      "lng": 105.835962
    },
    {
      "lat": 21.034846,
      "lng": 105.836951
    },
    {
      "lat": 21.034887,
      "lng": 105.837124
    },
    {
      "lat": 21.03561,
      "lng": 105.836395
    },
    {
      "lat": 21.036472,
      "lng": 105.836525
    },
    {
      "lat": 21.036688,
      "lng": 105.835416
    },
    {
      "lat": 21.037528,
      "lng": 105.835633
    },
    {
      "lat": 21.038134,
      "lng": 105.835843
    },
    {
      "lat": 21.038134,
      "lng": 105.835843
    },
    {
      "lat": 21.038941,
      "lng": 105.836005
    },
    {
      "lat": 21.0388,
      "lng": 105.836848
    },
    {
      "lat": 21.039101,
      "lng": 105.836877
    },
    {
      "lat": 21.040197,
      "lng": 105.837056
    },
    {
      "lat": 21.041063,
      "lng": 105.837277
    },
    {
      "lat": 21.040921,
      "lng": 105.837815
    },
    {
      "lat": 21.03832,
      "lng": 105.83727
    },
    {
      "lat": 21.037348,
      "lng": 105.837006
    },
    {
      "lat": 21.037213,
      "lng": 105.838287
    },
    {
      "lat": 21.036777,
      "lng": 105.838232
    },
    {
      "lat": 21.036789,
      "lng": 105.836835
    },
    {
      "lat": 21.036597,
      "lng": 105.836956
    },
    {
      "lat": 21.035971,
      "lng": 105.837447
    },
    {
      "lat": 21.035429,
      "lng": 105.837413
    },
    {
      "lat": 21.034871,
      "lng": 105.837959
    },
    {
      "lat": 21.034654,
      "lng": 105.838303
    },
  ]
  const data1 = [
    {
      "lat": 21.036749,
      "lng": 105.834777
    },
    {
      "lat": 21.036749,
      "lng": 105.834777
    },
    {
      "lat": 21.036798,
      "lng": 105.834777
    },
    {
      "lat": 21.038165,
      "lng": 105.835195
    },
    {
      "lat": 21.038025,
      "lng": 105.836755
    },
    {
      "lat": 21.037863,
      "lng": 105.838411
    },
    {
      "lat": 21.039521,
      "lng": 105.838988
    },
    {
      "lat": 21.039873,
      "lng": 105.836308
    },
    {
      "lat": 21.040272,
      "lng": 105.834395
    },
    {
      "lat": 21.039435,
      "lng": 105.834241
    },
    {
      "lat": 21.03966,
      "lng": 105.833406
    },
    {
      "lat": 21.03842,
      "lng": 105.833007
    },
    {
      "lat": 21.038604,
      "lng": 105.831666
    }
  ]
  const positions = [];
  const positions1 = [];
  for (let i =0; i< data.length; i++){
    positions.push(data[i].lng);
    positions.push(data[i].lat);
    positions.push(-225)
    /*if (i<=1) positions.push(-1)
    else positions.push(-25);*/
  }
  for (let i =0; i< data1.length; i++){
    positions1.push(data1[i].lng);
    positions1.push(data1[i].lat);
    positions1.push(-235);
  }
  console.log(positions)
  const position =[
    105.834007,
    21.040939,
    3,
    105.834007,
    21.040939,
    3,
    105.834912,
    21.040688,
    0,
    105.83495,
    21.040593,
    0,
    105.835998,
    21.040411,
    0,
    105.835736,
    21.039342,
    0,
    105.835688,
    21.039117,
    0,
    105.83449,
    21.039283,
    0,
    105.833297,
    21.038937,
    0,
    105.834106,
    21.038645,
    0,
    105.833852,
    21.038467,
    0,
    105.834435,
    21.037805,
    0,
    105.834188,
    21.036869,
    0,
    105.835033,
    21.036716,
    0,
    105.834745,
    21.035326,
    0,
    105.8345,
    21.034132,
    0,
    105.835739,
    21.033911,
    0,
    105.835962,
    21.034941,
    0,
    105.836951,
    21.034846,
    0,
    105.837124,
    21.034887,
    0,
    105.836395,
    21.03561,
    0,
    105.836525,
    21.036472,
    0,
    105.835416,
    21.036688,
    0,
    105.835633,
    21.037528,
    0,
    105.835843,
    21.038134,
    0,
    105.835843,
    21.038134,
    0,
    105.836005,
    21.038941,
    0,
    105.836848,
    21.0388,
    0,
    105.836877,
    21.039101,
    0,
    105.837056,
    21.040197,
    0,
    105.837277,
    21.041063,
    0,
    105.837815,
    21.040921,
    0,
    105.83727,
    21.03832,
    0,
    105.837006,
    21.037348,
    0,
    105.838287,
    21.037213,
    0,
    105.838232,
    21.036777,
    0,
    105.836835,
    21.036789,
    0,
    105.836956,
    21.036597,
    0,
    105.837447,
    21.035971,
    0,
    105.837413,
    21.035429,
    0,
    105.837959,
    21.034871,
    0,
    105.838303,
    21.034654,
    0
  ]
  const viewer = getViewer();
  const scene = viewer.scene;
  const globe = scene.globe;
  scene.screenSpaceCameraController.enableCollisionDetection = false;

  const greenBox = viewer.entities.add({
    name: "Green box with beveled corners and outline",
    polylineVolume: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions),
      shape: [
        new Cesium.Cartesian2(-2, -2),
        new Cesium.Cartesian2(2, -2),
        new Cesium.Cartesian2(2, 2),
        new Cesium.Cartesian2(-2, 2),
      ],
      cornerType: Cesium.CornerType.BEVELED,
      material: Cesium.Color.GREEN.withAlpha(0.4),
      outline: true,
      outlineColor: Cesium.Color.GREEN,
    },
  });

  const redBox = viewer.entities.add({
    name: "Green box with beveled corners and outline",
    polylineVolume: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights(positions1),
      shape: [
        new Cesium.Cartesian2(-2, -2),
        new Cesium.Cartesian2(2, -2),
        new Cesium.Cartesian2(2, 2),
        new Cesium.Cartesian2(-2, 2),
      ],
      cornerType: Cesium.CornerType.BEVELED,
      material: Cesium.Color.RED.withAlpha(0.6),
      outline: true,
      outlineColor: Cesium.Color.RED,
    },
  });



}