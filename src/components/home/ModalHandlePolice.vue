<template>
  <a-modal
    :open="props.open"
    :title="null"
    @ok="handleOk"
    style="width: 655px"
    @cancel="props.close"
    :mask-closable="false"
    wrap-class-name="dark-form"
  >
    <template #closeIcon>
      <IconCloseModalGrey />
    </template>
    <div class="text-center">
      <label class="text-white text-sm font-medium uppercase font-magistral">{{ title }}</label>
    </div>
    <a-divider class="h-px bg-[#353535] mt-3 mb-1.5" />
    <a-form
      ref="formRef"
      :model="formState"
      layout="vertical"
    >
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item
            name="name"
            label="Tên cán bộ"
          >
            <a-input
              v-model:value="formState.name"
              :allow-clear="true"
              placeholder="Nhập tên"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            name="code"
            label="Số hiệu"
          >
            <a-input
              v-model:value="formState.code"
              :allow-clear="true"
              placeholder="Nhập số hiệu"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item
            name="birthday"
            label="Ngày sinh"
          >
            <a-input
              v-model:value="formState.birthday"
              :allow-clear="true"
              placeholder="Nhập ngày sinh"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            name="phone"
            label="Số điện thoại"
          >
            <a-input
              v-model:value="formState.phone"
              :allow-clear="true"
              placeholder="Nhập tên"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-form-item
            name="position"
            label="Chức vụ"
          >
            <a-input
              v-model:value="formState.position"
              :allow-clear="true"
              placeholder="Nhập chức vụ"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            name="phone"
            label="Vị trí"
          >
            <a-input
              v-model:value="formState.description"
              :allow-clear="true"
              placeholder="xác định vị trí"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <a-button
        @click="close"
        class="bg-[#393939] border-[#393939] text-[#A9A9A9] font-medium text-xs"
      >
        Hủy bỏ
      </a-button>
      <a-button
        type="primary"
        @click="onSubmit"
        class="text-white font-medium text-xs"
        :loading="isLoading"
      >
        Thêm mới
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import IconCloseModalGrey from '@/components/icons/IconCloseModalGrey.vue';
import { useAddNewPolice } from '@/services/hooks/usePolice';

const props = defineProps<{
  open: boolean;
  close: () => void;
}>();

const handleOk = (e: MouseEvent) => {
  console.log(e);
};

interface FormState {
  avatarUrl: string;
  birthday: string;
  code: string;
  description: string;
  importantLocationId: string;
  name: string;
  phone: string;
  position: string;
  district: string;
  province: string;
  commune: string;
  streetAddress: string;
}

const formRef = ref();

const title = 'Thêm mới thông tin cán bộ';

const formState: UnwrapRef<FormState> = reactive({
  avatarUrl: '/images/BCA/police.jpg',
  birthday: '19/07/1979',
  code: 'MK5',
  description: '',
  importantLocationId: '',
  name: 'Nguyễn Văn X',
  phone: '0864524215',
  position: 'Tổ trưởng',
  commune: 'Phường Trúc Bạch',
  district: 'Quận Ba Đình',
  province: 'Thành phố Hà Nội',
  streetAddress: '',
  location: {
    type: 'Point',
    coordinates: [0, 0],
  },
});

/*const points = [
  [105.83817703559123, 21.04151448231076],
  [105.83481273482444, 21.034191976561832],
  21.03092759331635,
  105.8278872181121,
  21.03137357829466,
  105.81641467606111,
  21.0173833388123,
  105.8074020425964,
  21.003672470443597,
  105.79247422568726,
  21.03470952285036,
  105.83659376973002,
];*/

const { mutate, isLoading } = useAddNewPolice();
const onSubmit = () => {
  console.log(formState);
  mutate(formState, {
    onError: (error: any) => {},
    onSuccess: () => {},
  });
};
</script>
