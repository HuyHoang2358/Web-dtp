<template>
  <div
    class="absolute top-0 left-0 h-screen w-screen bg-red-500 z-10"
    ref="element"
  >
    <div
      id="cesiumContainer"
      ref="cesiumContainer"
      class="w-full h-full"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { initMapView } from '@/DTP_3D/init';
import { handle_click_object } from '@/DTP_3D/module/handle';
import { turnOnArea } from '@/DTP_3D/module/map';
import { HANOI_CENTER_POINT } from '@/DTP_3D/config/mainConfig';
onMounted(async () => {
  await initMapView('cesiumContainer');
  handle_click_object();
  /* await turnOnArea({
    id: '2000000000000001212',
    name: 'Thành phố Hà Nội',
    description: 'Bản đồ 3D có texture khu vực TP. Hà Nội',
    type_key: '3D_TEXTURE',
    type_data: 'gltf',
    slug: 'hanoi',
    preview_image: '/images/preview/HaNoi_texture_preview.png',
    center_point: HANOI_CENTER_POINT,
    active: true,
  });*/
});
</script>
