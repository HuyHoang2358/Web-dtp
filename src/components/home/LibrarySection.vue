<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white font-medium text-sm">Thư viện mô hình</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="store.changeActiveTool()"
        />
      </div>

      <div class="mx-5 w-full">
        <a-select
          v-model:value="model3D_type"
          placeholder="Chọn"
          :options="MODEL3D_TYPES"
          class="w-[90%]"
        >
          <template #suffixIcon>
            <IconCustomDropdown />
          </template>
        </a-select>
      </div>

      <div
        class="overflow-auto mr-2 mt-2"
        v-if="sample_models.length > 0"
      >
        <div class="grid grid-cols-3 items-center justify-center gap-1.5">
          <div
            class="col-span-1"
            v-for="(item, index) in sample_models"
            :key="index"
            @click="addModel(item)"
          >
            <img
              :src="item.preview_img !== '' ? item?.preview_img : '/images/baseMap/no_image.png'"
              alt="layer-map"
              height="90"
              class="border border-solid border-[#6D6D6D] rounded-sm cursor-pointer w-full"
            />
          </div>
        </div>
      </div>
      <div
        class="flex flex-1 flex-col justify-center items-center"
        v-else
      >
        <IconEmpty />
        <a-typography-text class="text-[#686868] font-medium text-[8px] mt-2.5">
          Không có dữ liệu
        </a-typography-text>
      </div>

      <a-button
        class="absolute bottom-0 left-0 ml-[18%] w-3/4 group flex justify-center items-center bg-[#222222] border border-dashed border-[#86001D] text-sm text-[#BBBBBB] m-4 mt-3"
        @click="showModalAddLayer = true"
      >
        <IconAddLayer class="mr-1.5 group-hover:hidden block" />
        <IconAddLayerActive class="mr-1.5 hidden group-hover:block" />
        Tải mô hình lên
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ComputedRef, h, ref } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconAddLayer from '@/components/icons/home/IconAddLayer.vue';

import { useMapStore } from '@/stores/map';
import IconAddLayerActive from '@/components/icons/home/IconAddLayerActive.vue';

import IconEmpty from '@/components/icons/home/IconEmpty.vue';

import { LIBRARY_MODELS, MODEL3D_TYPES } from '@/configs/constants';
import IconCustomDropdown from '@/components/icons/IconCustomDropdown.vue';
import libraryController from '@/services/controller/libraryController';

const store = useMapStore();

const model3D_type = ref<string>('building');

const showModalAddLayer = ref(false);

const sample_models: ComputedRef = computed(() => {
  if (model3D_type.value === '') return [];
  return LIBRARY_MODELS.filter((e) => e.type === model3D_type.value);
});
const addModel = (item: any) => {
  libraryController.addModel(item);
};
</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 495px;
}

.ant-dropdown .ant-dropdown-menu,
.ant-dropdown-menu-submenu .ant-dropdown-menu {
  background: rgba(21, 21, 21, 90%);
  border-radius: 5px;
  padding: 8px 20px 12px 20px;
}

img {
  border-radius: 1px;
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}

img:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
