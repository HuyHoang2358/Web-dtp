<template>
  <div
    class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
  >
    <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
      <label class="text-white font-medium text-sm">Vị trí trinh sát</label>
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
          :class="['text-white text-sm px-4 py-1', !is_add && 'bg-red-300']"
          @click="is_add = !is_add"
        >
          Danh sách vị trí
        </a-typography-text>
        <a-typography-text
          :class="['text-white text-sm px-4 py-1', is_add && 'bg-red-300']"
          @click="is_add = !is_add"
        >
          Thêm mới vị trí
        </a-typography-text>
      </div>
      <div class="h-px w-full bg-[#373737] mt-2 mb-2" />

      <!-- Danh sách vị trí trinh sát -->
      <div
        v-if="!is_add"
        class="flex flex-col flex-1"
      >
        <div
          class="overflow-auto h-[400px]"
          v-if="reconnaissancePoints.length > 0"
        >
          <ul class="w-full p-0 list-none">
            <li
              :class="['flex flex-col pl-5 pt-2 group']"
              v-for="(item, index) in reconnaissancePoints"
              :key="index"
            >
              <div class="flex flex-row">
                <img
                  :src="item?.location_category?.icon_path !== '' ? item?.location_category?.icon_path : '/images/baseMap/no_image.png'"
                  alt="layer-map"
                  width="78"
                  height="59"
                  class="border border-solid border-[#6D6D6D] bg-white rounded-sm cursor-pointer"
                />
                <div class="flex flex-row justify-between w-full">
                  <div class="flex flex-col pl-3.5">
                    <div class="cursor-pointer">
                      <label :class="['text-sm text-red-400 font-bold ml-1 cursor-pointer']">
                          Trinh sát  mục tiêu
                      </label>
                      <p :class="['text-sm text-[#C0C0C0] font-medium ml-1 cursor-pointer']">
                        Trạng thái: <span class="text-green-600">{{ item?.status }}</span>
                     </p>
                    </div>
                  </div>
                </div>
                <a-button
                  :icon="h(IconTrash)"
                  type="ghost"
                  class="m-0 p-0 border-0 leading-none h-3.5 mt-1"
                  @click="onDeleteReconnaissancePoint(item.id)"
                />

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

      <!-- Thêm mới nhiệm vụ trinh sát -->
      <div
        v-else
        class="mx-2"
      >
        <a-form
          ref="formRef"
          :model="formModel"
          layout="vertical"
        >
          <a-row :gutter="[12, 12]" class="mt-1">
            <a-col :span="8">
              <div class="text-[#bebebe] py-1.5">Loại vị trí</div>
            </a-col>
            <a-col :span="16">
              <a-select
                v-model:value="formModel.position_type_id"
                placeholder="Chọn"
                :options="locationCategoryOptions"
                class="w-full"
              >
                <template #suffixIcon>
                  <IconCustomDropdown />
                </template>
              </a-select>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]" class="mt-1">
            <a-col :span="8">
              <div class="text-[#bebebe] py-1.5">Cán bộ</div>
            </a-col>
            <a-col :span="16">
              <a-select
                v-model:value="formModel.user_id"
                placeholder="Chọn"
                :options="policeOptions"
                class="w-full"
              >
                <template #suffixIcon>
                  <IconCustomDropdown />
                </template>
              </a-select>
            </a-col>
          </a-row>


          <a-row :gutter="[12, 12]">
            <!-- longitude -->
            <a-col :span="8">
              <a-form-item
                name="longitude"
                label="Kinh độ"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.position.longitude"
                  placeholder="Chọn kinh độ"
                />
              </a-form-item>
            </a-col>

            <!-- latitude -->
            <a-col :span="8">
              <a-form-item
                name="latitude"
                label="Vĩ độ"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.position.latitude"
                  placeholder="Chọn vĩ độ"
                />
              </a-form-item>
            </a-col>

            <!-- choose location -->
            <a-col :span="8">
              <a-form-item
                name="chooseLocation"
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
            class="mt-1"
          >
            <a-col :span="24"><div class="text-[#bebebe] py-1.5">Miêu tả</div></a-col>
            <a-col :span="24">
              <a-form-item
                name=""
                label=""
                class="mb-1"
              >
                <a-textarea
                  v-model:value="formModel.description"
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
import IconEmpty from '@/components/icons/home/IconEmpty.vue';
import IconCustomDropdown from '@/components/icons/IconCustomDropdown.vue';
import IconGPS from '@/components/icons/IconGPS.vue';
import IconUploadForm from '@/components/icons/IconUploadForm.vue';
import IconTrash from '@/components/icons/home/IconTrash.vue';
import { useEditingPos } from '@/stores/editingPos';
import posController from '@/services/controller/posController';
import { useAddNewTargetReconnaissance, useDeleteTargetReconnaissance, useTasks } from '@/services/hooks/useTask';
import { useLocationCategories } from '@/services/hooks/useLocation';
import { usePolices } from '@/services/hooks/usePolice';
import { getViewer } from '@/DTP_3D/lib/common';


const store = useMapStore();
const is_add = ref<boolean>(false);

// TODO: get task list
const { data, refetch } = useTasks('reconnaissance');
const tasks = computed(() => {
  return data.value?.data || [];
});
const reconnaissancePoints = computed(() => {
  let result : any[] = [];
  tasks.value.forEach((task: any) => {
    result = result.concat(task.target_reconnaissances);
  });
  return result;
});

// TODO: get location category
const {data: resLocationCategories} = useLocationCategories();
const locationCategories = computed(() => {
  return resLocationCategories.value?.data || [];
});
const locationCategoryOptions = computed(() => {
  return locationCategories.value.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});
const findLocationCategory = (id: number) => {
  return locationCategories.value.find((item: any) => item.id === id);
};

// TODO: get police list
const { data: resPolices } = usePolices();
const polices = computed(() => {
  return resPolices.value?.data || [];
});
const policeOptions = computed(() => {
  return polices.value.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
});

// TODO: Define form model
const formModel = ref({
  task_id: 2,
  position: {
    latitude: 0,
    longitude: 0,
    height: 0,
  },
  user_id: 1,
  position_type_id: 1,
  status: 'chuẩn bị',
  description: '',
  documents: '',
});

// TODO: modify pin location
const editingPosStore = useEditingPos();
const modifyPin = () => {
  const locationCategoryInfo = findLocationCategory(formModel.value.position_type_id);
  if (locationCategoryInfo) {
    editingPosStore.info =
      {
        ...formModel.value,
        pin: {
          color: locationCategoryInfo.color,
          cesium_icon: locationCategoryInfo.cesium_icon
        }
      };
  }
  posController.getPosition();
};
watch(editingPosStore.info, () => {
  formModel.value.position.latitude = editingPosStore.info.position.latitude;
  formModel.value.position.longitude = editingPosStore.info.position.longitude;
});


// TODO: Add new reconnaissance points
const { mutate } = useAddNewTargetReconnaissance();
const onSubmit = () => {
  mutate(formModel.value, {
    onSuccess: () => {
      posController.addSuccess();
      refetch();
      is_add.value = false;
    },
  });
};
// TODO: Remove reconnaissance point
const {mutate: deleteReconnaissancePoint} = useDeleteTargetReconnaissance();
const onDeleteReconnaissancePoint = (id: number) => {
  deleteReconnaissancePoint(id, {
    onSuccess: () => {
      refetch();
      getViewer().entities.removeAll()
      posController.turnOnPosition()
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
