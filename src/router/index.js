import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/chat',
      children: [
        {
          path: '/',
          component: () => import('@/views/sideNav/FriendLayout.vue'),
          redirect: '/friend',
          children: [
            {
              path: '/friend',
              component: () => import('@/views/sideNav/FriendsList.vue'),
              children: [
                {
                  path: 'applymsg',
                  component: () => import('@/components/ApplyList.vue'),
                },
                {
                  path: 'detail',
                  component: () => import('@/components/FriendDetail.vue'),
                  // props: true,
                },
              ],
            },
            {
              path: '/friend/add',
              component: () => import('@/views/sideNav/SearchFriend.vue'),
            },
          ],
        },
        {
          path: '/chat',
          component: () => import('@/views/sideNav/ChatList.vue'),
          children: [{ path: ':id', component: () => import('@/components/ChatWindow.vue') }],
        },
        {
          path: '/set',
          component: () => import('@/views/sideNav/Setting.vue'),
        },
        {
          path:'/function',
          component: () => import('@/views/sideNav/Function.vue'),
        }
      ],
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'broad',
          component: () => import('@/views/admin/BroadManage.vue'),
        },
        {
          path: 'user',
          component: () => import('@/views/admin/UserManage.vue'),
        },
        {
          path: 'manager',
          component: () => import('@/views/admin/Manager.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      component: () => import('@/views/Register.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NoFound.vue'),
    },
  ],
})

import { watch, ref } from 'vue'
router.beforeEach((to, from, next) => {
  next((vm) => {
    window.location.reload()
  })
  // ...
  // 返回 false 以取消导航
})
export default router
