<template>
  <div class="auth_login flex h-screen w-full justify-center items-center">
    <div class="w-full flex justify-center">
      <div>
        <img
          src="/images/auth/logo_viettel.png"
          alt="logo-viettel"
          width="561"
          height="119"
        />
        <div class="mt-10">
          <div class="auth_login_border rounded">
            <div class="auth_login_border_1 rounded">
              <div
                class="auth_login_form p-16 2xl:p-16 text-lg 2xl:text-xl font-magistral text-white bg-white/[.05]"
              >
                <a-form
                  :model="formState"
                  name="basic"
                  autocomplete="off"
                  @finish="onFinish"
                  layout="vertical"
                >
                  <a-form-item
                    name="username"
                    :rules="[{ required: true, message: 'Vui lòng nhập tài khoản!' }]"
                  >
                    <template #label>
                      <label class="text-white text-xl">Tài khoản</label>
                    </template>
                    <a-input
                      v-model:value="formState.username"
                      class="h-14 bg-white bg-opacity-40 text-white text-xl"
                    />
                  </a-form-item>

                  <a-form-item
                    name="password"
                    :rules="[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]"
                  >
                    <template #label>
                      <label class="text-white text-xl">Mât khẩu</label>
                    </template>
                    <a-input-password
                      type="password"
                      v-model:value="formState.password"
                      class="h-12 bg-white bg-opacity-40 text-white text-xl"
                    >
                      <template #iconRender="v">
                        <IconEyeOff v-if="v" />
                        <IconEye v-else />
                      </template>
                    </a-input-password>
                  </a-form-item>

                  <a-form-item>
                    <a-row justify="end">
                      <a-button
                        type="text"
                        class="text-white text-xl p-0 font-normal"
                      >
                        Quên mật khẩu?
                      </a-button>
                    </a-row>
                  </a-form-item>

                  <a-form-item>
                    <a-button
                      type="primary"
                      html-type="submit"
                      class="w-full bg-main h-12 text-xl text-white hover:bg-main"
                    >
                      Login
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth_login {
  background-image: url('/images/auth/auth_login_background.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
<script setup lang="ts">
import { reactive } from 'vue';
import IconEye from '@/components/icons/IconEye.vue';
import IconEyeOff from '@/components/icons/IconEyeOff.vue';
import useAuth from '@/services/hooks/useAuth';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const { login } = useAuth();

const onFinish = (values: any) => {
  login({
    identity: values.username,
    password: values.password,
  });
};
</script>

<style scoped>
.auth_login_form {
  clip-path: polygon(0.5% 0.5%, 100% 0%, 99.5% 99.5%, 0% 100%);
}

.auth_login_border {
  background-image: linear-gradient(to top left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3));
}

.ant-form label {
  font-size: 20px;
}

.ant-input-affix-wrapper > input.ant-input {
  background: rgba(255, 255, 255, 0);
  color: white;
}
</style>
