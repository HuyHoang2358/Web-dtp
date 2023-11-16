import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSniperStore = defineStore('sniper', () => {
  const sniperEntity = ref();
  const point = ref({
    lat: 0,
    lng: 0,
    height: 10,
  });
  const dstPoint = ref({
    lat: 0,
    lng: 0,
    height: 10,
  });
  const distance = ref('0 m');
  const clockVolume = ref({
    max: 0,
    min: 20,
  });
  const coneVolume = ref({
    max: 20,
    min: 0,
  });
  const radii = {
    x: 10,
    y: 10,
    z: 20,
  };
  const modifyInfo = {
    coneDegree: 0,
    radius: 1000,
    clockDegree: 0,
    dstHeight: 1,
  };

  return {
    sniperEntity,
    point,
    dstPoint,
    distance,
    clockVolume,
    coneVolume,
    radii,
    modifyInfo,
  };
});
