<template>
  <div class="flex top-40 items-center left-4 absolute z-50">
    <div class="w-10">
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
        <!--        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.PRINTING"
          title="In file bản đồ"
        >
          <IconPrinting />
        </ButtonTool>-->
        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.MODEL"
          title="Đối tượng 3D"
        >
          <Icon3DModel />
        </ButtonTool>
      </div>
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
        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.SEARCH"
          :on-click="onClickIcon"
          title="Tìm kiếm"
        >
          <IconSearch />
        </ButtonTool>
        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.FULL_SCREEN"
          :on-click="onClickIcon"
          title="Xem full"
        >
          <IconFullScreen />
        </ButtonTool>
      </div>
      <div class="flex flex-col items-center w-10 bg-[#151515] rounded-sm bg-opacity-90 mt-2">
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.POLYGON"
          :on-click="onClickIcon"
          title="Vẽ Polygon"
        >
          <IconPolygonActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.POLYGON" />
          <IconPolygon v-else />
        </ButtonTool>
        <a-divider class="h-px m-0 bg-[#333333]" />
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.MEASURING_HORIZONTAL"
          :on-click="onClickIcon"
          title="Đo chiều dài"
        >
          <IconMeasuringHorizontalActive
            v-if="store.iconToolActive === ICON_TOOL_ACTIVE.MEASURING_HORIZONTAL"
          />
          <IconMeasuringHorizontal v-else />
        </ButtonTool>
        <ButtonTool
          :name="ICON_TOOL_ACTIVE.RULER"
          :on-click="onClickIcon"
          title="Đo diện tích"
        >
          <IconRulerActive v-if="store.iconToolActive === ICON_TOOL_ACTIVE.RULER" />
          <IconRuler v-else />
        </ButtonTool>
        <ButtonTool
          :on-click="onClickIcon"
          :name="ICON_TOOL_ACTIVE.UPLOAD"
          title="Upload"
        >
          <IconUpload />
        </ButtonTool>
      </div>
    </div>
    <LayerMapSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.LAYER" />
    <MapTypeSection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.MAP_TYPE" />
    <LibrarySection v-if="store.iconToolActive === ICON_TOOL_ACTIVE.MODEL" />
  </div>
</template>

<script setup lang="ts">
import IconZoomIn from '@/components/icons/tools/IconZoomIn.vue';
import IconZoomOut from '@/components/icons/tools/IconZoomOut.vue';
import IconSearch from '@/components/icons/tools/IconSearch.vue';
import IconFullScreen from '@/components/icons/tools/IconFullScreen.vue';
import IconPolygon from '@/components/icons/tools/IconPolygon.vue';
import IconRuler from '@/components/icons/tools/IconRuler.vue';
import ButtonTool from '@/components/home/ButtonTool.vue';
import { ICON_TOOL_ACTIVE } from '@/configs/enums';
import IconMeasuringHorizontal from '@/components/icons/tools/IconMeasuringHorizontal.vue';
import IconUpload from '@/components/icons/tools/IconUpload.vue';
import LayerMapSection from '@/components/home/LayerMapSection.vue';
import IconPolygonActive from '@/components/icons/tools/IconPolygonActive.vue';
import { useMapStore } from '@/stores/map';
import IconMeasuringHorizontalActive from '@/components/icons/tools/IconMeasuringHorizontalActive.vue';
import IconRulerActive from '@/components/icons/tools/IconRulerActive.vue';

import IconLayerActive from '@/components/icons/tools/IconLayerActive.vue';
import IconLayerInactive from '@/components/icons/tools/IconLayerInactive.vue';
import IconBookmark from '@/components/icons/tools/IconBookmark.vue';
import { show_camera_position, zoom_in_map, zoom_out_map } from '@/DTP_3D/module/camera';
import { exitFullscreen, fullscreen } from '@/DTP_3D/module/map';
import Icon3DModel from '@/components/icons/Icon3DModel.vue';
import MapTypeSection from '@/components/home/MapTypeSection.vue';
import LibrarySection from '@/components/home/LibrarySection.vue';

const store = useMapStore();

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
      console.log(show_camera_position());
      //DTP_DRAW.turnOnDrawPolygon();
      break;
    case ICON_TOOL_ACTIVE.MEASURING_HORIZONTAL:
      //DTP_DRAW.turnOnMeasurePolyline();
      break;
    case ICON_TOOL_ACTIVE.RULER:
      //DTP_DRAW.turnOnMeasurePolygon();
      break;
    default:
      break;
  }
  store.changeActiveTool(name);
};
</script>
