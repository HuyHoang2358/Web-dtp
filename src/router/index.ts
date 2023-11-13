import { createRouter, createWebHistory } from 'vue-router';
import { ADMIN_PAGE_PATH, LOGIN_PAGE_PATH, HOME_PAGE_PATH } from '@/configs/routePath';
import UserPage from '@/views/admin/UsersView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import DashBoard from '@/views/admin/DashBoard.vue';
import TestPage from '@/components/test/TestPage.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: TestPage,
    },
    {
      path: HOME_PAGE_PATH,
      name: 'home',
      component: HomeView,
    },
    {
      path: LOGIN_PAGE_PATH,
      name: 'about',
      component: LoginView,
    },
    //home
    {
      path: ADMIN_PAGE_PATH,
      component: DashBoard,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'user',
          component: UserPage,
        },
      ],
    },
  ],
});

export default router;
