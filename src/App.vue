<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <a-config-provider
    :locale="locale"
    :theme="{
      token: {
        colorPrimary: '#D0002D',
      },
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts">
import viVN from 'ant-design-vue/es/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

export default {
  data() {
    return {
      locale: viVN,
    };
  },
};
</script>
