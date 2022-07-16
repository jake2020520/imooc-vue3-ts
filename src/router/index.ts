import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index'),
    meta: { isHiddenHeader: false, isHiddenFooter: false }
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/edit/index'),
    meta: { isHiddenHeader: false, isHiddenFooter: true }
  },
  {
    path: '/detail/:id',
    name: 'templateDetail',
    component: () => import('../views/detail/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index')
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
