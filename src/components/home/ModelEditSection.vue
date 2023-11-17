<template>
  <div class="flex flex-row">
    <div
      class="flex flex-col bg-[#151515] border border-solid rounded-sm border-[#2F2F2F] bg-opacity-90 add-layer-map-container"
    >
      <div class="flex items-center flex-row justify-between py-2 pl-5 pr-1">
        <label class="text-white font-medium text-sm">{{ titleForm }}</label>
        <a-button
          class="bg-transparent border-0"
          :icon="h(IconCancel)"
          @click="store.changeActiveTool()"
        />
      </div>
      <div class="h-px w-full bg-[#373737]" />
      <div class="mx-2 my-2">
        <div class="flex justify-start gap-4 items-center">
          <a-typography-text
            :class="['text-white text-sm px-4 py-1', is_modify_position_form && 'bg-red-300']"
            @click="is_modify_position_form = !is_modify_position_form"
          >
            Thông tin vị trí
          </a-typography-text>
          <a-typography-text
            :class="['text-white text-sm px-4 py-1', !is_modify_position_form && 'bg-red-300']"
            @click="is_modify_position_form = !is_modify_position_form"
          >
            Thông tin mô hình
          </a-typography-text>
        </div>
        <div class="h-px w-full bg-[#373737] mt-2 mb-2" />
        <a-form
          ref="formRef"
          :model="formModel"
          layout="vertical"
          v-if="is_modify_position_form"
        >
          <a-row :gutter="[12, 12]">
            <a-col :span="8"><div class="text-[#bebebe] py-1.5">Tên tòa nhà</div></a-col>
            <a-col :span="16">
              <a-form-item
                name=""
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.name"
                  placeholder="Nhập tên tòa nhà"
                  aria-readonly="true"
                  :onChange="changePinInfo"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[12, 12]">
            <a-col :span="8">
              <a-form-item
                name="longitude"
                label="Kinh độ"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.longitude"
                  :onChange="changeModelInfo"
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
                  :onChange="changeModelInfo"
                  placeholder="Chọn vĩ độ"
                />
              </a-form-item>
            </a-col>
            <!--            <a-col :span="8">
              <a-form-item
                name="height"
                label="Độ cao"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.height"
                  :onChange="changeModelInfo"
                  placeholder="Nhập độ cao"
                />
              </a-form-item>
            </a-col>-->
            <a-col :span="8">
              <a-form-item
                name="height"
                label="Di chuyển"
                class="mb-1"
              >
                <button @click="libraryController.moveModel">Location</button>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="5">
              <div class="text-[#bebebe] py-1.5">Heading</div>
            </a-col>
            <a-col :span="6">
              <a-form-item
                name="heading"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.heading"
                  :onChange="changeModelInfo"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13">
              <a-form-item
                name="heading"
                label=""
                class="mb-0"
              >
                <a-slider
                  v-model:value="formModel.heading"
                  :onChange="changeModelInfo"
                  :min="-180"
                  :max="180"
                  :step="0.1"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="5"><div class="text-[#bebebe] py-1.5">Pitch</div></a-col>
            <a-col :span="6">
              <a-form-item
                name="Pitch"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.pitch"
                  :onChange="changeModelInfo"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13">
              <a-form-item
                name="Pitch"
                label=""
                class="mb-0"
              >
                <a-slider
                  v-model:value="formModel.pitch"
                  :onChange="changeModelInfo"
                  :min="-180"
                  :max="180"
                  :step="0.5"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="5"><div class="text-[#bebebe] py-1.5">Roll</div></a-col>
            <a-col :span="6">
              <a-form-item
                name="Roll"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.roll"
                  :onChange="changeModelInfo"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13">
              <a-form-item
                name="Roll"
                label=""
                class="mb-0"
              >
                <a-slider
                  v-model:value="formModel.roll"
                  :onChange="changeModelInfo"
                  :min="-180"
                  :max="180"
                  :step="0.5"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="5"><div class="text-[#bebebe] py-1.5">Scale</div></a-col>
            <a-col :span="6">
              <a-form-item
                name="Scale"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.scale"
                  :onChange="changeModelInfo"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13">
              <a-form-item
                name="Scale"
                label=""
                class="mb-1"
              >
                <a-slider
                  v-model:value="formModel.scale"
                  :onChange="changeModelInfo"
                  :min="0"
                  :max="2"
                  :step="0.01"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row
            :gutter="[4, 4]"
            class="mt-2"
          >
            <a-col :span="5"><div class="text-[#bebebe] py-1.5">Pin</div></a-col>
            <a-col :span="6">
              <a-form-item
                name="pin_height"
                label=""
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.pin_height"
                  :onChange="changePinInfo"
                  placeholder="..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="13">
              <a-form-item
                name="pin_height"
                label=""
                class="mb-0"
              >
                <a-slider
                  v-model:value="formModel.pin_height"
                  :onChange="changePinInfo"
                  :min="1"
                  :max="500"
                  :step="1"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-form
          ref="formRef"
          :model="formModel"
          layout="vertical"
          v-else
        >
          <a-row :gutter="[12, 12]">
            <a-col :span="12">
              <a-form-item
                name="name"
                label="Tên tòa nhà"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.name"
                  placeholder="Nhập tên tòa nhà"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                name="function"
                label="Chức năng"
                class="mb-1"
              >
                <a-select
                  v-model:value="formModel.function"
                  placeholder="Chọn"
                  :options="HOUSE_FUNCTIONS"
                >
                  <template #suffixIcon>
                    <IconCustomDropdown />
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="8">
              <a-form-item
                name="area"
                label="Diện tích"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.area"
                  placeholder="Nhập diện tích thửa đất"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="house_height"
                label="Chiều cao"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.house_height"
                  placeholder="Nhập chiều cao"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="house_height"
                label="Số tầng"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.floor"
                  placeholder="Nhập số tầng"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="12">
              <a-form-item
                name="address"
                label="Số nhà, đường"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.streetAddress"
                  placeholder="Nhập số nhà, đường"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                name="commune"
                label="Phường/Xã"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.commune"
                  placeholder="Nhập phường/xã"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[12, 12]">
            <a-col :span="12">
              <a-form-item
                name="district"
                label="Quận/ Huyện"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.district"
                  placeholder="Nhập quận, huyện"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                name="province"
                label="Tỉnh/Thành Phố"
                class="mb-1"
              >
                <a-input
                  v-model:value="formModel.province"
                  placeholder="Nhập tỉnh/thành phố"
                  aria-readonly="true"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>

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
            Cập nhật
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ComputedRef, h, ref, toRaw } from 'vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import { useMapStore } from '@/stores/map';
import { useAddEntity, useUpdateEntity } from '@/services/hooks/useEntity';
import { notification } from 'ant-design-vue';
import IconCustomDropdown from '@/components/icons/IconCustomDropdown.vue';
import { HOUSE_FUNCTIONS } from '@/configs/constants';
import { useEditingModel } from '@/stores/editingModel';
import libraryController from '@/services/controller/libraryController';

const store = useMapStore();

const editingModelStore = useEditingModel();

const titleForm = computed(() => {
  if (editingModelStore.isEditing) return 'Chỉnh sửa thông tin mô hình';
  return 'Thêm mới thông tin mô hình';
});
interface FormModel {
  id?: string;
  model_url: string;
  latitude: number;
  longitude: number;
  height: number;
  pitch: number;
  roll: number;
  heading: number;
  scale: number;
  streetAddress?: string;
  commune?: string;
  district?: string;
  province?: string;
  area?: string;
  floor?: number;
  name?: string;
  function?: string;
  house_height?: number;
  pin_height?: number;
  type: string;
}
const formRef = ref();

const is_modify_position_form = ref<boolean>(true);
const formModel: ComputedRef<FormModel> = computed(() => {
  return editingModelStore.model_info;
});
const { mutate } = editingModelStore.isEditing ? useUpdateEntity() : useAddEntity();
const prepare_edit_data_form = (): any => {
  const data = toRaw(formModel).value;
  console.log('DATA', data);
  const arr = data.model_url.split('/');
  let model_id = arr[arr.length - 1];
  model_id = model_id.slice(0, -4);
  if (is_modify_position_form.value)
    return {
      id: data.id,
      location: {
        type: 'Point',
        coordinates: [data.longitude, data.latitude],
      },
      heading: data.heading,
      pitch: data.pitch,
      roll: data.roll,
      scale: data.scale,
      height: data.height,
      pin_height: data.pin_height,
      ten_toa_nha: data.name,
      modelUrl: model_id,
    };

  return {
    id: data.id,
    ten_toa_nha: data.name,
    phan_loai_toa_nha: data.function,

    so_tang: data.floor,
    dien_tich: data.area,
    chieu_cao: data.house_height,
    modelUrl: model_id,
  };
};
const prepare_add_data_form = (): any => {
  const data = toRaw(formModel).value;
  const arr = data.model_url.split('/');
  let model_id = arr[arr.length - 1];
  model_id = model_id.slice(0, -4);
  return {
    location: {
      type: 'Point',
      coordinates: [data.longitude, data.latitude],
    },
    dia_chi: {
      commune: 'Phường Trúc Bạch',
      district: 'Quận Ba Đình',
      province: 'Thành phố Hà Nội',
      streetAddress: '',
    },
    heading: data.heading,
    pitch: data.pitch,
    roll: data.roll,
    scale: data.scale,
    height: data.height,
    pin_height: data.pin_height,
    ten_toa_nha: data.name,
    modelUrl: model_id,
    type: data.type,
  };
};
const onSubmit = () => {
  formRef.value.validate().then(() => {
    const dataForm = editingModelStore.isEditing
      ? prepare_edit_data_form()
      : prepare_add_data_form();
    console.log(dataForm);
    mutate(dataForm, {
      onError: (error: any) => {
        notification.error({ message: error?.response?.data?.msg || error?.message });
      },
      onSuccess: () => {
        console.log('Success!');
      },
    });
    store.changeActiveTool();
  });
  libraryController.closeAll();
};
const validate_number = (x: any) => {
  return !isNaN(parseFloat(x)) && isFinite(x);
};
const validate_form = () => {
  return (
    validate_number(formModel.value.height) &&
    validate_number(formModel.value.latitude) &&
    validate_number(formModel.value.longitude) &&
    validate_number(formModel.value.heading) &&
    validate_number(formModel.value.pitch) &&
    validate_number(formModel.value.roll) &&
    validate_number(formModel.value.scale)
  );
};
const changeModelInfo = () => {
  if (validate_form()) {
    libraryController.modifyPositionModelEntity(formModel.value);
  }
};
const changePinInfo = () => {
  libraryController.modifyPinEntity(formModel.value);
};
</script>

<style scoped>
.add-layer-map-container {
  width: 306px;
  height: 495px;
}
</style>
