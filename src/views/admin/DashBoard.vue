<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
    >
      <img
        src="/images/admin/logo.png"
        alt="logo"
        width="312"
        height="84"
      />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        class="mt-20"
      >
        <a-menu-item key="1">
          <user-outlined />
          <router-link :to="USER_PAGE_PATH">User</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '312px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content class="m-6">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { USER_PAGE_PATH } from '@/configs/routePath';
const selectedKeys = ref<string[]>(['4']);
</script>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.ant-layout .ant-layout-sider {
  width: 312px !important;
  max-width: 312px !important;
}
</style>
