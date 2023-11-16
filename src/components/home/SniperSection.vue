<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white font-medium text-sm">Mô phỏng</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="closeSniper()"
        />
      </div>
      <div class="h-px w-full bg-[#373737]" />
      <div class="mx-2 my-2">
        <div class="flex justify-start gap-4 items-center">
          <a-typography-text
            :class="['text-white text-sm px-4 py-1 text-center', is_area && 'bg-red-300']"
            @click="is_area = !is_area"
          >
            Kiểm tra khu vực
          </a-typography-text>
          <a-typography-text
            :class="['text-white text-sm px-4 py-1 text-center', !is_area && 'bg-red-300']"
            @click="turnOnSniperX"
          >
            Tầm bắn ngắm
          </a-typography-text>
        </div>
        <div class="h-px w-full bg-[#373737] mt-2 mb-2" />
        <a-form
          ref="formRef"
          :model="formModel"
          layout="vertical"
          v-if="is_area"
        >
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="16">
              <div class="text-[#bebebe] py-1.5">Bán kính (m)</div>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="heading"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.radius"
                  :onChange="modifySniperConfig"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13"></a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="24">
              <a-form-item
                name="heading"
                label=""
                class="mb-0"
              >
                <a-slider
                  v-model:value="formModel.radius"
                  :onChange="modifySniperConfig"
                  :min="1"
                  :max="2500"
                  :step="0.25"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="16">
              <div class="text-[#bebebe] py-1.5">Thu hẹp góc (Độ)</div>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="heading"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.coneDegree"
                  :onChange="modifySniperConfig"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13"></a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="24">
              <a-form-item
                name="heading"
                label=""
                class="mb-0"
              >
                <a-slider
                  v-model:value="formModel.coneDegree"
                  :onChange="modifySniperConfig"
                  :min="0"
                  :max="89"
                  :step="0.5"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-form
          ref="formRef"
          :model="formModel"
          layout="vertical"
          v-if="!is_area"
        >
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="20">
              <div class="text-[#bebebe] py-1.5">Thay đổi điểm đích</div>
            </a-col>
            <a-col :span="4">
              <div @click="turnOnHandle()">
                <IconZoomIn />
              </div>
            </a-col>
            <a-col :span="13"></a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="16">
              <div class="text-[#bebebe] py-1.5">Khoảng cách (m)</div>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="heading"
                label=""
                class="mb-1"
              >
                <a-input
                  id="sniper_distance"
                  placeholder="0 m"
                  :value="distance"
                />
              </a-form-item>
            </a-col>
            <a-col :span="13"></a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="16">
              <div class="text-[#bebebe] py-1.5">Độ cao điểm đích (m)</div>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="heading"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.dstHeight"
                  :onChange="modifySniperXConfig"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13"></a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="24">
              <a-form-item
                name="heading"
                label=""
                class="mb-0"
              >
                <a-slider
                  v-model:value="formModel.dstHeight"
                  :onChange="modifySniperXConfig"
                  :min="0.1"
                  :max="50"
                  :step="0.1"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ComputedRef, h, ref, toRaw } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import { useMapStore } from '@/stores/map';
import { useSniperStore } from '@/stores/sniper';
import sniperController from '@/services/controller/sniperController';
import IconZoomIn from '@/components/icons/tools/IconZoomIn.vue';

const store = useMapStore();

const editingSniper = useSniperStore();
const sniperStore = useSniperStore();
interface FormModel {
  coneDegree?: number;
  radius: number;
  clockDegree?: number;
  dstHeight?: number;
}
const formRef = ref();

const is_area = ref<boolean>(true);
const formModel: ComputedRef<FormModel> = computed(() => {
  return editingSniper.modifyInfo;
});
const distance = computed(() => {
  return sniperStore.distance;
});

const modifySniperXConfig = () => {
  sniperController.modifySniperX(formModel.value.dstHeight);
};
const modifySniperConfig = () => {
  sniperController.modifySniper(formModel.value, is_area.value);
};
const turnOnSniperX = () => {
  is_area.value = !is_area.value;
  sniperController.turnOnSniperX();
};
const turnOnHandle = () => {
  sniperController.turnOnHandle();
};
const closeSniper = () => {
  store.changeActiveTool();
  sniperController.turnOffSniper();
};
</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 462px;
}
</style>
