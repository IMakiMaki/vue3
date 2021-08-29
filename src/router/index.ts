import Layout from '@/layouts/index.vue';
import NProgress from '@/utils/ngProgress';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const homeIndex = () => import(/* webpackChunkName: "homeIndex" */ '../views/index/index.vue');
const userQuery = () =>
  import(/* webpackChunkName: "userQuery" */ '../views/user/userQuery/index.vue');
const qualifiedApprove = () =>
  import(
    /* webpackChunkName: "qualifiedApprove" */ '../views/qualified/qualifiedApprove/index.vue'
  );
const infoApprove = () =>
  import(/* webpackChunkName: "infoApprove" */ '../views/game/infoApprove/index.vue');
const notifyManage = () =>
  import(/* webpackChunkName: "notifyManage" */ '../views/platform/notifyManage/index.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '主页',
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: '/index',
        component: homeIndex,
        meta: {
          title: '欢迎页',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/user-query',
    meta: {
      title: '用户中心',
      icon: 'el-icon-user-solid',
      showMenu: true,
    },
    children: [
      {
        path: '/user/user-query',
        component: userQuery,
        meta: {
          title: '用户查询',
        },
      },
    ],
  },
  {
    path: '/qualified',
    component: Layout,
    redirect: '/qualified/qualified-approve',
    meta: {
      title: '资质中心',
      icon: 'el-icon-postcard',
      showMenu: true,
    },
    children: [
      {
        path: '/qualified/qualified-approve',
        component: qualifiedApprove,
        meta: {
          title: '资质审批',
        },
      },
    ],
  },
  {
    path: '/game',
    component: Layout,
    redirect: '/game/info-approve',
    meta: {
      title: '游戏管理',
      icon: 'el-icon-s-management',
      showMenu: true,
    },
    children: [
      {
        path: '/game/info-approve',
        component: infoApprove,
        meta: {
          title: '游戏资料审批',
        },
      },
    ],
  },
  {
    path: '/platform',
    component: Layout,
    redirect: '/platform/notification-management',
    meta: {
      title: '平台设置',
      icon: 'el-icon-s-tools',
      showMenu: true,
    },
    children: [
      {
        path: '/platform/notification-management',
        component: notifyManage,
        meta: {
          title: '通知管理',
        },
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    redirect: '/error/404',
    meta: {
      icon: 'el-icon-position',
      title: '错误页面',
      showNav: false,
    },
    children: [
      {
        path: '/error/404',
        component: () => import(/* webpackChunkName: "404" */ '../views/error/404.vue'),
        meta: {
          title: '404',
          showNav: false,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    meta: {
      title: '登陆页面',
      showNav: false,
    },
  },
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    component: Layout,
    redirect: '/error/404',
    meta: {
      icon: 'el-icon-s-home',
      title: '404',
      showNav: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const whiteList = ['/login', '/error/404'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  // whiteList.indexOf(to.path) !== -1 || storageUtil.getToken() ? next() : next("/login"); // 全部重定向到登录页
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
