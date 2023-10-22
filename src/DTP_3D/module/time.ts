import { getViewer } from '@/DTP_3D/lib/common';
import * as Cesium from 'cesium';
import { innerText, formatTimeNumber } from '@/DTP_3D/lib/common';
import { CLOCK_DATE_HTML_ELEMENT_ID, CLOCK_TIME_HTML_ELEMENT_ID } from '@/configs/elementId';

export function initClock() {
  const viewer = getViewer();
  viewer.animation.viewModel.timeFormatter = function (date: any) {
    const newDate = Cesium.JulianDate.toDate(date);
    const day = formatTimeNumber(newDate.getDate());
    const month = formatTimeNumber(newDate.getMonth() + 1);
    const year = newDate.getFullYear();
    const hh = formatTimeNumber(newDate.getHours());
    const mm = formatTimeNumber(newDate.getMinutes());
    const ss = formatTimeNumber(newDate.getSeconds());

    innerText(CLOCK_DATE_HTML_ELEMENT_ID, `${day}/${month}/${year}`);
    innerText(CLOCK_TIME_HTML_ELEMENT_ID, `${hh}:${mm}:${ss}`);
    return `${hh}:${mm}:${ss}`;
  };
  viewer.clock.shouldAnimate = true;
}
