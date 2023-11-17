<template>
  <div
    class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
  >
    <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
      <label class="text-white font-medium text-sm">Ghim vị trí</label>
      <a-button
        class="bg-transparent border-0"
        :icon="h(IconCancel)"
        @click="store.changeActiveTool()"
      />
    </div>
    <div class="h-px w-full bg-[#373737]" />
    <div class="flex flex-col flex-1">
      <div class="flex justify-start gap-4 items-center">
        <a-typography-text
          :class="['text-white text-sm px-4 py-1', is_add && 'bg-red-300']"
          @click="is_add = !is_add"
        >
          Thông tin vị trí
        </a-typography-text>
        <a-typography-text
          :class="['text-white text-sm px-4 py-1', !is_add && 'bg-red-300']"
          @click="is_add = !is_add"
        >
          Thêm mới
        </a-typography-text>
      </div>
      <div class="h-px w-full bg-[#373737] mt-2 mb-2" />
      <div
        v-if="is_add"
        class="flex flex-col flex-1"
      >
        <div
          class="overflow-auto h-[400px]"
          v-if="rois.length > 0"
        >
          <ul class="w-full p-0 list-none">
            <li
              :class="['flex flex-col pl-5 pt-2 group']"
              v-for="(item, index) in rois"
              :key="index"
            >
              <div class="flex flex-row">
                <img
                  :src="item?.status !== '' ? item?.status : '/images/baseMap/no_image.png'"
                  alt="layer-map"
                  width="78"
                  height="59"
                  class="border border-solid border-[#6D6D6D] bg-white rounded-sm cursor-pointer"
                />
                <div class="flex flex-row justify-between w-full">
                  <div class="flex flex-col pl-3.5">
                    <div class="cursor-pointer">
                      <label :class="['text-sm text-[#C0C0C0] font-medium ml-1 cursor-pointer']">
                        {{ item?.name }}
                      </label>
                      <label :class="['text-sm text-[#C0C0C0] font-medium ml-1 cursor-pointer']">
                        {{ item?.note }}
                      </label>
                    </div>
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
      </div>
      <div
        v-else
        class="mx-2"
      >
        <a-form
          ref="formRef"
          :model="formModel"
          layout="vertical"
        >
          <a-select
            v-model:value="formModel.status"
            placeholder="Chọn"
            :options="POS_TYPES"
            class="w-full"
          >
            <template #suffixIcon>
              <IconCustomDropdown />
            </template>
          </a-select>
          <a-row :gutter="[12, 12]">
            <a-col :span="8">
              <a-form-item
                name="longitude"
                label="Kinh độ"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.longitude"
                  placeholder="Chọn kinh độ"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="latitude"
                label="Vĩ độ"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.latitude"
                  placeholder="Chọn vĩ độ"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="longitude"
                label="Chọn vị trí"
                class="w-full mb-1 flex justify-center"
              >
                <button
                  class="w-8 h-8 self-center"
                  @click="modifyPin"
                >
                  <IconGPS />
                </button>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[12, 12]"
            class="mt-2"
          >
            <a-col :span="6"><div class="text-[#bebebe] py-1.5">Tên vị trí</div></a-col>
            <a-col :span="18">
              <a-form-item
                name=""
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.name"
                  placeholder="Nhập tên vị trí"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[12, 12]"
            class="mt-1"
          >
            <a-col :span="6"><div class="text-[#bebebe] py-1.5">Ghi chú</div></a-col>
            <a-col :span="18">
              <a-form-item
                name=""
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.note"
                  placeholder="Thêm ghi chú"
                  class="h-24"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[12, 12]"
            class="mt-1"
          >
            <a-col :span="24">
              <a-form-item name="files">
                <a-upload-dragger
                  name="upload"
                  :multiple="true"
                >
                  <template #removeIcon>
                    <IconTrash class="text-main" />
                  </template>
                  <div class="flex flex-row items-center justify-center">
                    <IconUploadForm />
                    <a-typography-text class="text-white text-sm font-normal ml-2">
                      Tải file đính kèm
                    </a-typography-text>
                  </div>
                  <a-typography-text class="text-[#BEBEBE] font-normal text-xs">
                    File doc, txt, ppt, ...
                    <span class="text-main">*</span>
                  </a-typography-text>
                </a-upload-dragger>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div class="absolute bottom-0 right-0 mb-2">
          <div class="flex justify-end items-center gap-2 mr-2">
            <a-button
              @click="store.changeActiveTool()"
              class="bg-[#393939] border-[#393939] text-[#A9A9A9] font-medium text-xs"
            >
              Hủy bỏ
            </a-button>
            <a-button
              type="primary"
              @click="onSubmit"
              class="text-white font-medium text-xs"
            >
              Thêm vị trí
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h, ref, watch } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import { useMapStore } from '@/stores/map';
import IconThreeDot from '@/components/icons/IconThreeDot.vue';
import IconEmpty from '@/components/icons/home/IconEmpty.vue';
import { useAddNewRoi, useRois } from '@/services/hooks/useRoi';
import { POS_TYPES } from '@/configs/constants';
import IconCustomDropdown from '@/components/icons/IconCustomDropdown.vue';
import IconGPS from '@/components/icons/IconGPS.vue';
import IconUploadForm from '@/components/icons/IconUploadForm.vue';
import IconTrash from '@/components/icons/home/IconTrash.vue';
import { useEditingPos } from '@/stores/editingPos';
import posController from '@/services/controller/posController';
const store = useMapStore();
const is_add = ref<boolean>(true);
const { data } = useRois();
const rois = computed(() => {
  return data?.value?.data || [];
});

const formModel = ref({
  latitude: 0,
  longitude: 0,
  name: '',
  note: '',
  status: '/images/BCA/hotel.png',
  officerIds: [],
});
const editingPosStore = useEditingPos();

const modifyPin = () => {
  let newInfo = editingPosStore.info;
  newInfo.name = formModel.value.name;
  if (formModel.value.status === '/images/BCA/hospital.png') {
    newInfo.type = 'hospital.png';
    newInfo.colorId = 1;
  } else if (formModel.value.status === '/images/BCA/ca.png') {
    newInfo.type = 'star.png';
    newInfo.colorId = 2;
  } else {
    newInfo.type = 'town.png';
    newInfo.colorId = 0;
  }
  editingPosStore.info = newInfo;
  posController.getPosition();
};
watch(editingPosStore.info, () => {
  formModel.value.latitude = editingPosStore.info.lat;
  formModel.value.longitude = editingPosStore.info.lng;
});

const { mutate } = useAddNewRoi();
const onSubmit = () => {
  console.log(formModel.value);
  const data = {
    name: formModel.value.name,
    status: formModel.value.status,
    note: formModel.value.note,
    officerIds: [],
    location: {
      type: 'Point',
      coordinates: [formModel.value.longitude, formModel.value.latitude],
    },
  };
  mutate(data, {
    onError: (error: any) => {},
    onSuccess: () => {
      posController.addSuccess();
    },
  });
};
</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 495px;
}
</style>
