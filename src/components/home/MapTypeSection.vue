<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white font-medium text-sm">Khu vực đã lưu</label>
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

      <a-tabs
        v-model:activeKey="activeIndexTab"
        type="line"
        size="small"
        :tabBarGutter="16"
        class="flex"
      >
        <template #moreIcon>
          <IconThreeDot
            class="rotate-90"
            style="margin-bottom: -2.5px"
          />
        </template>
        <a-tab-pane
          v-for="item in MAP_TYPES"
          :key="item.key"
          :tab="item.name"
          :content="null"
        ></a-tab-pane>
      </a-tabs>

      <div
        class="overflow-auto mr-2 mt-2"
        v-if="areas.length > 0"
      >
        <ul class="w-full p-0 list-none">
          <li
            :class="'flex flex-col pl-5 pt-2 group'"
            v-for="(item, index) in areas"
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
                @click="onClickArea(item)"
              />
              <div class="flex flex-row justify-between w-full">
                <div class="flex flex-col pl-3.5">
                  <div
                    class="cursor-pointer"
                    @click="onClickArea(item)"
                  >
                    <IconPublic />
                    <label
                      class="text-sm text-[#C0C0C0] font-medium ml-1 cursor-pointer group-hover:text-white"
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
import { computed, ComputedRef, h, ref } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconAddLayer from '@/components/icons/home/IconAddLayer.vue';

import { useMapStore } from '@/stores/map';
import IconSearchInput from '@/components/icons/home/IconSearchInput.vue';

import IconAddLayerActive from '@/components/icons/home/IconAddLayerActive.vue';

import IconEmpty from '@/components/icons/home/IconEmpty.vue';

import { MAP_TYPES, AREAS } from '@/DTP_3D/config/MapConfig';
import IconThreeDot from '@/components/icons/IconThreeDot.vue';
import { changeBaseMap, turnOnArea } from '@/DTP_3D/module/map';
import IconPublic from '@/components/icons/home/IconPublic.vue';
import { HANOI_CENTER_POINT } from '@/DTP_3D/config/mainConfig';

const store = useMapStore();
const activeIndexTab = ref<string>('3D_NO_TEXTURE');
const activeId = ref<string>('');
const searchValue = ref<string>('');

const showModalAddLayer = ref(false);

const onClickItem = (basemapLayer: any) => {
  activeId.value = basemapLayer.id;
  changeBaseMap(basemapLayer);
};

/*watch(activeIndexTab, () => {
  console.log(activeIndexTab);
});*/
const onClickArea = (area: any) => {
  turnOnArea(area);
};

const areas: ComputedRef = computed(() => {
  if (activeIndexTab.value === '') return [];
  return AREAS.filter((e) => e.type_key === activeIndexTab.value && e.active);
});
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
