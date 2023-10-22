<template>
  <div>
    <a-button
      type="primary"
      class="flex justify-center items-center space-x-2.5"
      :icon="h(IconAddCircle)"
      @click="showModal"
    >
      Thêm mới
    </a-button>
    <a-modal
      v-model:open="open"
      title="Thêm mới người dùng"
      :mask-closable="false"
      style="width: 800px"
      :footer="false"
    >
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :rules="rules"
        layout="vertical"
        @finish="handleFinish"
        class="m-10"
      >
        <a-row :gutter="[16, 16]">
          <a-col :span="12">
            <a-form-item
              name="name"
              label="Tên"
              :rules="[{ required: true }]"
            >
              <a-input
                v-model:value="formState.name"
                :allow-clear="true"
              />
            </a-form-item>
            <a-form-item
              name="userId"
              label="Tài khoản"
              :rules="[{ required: true }]"
            >
              <a-input
                v-model:value="formState.userId"
                :allow-clear="true"
              />
            </a-form-item>
            <a-form-item
              name="email"
              label="Email"
              :rules="[{ type: 'email' }]"
            >
              <a-input
                :allow-clear="true"
                v-model:value="formState.email"
              />
            </a-form-item>
            <a-form-item
              has-feedback
              label="Mật khẩu"
              name="pass"
            >
              <a-input
                v-model:value="formState.pass"
                autocomplete="off"
                type="password"
                :allow-clear="true"
              />
            </a-form-item>
            <a-form-item
              has-feedback
              label="Nhâp lại mật khẩu"
              name="checkPass"
            >
              <a-input
                v-model:value="formState.checkPass"
                type="password"
                autocomplete="off"
                :allow-clear="true"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              has-feedback
              label="Số điện thoại"
              name="phone"
            >
              <a-input
                v-model:value="formState.phone"
                class="w-full"
                :allow-clear="true"
              />
            </a-form-item>
            <a-form-item
              name="role"
              label="Vai trò"
              :rules="[{ required: true, message: 'Vui lòng chọn vai trò' }]"
            >
              <a-select
                v-model:value="formState.role"
                :options="roleOptions"
                :allow-clear="true"
              />
            </a-form-item>
            <a-form-item
              name="website"
              label="Website"
            >
              <a-input
                v-model:value="formState.website"
                :allow-clear="true"
              />
            </a-form-item>
            <a-form-item
              name="address"
              label="Địa chỉ"
            >
              <a-input
                v-model:value="formState.address"
                :allow-clear="true"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <div class="flex flex-row justify-end gap-x-6">
            <a-button @click="resetForm">Reset</a-button>
            <a-button
              type="primary"
              html-type="submit"
              :loading="isLoading"
            >
              Submit
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { h, ref, reactive, watchEffect } from 'vue';
import IconAddCircle from '@/components/icons/IconAddCircle.vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import { useAddNewUser, useRoles, USERS_QUERY_KEY } from '@/services/hooks/useUser';
import type { Option } from '@/services/commonTypes';
import { notification } from 'ant-design-vue';
import { useQueryClient } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';

const open = ref<boolean>(false);

const { data: rolesData } = useRoles();

const roleOptions = ref<Option[]>([]);

watchEffect(() => {
  if (rolesData.value) {
    roleOptions.value = rolesData?.value?.data?.map((item) => {
      return {
        label: item?.roleId,
        value: item?.roleName,
      };
    });
  }
});

const showModal = () => {
  open.value = true;
};

interface FormState {
  name: string;
  userId: string;
  email?: string;
  pass: string;
  checkPass: string;
  phone?: string;
  role: string;
  website?: string;
  address?: string;
}

const formRef = ref<FormInstance>();

const formState = reactive<FormState>({
  name: '',
  userId: '',
  email: '',
  pass: '',
  checkPass: '',
  phone: undefined,
  role: '',
  website: '',
  address: '',
});

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Vui lòng nhập mật khẩu');
  } else {
    if (formState.checkPass !== '') {
      formRef?.value?.validateFields('checkPass');
    }
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Vui lòng nhập lại mật khẩu');
  } else if (value !== formState.pass) {
    return Promise.reject('Mật khẩu không trùng khớp!');
  } else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  pass: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],
};

const { mutate: addNewUser, isLoading } = useAddNewUser();

const queryClient = useQueryClient();

const handleFinish = (values: FormState) => {
  addNewUser(
    {
      ...values,
      roleId: values.role,
      password: values.pass,
    },
    {
      onSuccess() {
        open.value = false;
        notification.success({
          message: 'Thành công',
          description: 'Thêm người dùng thành công!',
        });
        queryClient.invalidateQueries([USERS_QUERY_KEY]);
      },
      onError(error) {
        const errorAsType = error as AxiosError<{ msg: string }>;
        notification.error({
          message: 'Thất bại',
          description: errorAsType?.response?.data?.msg,
        });
      },
    },
  );
};
const resetForm = () => {
  formRef?.value?.resetFields();
};
</script>
