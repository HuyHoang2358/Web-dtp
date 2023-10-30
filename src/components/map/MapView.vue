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
onMounted(async () => {
  await initMapView('cesiumContainer');
  handle_click_object();
});
</script>
