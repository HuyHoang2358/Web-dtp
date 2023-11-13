import store from '@/store';
import type { Point } from '@/DTP_3D/type/DTP3D.type';
import * as Cesium from 'cesium';

export function formatTimeNumber(num: number) {
  return String(num).padStart(2, '0');
}

export function innerText(html_element_id: string, inner_text: string) {
  const el = document.getElementById(html_element_id);
  if (el) el.innerText = inner_text;
}

export function hiddenHTMLElementByClassName(element_class: string) {
  const elements = document.getElementsByClassName(element_class);
  // @ts-ignore
  for (let i = 0; i < elements.length; i++) elements[i].style.display = 'none';
}

export function getViewer() {
  return store.getters['VIEWER/getViewer'];
}

export function formatDistance(num: number) {
  if (num < 1000) return num.toFixed(2) + ' m';
  else return (num / 1000).toFixed(2) + ' km';
}
export function distanceBetweenTwoPoint(point1: Point, point2: Point) {
  const point1_cart3 = Cesium.Cartesian3.fromDegrees(point1.lng, point1.lat, point1.height);
  const point2_cart3 = Cesium.Cartesian3.fromDegrees(point2.lng, point2.lat, point2.height);
  return Cesium.Cartesian3.distance(point1_cart3, point2_cart3);
}

export function get_position(movement_position: any) {
  const viewer = getViewer();
  const cartesian = viewer.camera.pickEllipsoid(movement_position, viewer.scene.globe.ellipsoid);
  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitude = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(6));
    const latitude = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(6));
    return {
      latitude: latitude,
      longitude: longitude,
    };
  }
  return null;
}
