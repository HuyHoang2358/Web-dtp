<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white text-sm font-bold">Bố trí vị trí quan trọng</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="offAddImportantArea()"
        />
      </div>
      <div class="h-px w-full bg-[#373737]" />
      <div class="px-4 py-2 text-white flex flex-col text-[13px]">
        <a-form
          ref="formRef"
          :model="formModel"
          layout="vertical"
          v-if="is_add_important_position_form"
        >
          <a-row :gutter="[12, 12]">
            <a-col :span="24">
              <a-form-item
                name="modelId"
                label="ID Tòa nhà"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.modelId"
                  placeholder="Nhập Id model"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="24">
              <a-form-item
                name="name"
                label="Tên vị trí"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.name"
                  placeholder="Nhập Id model"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="24">
              <a-form-item
                name="bound"
                label="Phạm vi bán kính"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.bound"
                  placeholder="Nhập phạm vi bán kính"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <div class="flex justify-end items-center gap-2 mr-2 my-2">
            <a-button
              @click="offAddImportantArea()"
              class="bg-[#393939] border-[#393939] text-[#A9A9A9] font-medium text-xs"
            >
              Hủy bỏ
            </a-button>
            <a-button
              type="primary"
              @click="onSubmit"
              class="text-white font-medium text-xs"
            >
              Cập nhật
            </a-button>
          </div>
        </a-form>
        <div class="h-px w-full bg-[#373737]" />
        <div class="text-white text-[13px] mt-4 pr-12">
          <p class="text-[14px]">Công cụ nâng cao</p>
        </div>
        <a-row :gutter="[12, 12]">
          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="addImportantForm()"
            >
              Thêm vị trí
              <br />
              quan trọng
            </button>
          </a-col>

          <a-col :span="12">
            <button
              class="w-full bg-[#353535] text-white border-0 rounded py-2 hover:text-red-600"
              @click="showImportantAreas()"
            >
              Hiển thị các
              <br />
              vị trí quan trọng
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
              @click="offAddImportantArea()"
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
import { computed, ComputedRef, h, reactive, ref, toRaw } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import { useMapStore } from '@/stores/map';
import { handle_draw_polygon } from '@/DTP_3D/module/handle';
import store from '@/store';
import { useAddImportantArea, useImportantAreas } from '@/services/hooks/useArea';
import { notification } from 'ant-design-vue';
import { drawFootprintImportantAreas, stopDrawImportantArea } from '@/DTP_3D/module/importantArea';
import { fetchImportantAreas } from '@/services/apis/area';

const storeM = useMapStore();
const is_add_important_position_form = ref<boolean>(false);

const formModel = reactive({
  streetAddress: 'string',
  commune: 'string',
  district: 'string',
  province: 'string',
  description: 'string',
  footprint: {
    type: 'Polygon',
    coordinates: [
      [
        [100.0, 0.0],
        [101.0, 0.0],
        [101.0, 1.0],
        [100.0, 1.0],
        [100.0, 0.0],
      ],
    ],
  },
  modelId: '01_001_00004_building_20231024185000288386',
  modelUrl: '',
  name: 'string',
  bound: '50',
});
const { mutate } = useAddImportantArea();
const onSubmit = () => {
  const points = store.getters['AREA/getPoints'];
  let arr = [];
  for (let i = 0; i < points.length; i++) {
    arr.push([points[i].lat, points[i].lng]);
  }
  formModel.footprint.coordinates = [arr];
  console.log('values', toRaw(formModel));
  mutate(formModel, {
    onError: (error: any) => {
      notification.error({ message: error?.response?.data?.msg || error?.message });
    },
    onSuccess: () => {
      console.log('Success!');
    },
  });
};

const offAddImportantArea = () => {
  is_add_important_position_form.value = false;
  stopDrawImportantArea();
  storeM.changeActiveTool();
};
const addImportantForm = () => {
  is_add_important_position_form.value = true;
  handle_draw_polygon();
};

/*const { data: areas } = useImportantAreas();
const importantAreas: ComputedRef = computed(() => {
  console.log(areas);
  return areas.value?.data?.data || [];
});*/

const showImportantAreas = async () => {
  const res = await fetchImportantAreas();
  console.log(res);
  const areas = res?.data || [];
  console.log(areas);
  await drawFootprintImportantAreas(areas);
};
</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 462px;
}
</style>
