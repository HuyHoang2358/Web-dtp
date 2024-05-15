<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white text-sm font-bold"> Danh sách lộ trình</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="store.changeActiveTool()"
        />
      </div>
      <div class="h-px w-full bg-[#373737]" />
      <div class="px-4 py-2 text-white flex flex-col text-[13px]" >
        <div
          class="mt-2 mb-2 flex justify-between items-center bg-[#353535] p-2 rounded w-full"
          @click="routeController.onclickProtectTask(protectTask.id)"
          v-for="(protectTask) in protectTasks"
          :key="'protect-route-'+protectTask.id"
        >
          <p class="mb-0">{{protectTask?.route?.name}}</p>
          <div class="w-4 h-4">
            <icon-camera />
          </div>
        </div>

        <!-- Add route protect-->
        <div class="w-full">
          <a-button type="ghost"
            class="pl-0 py-1.5 rounded w-full flex justify-start items-center text-sm text-[#BBBBBB] border-0"
          >
            <IconAddLayerActive class="mr-1.5" />
            Thêm lộ trình
          </a-button>
        </div>

        <!-- Route tools -->
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
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="clickTrackingBtn()"
            >
              Theo dõi
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="routeController.turnOnBuilding()"
            >
              Bản đồ địa hình
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="routeController.turnOnTraffic()"
            >
              Bản đồ giao thông
            </button>
          </a-col>
          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="routeController.turnOnTunnel()"
            >
              Bản đồ hầm hào
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="policeController.turnOnPolice()"
            >
              Vị trí cán bộ
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="posController.turnOnPosition()"
              >
              Vị trí đã trinh sát
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="routeController.clickDirectionBtn()"
            >
              Dẫn đường
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
import { computed, h } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import { useMapStore } from '@/stores/map';
import IconAddLayerActive from '@/components/icons/home/IconAddLayerActive.vue';
import { clickTrackingBtn, simulationRoute, stopSimulationRoute, trackingEntity } from '@/DTP_3D/module/simulation';
const store = useMapStore();
import routeController from '@/services/controller/routeController';
import policeController from '@/services/controller/policeController';
import posController from '@/services/controller/posController';
import { useTasks } from '@/services/hooks/useTask';
import { useTaskStore } from '@/stores/task';
import IconCamera from '@/components/icons/IconCamera.vue';


const {data} = useTasks("protect");

console.log(data?.value?.data);

const protectTasks = computed(() => {
  const tasks = data?.value?.data || [];
  const taskStore = useTaskStore();
  taskStore.protectTasks = tasks;
  console.log("tasks:", tasks)
  return tasks;
});


</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 495px;
}
</style>
