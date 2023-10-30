<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white text-sm font-bold">Thông tin lộ trình</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="store.changeActiveTool()"
        />
      </div>
      <div class="h-px w-full bg-[#373737]" />
      <div class="px-4 py-2 text-white flex flex-col text-[13px]">
        <p class="text-[14px]">Chiều dài lộ trình</p>
        <p
          class="bg-[#353535] p-2 rounded w-full"
          id="route_distance"
        >
          0 m
        </p>

        <p class="text-[14px] mt-4">Danh sách các điểm cần lưu ý</p>
        <div class="mt-2 mb-2 flex justify-between items-center bg-[#353535] p-2 rounded w-full">
          <p
            class="mb-0"
            id="route_distance"
          >
            + Ngã tư ...
          </p>
          <div class="w-4 h-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              style="fill: #d7d3d3"
              viewBox="0 0 576 512"
            >
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->
              <path
                d="M0 128c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm559.1-28.2c10.4 5.6 16.9 16.4 16.9 28.2v256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64-14.2-9.5V174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
              />
            </svg>
          </div>
        </div>
        <div class="mt-2 mb-2 flex justify-between items-center bg-[#353535] p-2 rounded w-full">
          <p
            class="mb-0"
            id="route_distance"
          >
            + Ngã ba ...
          </p>
          <div class="w-4 h-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              style="fill: #d7d3d3"
              viewBox="0 0 576 512"
            >
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->
              <path
                d="M0 128c0-35.3 28.7-64 64-64h256c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm559.1-28.2c10.4 5.6 16.9 16.4 16.9 28.2v256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64-14.2-9.5V174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
              />
            </svg>
          </div>
        </div>

        <div class="w-full">
          <a-button
            type="ghost"
            class="pl-0 py-1.5 rounded w-full flex justify-start items-center text-sm text-[#BBBBBB] border-0"
          >
            <IconAddLayerActive class="mr-1.5" />
            Thêm địa điểm cần chú ý
          </a-button>
        </div>
        <div class="h-px w-full bg-[#373737]" />
        <div class="text-white text-[13px] mt-4 pr-12">
          <p class="text-[14px]">Công cụ nâng cao</p>
        </div>
        <a-row :gutter="[12, 12]">
          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="simulationRoute()"
            >
              Thử nghiệm
              <br />
              lộ trình
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="trackingEntity()"
            >
              Tracking theo
              <br />
              GPS
            </button>
          </a-col>
          <a-col :span="12">
            <button class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600">
              Bố trí lực lượng
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="stopSimulationRoute()"
            >
              Tắt công cụ
            </button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { h } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import { useMapStore } from '@/stores/map';
import IconAddLayerActive from '@/components/icons/home/IconAddLayerActive.vue';
import { simulationRoute, stopSimulationRoute, trackingEntity } from '@/DTP_3D/module/simulation';
const store = useMapStore();
</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 462px;
}
</style>
