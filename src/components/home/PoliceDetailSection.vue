<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white font-medium text-sm">Thông tin chi tiết</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="store.policeDetail = false"
        />
      </div>

      <div class="overflow-auto m-4">
        <div class="flex flex-row items-center">
          <img
            :src="item.avatarUrl !== '' ? item?.avatarUrl : '/images/baseMap/no_image.png'"
            alt="layer-map"
            width="78"
            height="59"
            class="border border-solid border-[#6D6D6D] rounded-sm cursor-pointer"
          />
          <div class="flex flex-row justify-center w-full gap-2">
            <div>
              <ButtonTool
                :name="ICON_TOOL_ACTIVE.LOCATE"
                title="Xác định vị trí"
                class="w-8 h-10 p-1 pb-2"
                :on-click="flyToPos"
              >
                <IconGPS />
              </ButtonTool>
            </div>
            <div>
              <ButtonTool
                :name="ICON_TOOL_ACTIVE.LOCATE"
                title="Gọi điện"
                class="w-8 h-10 p-1 pb-2"
                :on-click="() => {}"
              >
                <IconCall />
              </ButtonTool>
            </div>
            <div>
              <ButtonTool
                :name="ICON_TOOL_ACTIVE.LOCATE"
                title="Nhắn tin"
                class="w-8 h-10 p-1 pb-2"
                :on-click="() => {}"
              >
                <IconMes />
              </ButtonTool>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-4">
          <div class="w-full">
            <div class="flex justify-between items-center text-base mt-1 text-date font-normal">
              <a-typography-text class="font-bold text-white">Họ và tên:</a-typography-text>
              <a-typography-text class="text-[#C0C0C0]">
                {{ item?.name }}
              </a-typography-text>
            </div>
          </div>
          <div class="w-full">
            <div class="flex justify-between items-center text-base mt-1 text-date font-normal">
              <a-typography-text class="font-bold text-white">Số điện thoại:</a-typography-text>
              <a-typography-text class="text-[#C0C0C0]">
                {{ item?.phone }}
              </a-typography-text>
            </div>
          </div>
          <div class="w-full">
            <div class="flex justify-between items-center text-base mt-1 text-date font-normal">
              <a-typography-text class="font-bold text-white">Ngày sinh:</a-typography-text>
              <a-typography-text class="text-[#C0C0C0]">
                {{ item?.birthday }}
              </a-typography-text>
            </div>
          </div>
          <div class="w-full">
            <div class="flex justify-between items-center text-base mt-1 text-date font-normal">
              <a-typography-text class="font-bold text-white">Mã số:</a-typography-text>
              <a-typography-text class="text-[#C0C0C0]">
                {{ item?.code }}
              </a-typography-text>
            </div>
          </div>
          <div class="w-full">
            <div class="flex justify-between items-center text-base mt-1 text-date font-normal">
              <a-typography-text class="font-bold text-white">Chức vụ:</a-typography-text>
              <a-typography-text class="text-[#C0C0C0]">
                {{ item?.position }}
              </a-typography-text>
            </div>
          </div>
          <div class="w-full">
            <div class="flex justify-between items-center text-base mt-1 text-date font-normal">
              <a-typography-text class="font-bold text-white">Tài liệu đính kèm:</a-typography-text>
              <a-typography-text class="text-[#C0C0C0]">Không có</a-typography-text>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, ref, watch } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';

import { useMapStore } from '@/stores/map';

import { ICON_TOOL_ACTIVE } from '@/configs/enums';

import ButtonTool from '@/components/home/ButtonTool.vue';
import IconGPS from '@/components/icons/IconGPS.vue';
import IconCall from '@/components/icons/IconCall.vue';
import IconMes from '@/components/icons/IconMes.vue';
import { flyTo } from '@/DTP_3D/module/camera';
const store = useMapStore();

const item = ref(store.policeDetailInfo);
watch(
  () => store.policeDetailInfo,
  () => {
    item.value = store.policeDetailInfo;
  },
);
const flyToPos = () => {
  flyTo({
    latitude: item.value.location.coordinates[1],
    longitude: item.value.location.coordinates[0],
    height: 1000,
  });
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
