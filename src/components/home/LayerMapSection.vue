<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white font-medium text-sm">Các lớp bản đồ</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="store.changeActiveTool()"
        />
      </div>

      <div class="mx-5">
        <a-input
          placeholder="Tìm kiếm"
          class="bg-[#353535]"
          v-model:value="searchValue"
        >
          <template #prefix>
            <IconSearchInput />
          </template>
        </a-input>
      </div>

      <div
        class="overflow-auto mr-2 mt-2"
        v-if="BASE_MAPS.length > 0"
      >
        <ul class="w-full p-0 list-none">
          <li
            :class="['flex flex-col pl-5 pt-2 group', item.id === activeId && 'bg-[#333333]']"
            v-for="(item, index) in BASE_MAPS"
            :key="index"
          >
            <div class="flex flex-row">
              <img
                :src="
                  item.preview_image !== '' ? item?.preview_image : '/images/baseMap/no_image.png'
                "
                alt="layer-map"
                width="78"
                height="59"
                class="border border-solid border-[#6D6D6D] rounded-sm cursor-pointer"
                @click="onClickItem(item)"
              />
              <div class="flex flex-row justify-between w-full">
                <div class="flex flex-col pl-3.5">
                  <div
                    @click="onClickItem(item)"
                    class="cursor-pointer"
                  >
                    <IconPublic />
                    <label
                      :class="[
                        'text-sm text-[#C0C0C0] font-medium ml-1 cursor-pointer',
                        item.id === activeId ? 'text-main' : 'group-hover:text-white',
                      ]"
                    >
                      {{ item?.name }}
                    </label>
                  </div>
                  <a-typography-text class="text-[#C0C0C0] text-xs mt-0.5 text-date font-normal">
                    {{ item?.description }}
                  </a-typography-text>
                </div>
              </div>
              <a-dropdown
                placement="bottomLeft"
                :arrow="{ pointAtCenter: true }"
              >
                <a-button
                  :icon="h(IconThreeDot)"
                  type="ghost"
                  class="m-0 p-0 border-0 leading-none h-3.5 mt-1"
                />
              </a-dropdown>
            </div>
            <div class="h-px w-full bg-[#373737] mt-3" />
          </li>
        </ul>
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
        class="group flex justify-center items-center bg-[#222222] border border-dashed border-[#86001D] text-sm text-[#BBBBBB] m-4 mt-3"
        @click="showModalAddLayer = true"
      >
        <IconAddLayer class="mr-1.5 group-hover:hidden block" />
        <IconAddLayerActive class="mr-1.5 hidden group-hover:block" />
        Thêm mới lớp bản đồ
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconAddLayer from '@/components/icons/home/IconAddLayer.vue';

import { useMapStore } from '@/stores/map';
import IconSearchInput from '@/components/icons/home/IconSearchInput.vue';

import IconAddLayerActive from '@/components/icons/home/IconAddLayerActive.vue';

import IconEmpty from '@/components/icons/home/IconEmpty.vue';
import IconPublic from '@/components/icons/home/IconPublic.vue';

import IconThreeDot from '@/components/icons/IconThreeDot.vue';
import { changeBaseMap } from '@/DTP_3D/module/map';
import { BASE_MAPS } from '@/DTP_3D/config/MapConfig';

const store = useMapStore();
const activeId = ref<string>('');
const searchValue = ref<string>('');

const showModalAddLayer = ref(false);

const onClickItem = (basemapLayer) => {
  activeId.value = basemapLayer.id;
  changeBaseMap(basemapLayer);
};
</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 462px;
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
