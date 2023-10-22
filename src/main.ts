import './assets/main.css';
import './assets/base.css';
import './assets/custom-antdv.css';
import 'ant-design-vue/dist/reset.css';
import store from '@/store';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(store);
app.use(VueQueryPlugin);
app.use(createPinia());
app.use(router);

app.mount('#app');
