<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white font-medium text-sm">Danh sách nhiệm vụ</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="offTaskSection"
        />
      </div>

      <div class="mx-5">
        <a-input
          placeholder=" Tìm kiếm nhiệm vụ"
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
        v-if="tasks.length > 0"
      >
        <ul class="w-full p-0 list-none">
          <li
            v-for="(item, index) in tasks"
            :class="['flex flex-col pl-5 pt-2 group', item.id === activeId && 'bg-[#333333]']"
            :key="index"
          >
            <div class="text-white text-sm">
              <p class="font-bold text-red-400 m-0">{{(index+1) +". "+ item.name}}</p>
              <p class="font-normal m-0 mt-1">
                Cán bộ: {{item.users.length}}
              </p>
              <p class="font-normal m-0 mt-1">
                Trạng thái: <span class="text-green-600">{{item.status}}</span>
              </p>
              <p class="font-normal">
                Mô tả: {{item.description}}
              </p>
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
        @click="showModalHandle = true"
      >
        <IconAddLayer class="mr-1.5 group-hover:hidden block" />
        <IconAddLayerActive class="mr-1.5 hidden group-hover:block" />
        Thêm mới nhiệm vụ
      </a-button>
    </div>
  </div>
  <ModalHandlePolice
    :open="showModalHandle"
    :close="closeModalHandle"
  />
</template>
<script setup lang="ts">
import { h, ref, computed } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconAddLayer from '@/components/icons/home/IconAddLayer.vue';
import { useMapStore } from '@/stores/map';
import IconSearchInput from '@/components/icons/home/IconSearchInput.vue';
import IconAddLayerActive from '@/components/icons/home/IconAddLayerActive.vue';
import IconEmpty from '@/components/icons/home/IconEmpty.vue';

import ModalHandlePolice from '@/components/home/ModalHandlePolice.vue';

import { useTasks } from '@/services/hooks/useTask';

const store = useMapStore();
const activeId = ref<string>('');
const searchValue = ref<string>('');

const showModalHandle = ref(false);

// TODO: Get Task list
const { data:resTasks } = useTasks();
const tasks = computed(() => {
  return resTasks?.value?.data || [];
});

const closeModalHandle = () => {
  showModalHandle.value = false;
};


const offTaskSection = () => {
  store.changeActiveTool();

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
