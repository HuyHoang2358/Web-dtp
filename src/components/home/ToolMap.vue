<template>
  <div class="flex top-40 items-center left-4 absolute z-50">
    <div class="w-10">
      <!-- List 1 -->
      <div class="flex flex-col items-center w-10 bg-[#151515] bg-opacity-90 rounded-sm">

        <ButtonTool
          title="Lớp bản đồ"
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.LAYER"
        >
          <IconLayerActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.LAYER" />
          <IconLayerInactive v-else />
        </ButtonTool>

        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          title="Khu vực đã lưu"
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.MAP_TYPE"
        >
          <IconBookmark />
        </ButtonTool>

        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.MODEL"
          title="Thư viện mô hình 3D"
        >
          <Icon3DModel />
        </ButtonTool>




      </div>

      <!-- List 2 -->
      <div class="flex flex-col items-center w-10 bg-[#151515] bg-opacity-90 rounded-sm mt-2">
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.ZOOM_IN"
          title="Phóng to"
        >
          <IconZoomIn />
        </ButtonTool>
        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.ZOOM_OUT"
          title="Thu nhỏ"
        >
          <IconZoomOut />
        </ButtonTool>
<!--        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.SEARCH"
          :on-click="onClickIcon"
          title="Tìm kiếm"
        >
          <IconSearch />
        </ButtonTool>-->
        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.FULL_SCREEN"
          :on-click="onClickIcon"
          title="Xem full"
        >
          <IconFullScreen />
        </ButtonTool>
      </div>

      <!-- List 3 -->
      <div class="flex flex-col items-center w-10 bg-[#151515] rounded-sm bg-opacity-90 mt-2">

        <ButtonTool
          :name="ICON_TOOL_ACTIVE.TASK"
          :on-click="onClickIcon"
          title="Danh sách nhiệm vụ"
        >
          <IconTaskActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.TASK" />
          <IconTask v-else />
        </ButtonTool>
        <a-divider class="h-px m-0 bg-[#333333]" />

        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.IMPORTANT_LOCAL"
          title="Vị trí trinh sát"
        >
          <IconImportantPosActive
            v-if="store.iconToolActive === ICON_TOOL_ACTIVE.IMPORTANT_LOCAL"
          />
          <IconImportantPos v-else />
        </ButtonTool>

        <ButtonTool
          :name="ICON_TOOL_ACTIVE.POLYGON"
          :on-click="onClickIcon"
          title="Lộ trình"
        >
          <IconRouterActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.POLYGON" />
          <IconRouter v-else />
        </ButtonTool>
        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.POLICE"
          :on-click="onClickIcon"
          title="Danh sách cán bộ"
        >
          <IconPoliceActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.POLICE" />
          <IconPolice v-else />
        </ButtonTool>
        <!--        <ButtonTool
          :name="ICON_TOOL_ACTIVE.RULER"
          :on-click="onClickIcon"
          title="Đo diện tích"
        >
          <IconRulerActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.RULER" />
          <IconRuler v-else />
        </ButtonTool>-->
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.SNIPER"
          :on-click="onClickIcon"
          title="Trinh sát không gian"
        >
          <IconSniperActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.SNIPER" />
          <IconSniper v-else />
        </ButtonTool>
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.LOCATE"
          title="GPS"
          class="w-6 h-8 p-1 pb-2"
        >
          <IconGetLocate />
        </ButtonTool>
      </div>
    </div>
    <LayerMapSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.LAYER" />
    <MapTypeSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.MAP_TYPE" />
    <LibrarySection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.MODEL" />
    <ModelEditSection
      v-if="editingModelStore.isOpen && store.iconToolActive === ICON_TOOL_ACTIVE.EDIT_MODEL"
    />
    <SniperSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.SNIPER" />
    <RouteEditSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.POLYGON" />
    <ImportantAreaSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.MEASURING_HORIZONTAL" />

    <TaskSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.TASK" />

    <PoliceSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.POLICE" />
    <PoliceDetailSection
      v-if="store.iconToolActive === ICON_TOOL_ACTIVE.POLICE && store.policeDetail"
    />
    <ImportantPosSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.IMPORTANT_LOCAL" />
  </div>
</template>

<script setup lang="ts">
import IconZoomIn from '@/components/icons/tools/IconZoomIn.vue';
import IconZoomOut from '@/components/icons/tools/IconZoomOut.vue';
import IconFullScreen from '@/components/icons/tools/IconFullScreen.vue';
import ButtonTool from '@/components/home/ButtonTool.vue';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';
import LayerMapSection from '@/components/home/LayerMapSection.vue';
import { useMapStore } from '@/stores/map';

import IconLayerActive from '@/components/icons/tools/IconLayerActive.vue';
import IconLayerInactive from '@/components/icons/tools/IconLayerInactive.vue';
import IconBookmark from '@/components/icons/tools/IconBookmark.vue';
import { show_camera_position, zoom_in_map, zoom_out_map } from '@/DTP_3D/module/camera';
import { exitFullscreen, fullscreen } from '@/DTP_3D/module/map';
import Icon3DModel from '@/components/icons/Icon3DModel.vue';
import MapTypeSection from '@/components/home/MapTypeSection.vue';
import LibrarySection from '@/components/home/LibrarySection.vue';
import ModelEditSection from '@/components/home/ModelEditSection.vue';
import RouteEditSection from '@/components/home/RouteEditSection.vue';
import ImportantAreaSection from '@/components/home/ImportantAreaSection.vue';
import IconGetLocate from '@/components/icons/iconGetLocate.vue';
import { trackingGPS } from '@/controller/gps';
import { useEditingModel } from '@/stores/editingModel';
import IconSniper from '@/components/icons/IconSniper.vue';
import IconSniperActive from '@/components/icons/IconSniperActive.vue';
import IconRouter from '@/components/icons/IconRouter.vue';
import IconRouterActive from '@/components/icons/IconRouterActive.vue';
import SniperSection from '@/components/home/SniperSection.vue';
import sniperController from '@/services/controller/sniperController';
import IconPoliceActive from '@/components/icons/tools/IconPoliceActive.vue';
import IconPolice from '@/components/icons/tools/IconPolice.vue';
import PoliceSection from '@/components/home/PoliceSection.vue';
import policeController from '@/services/controller/policeController';
import taskController from '@/services/controller/taskController';
import PoliceDetailSection from '@/components/home/PoliceDetailSection.vue';
import IconImportantPos from '@/components/icons/IconImportantPos.vue';
import IconImportantPosActive from '@/components/icons/IconImportantPosActive.vue';
import ImportantPosSection from '@/components/home/ImportantPosSection.vue';
import IconTaskActive from '@/components/icons/IconTaskActive.vue';
import IconTask from '@/components/icons/IconTask.vue';
import TaskSection from '@/components/home/TaskSection.vue';
import posController from '@/services/controller/posController';

const store = useMapStore();
const editingModelStore = useEditingModel();



const onClickIcon = (name: ICON_TOOL_ACTIVE) => {
  switch (name) {
    case ICON_TOOL_ACTIVE.BOOKMARK:
      console.log(show_camera_position());
      break;
    case ICON_TOOL_ACTIVE.PRINTING:
      break;
    case ICON_TOOL_ACTIVE.ZOOM_IN:
      zoom_in_map();
      break;
    case ICON_TOOL_ACTIVE.ZOOM_OUT:
      zoom_out_map();
      break;
    case ICON_TOOL_ACTIVE.FULL_SCREEN:
      if (store.iconToolActive !== ICON_TOOL_ACTIVE.FULL_SCREEN) fullscreen();
      else exitFullscreen();
      break;
    case ICON_TOOL_ACTIVE.POLYGON:
      break;
    case ICON_TOOL_ACTIVE.IMPORTANT_LOCAL:
      posController.turnOnPosition();
      break;
    case ICON_TOOL_ACTIVE.SNIPER:
      sniperController.turnOnSniper();
      break;
    case ICON_TOOL_ACTIVE.POLICE:
      //DTP_DRAW.turnOnMeasurePolyline();
      policeController.turnOnPolice();
      break;
    case ICON_TOOL_ACTIVE.RULER:
      //DTP_DRAW.turnOnMeasurePolygon();
      break;
    case ICON_TOOL_ACTIVE.LOCATE:
      trackingGPS();
      break;
    case ICON_TOOL_ACTIVE.TASK:
      taskController.turnOnTask();
      break;
    default:
      break;
  }
  store.changeActiveTool(name);
};

// Init map
</script>
