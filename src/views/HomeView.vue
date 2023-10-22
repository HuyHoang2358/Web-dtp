<template>
  <div
    class="h-screen w-screen"
    id="main-app"
  >
    <HeaderApp />
    <ToolMap />
    <MapView />
  </div>
</template>
<script setup lang="ts">
import HeaderApp from '@/components/home/HeaderApp.vue';
import ToolMap from '@/components/home/ToolMap.vue';
import MapView from '@/components/map/MapView.vue';
</script>
