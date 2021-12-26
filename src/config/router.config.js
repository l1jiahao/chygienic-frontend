// eslint-disable-next-line
import {  BlankLayout } from '@/layouts'
import UserLayout from '@/chygienic/UserLayout'
import BasicLayout from '@/chygienic/BasicLayout'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/chygienic/Welcome'),
        meta: { title: 'menu.welcomePage', icon: 'smile', permission: ['user', 'admin'] }
      },
      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: 'menu.profile', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic'),
            meta: { title: 'menu.profile.basic', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: 'menu.profile.advanced', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: 'menu.result', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: 'menu.result.success', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: 'menu.result.fail', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: 'menu.exception.not-find', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: 'menu.exception.server-error', permission: ['exception'] }
          }
        ]
      },
      // account
      // 用户首页
      {
        path: '/client',
        name: 'client',
        component: () => import(/* webpackChunkName: "client" */ '@/chygienic/user/UserDashboard'),
        meta: { title: 'menu.client', icon: 'home', permission: ['user', 'admin'] }
      },
      // 用户申报
      {
        path: '/submit',
        name: 'submit',
        component: RouteView,
        redirect: '/submit/sci',
        meta: { title: 'menu.submit', icon: 'idcard', permission: ['user', 'admin'] },
        children: [
          {
            path: '/submit/sci',
            name: 'SubmitSci',
            component: () => import('@/chygienic/user/submit/SciLayout'),
            meta: { title: 'menu.sci', hidden: true, permission: ['user', 'admin'] }
          },
          {
            path: '/submit/book',
            name: 'SubmitBook',
            component: () => import('@/chygienic/user/submit/BookLayout'),
            meta: {
              title: 'menu.book',
              hidden: true,
              keepAlive: true,
              permission: ['user', 'admin']
            }
          }
        ]
      },
      // 管理员界面发布表单
      {
        path: '/admin',
        name: 'admin',
        component: RouteView,
        meta: { title: 'menu.admin', icon: 'form', permission: ['admin'] },
        children: [
          {
            path: '/admin/sci',
            name: 'ReleaseSci',
            component: () => import('@/chygienic/admin/ReleaseSci'),
            meta: { title: 'menu.sci', hidden: true, permission: ['admin'] }
          },
          {
            path: '/admin/book',
            name: 'ReleaseBook',
            component: () => import('@/chygienic/admin/ReleaseBook'),
            meta: { title: 'menu.book', hidden: true, permission: ['admin'] }
          }
        ]
      },
      // 管理员审核
      {
        path: '/check',
        name: 'check',
        redirect: '/check/sci',
        component: RouteView,
        meta: { title: 'menu.check', icon: 'file-protect', permission: ['admin'] },
        children: [
          {
            path: '/check/sci',
            name: 'CheckSci',
            component: () => import('@/chygienic/admin/verify/SciVerifyLayout'),
            meta: { title: 'menu.sci', hidden: true, permission: ['admin'] }
          },
          {
            path: '/check/book',
            name: 'CheckBook',
            component: () => import('@/chygienic/admin/verify/BookVerifyLayout'),
            meta: {
              title: 'menu.book',
              hidden: true,
              keepAlive: true,
              permission: ['admin']
            }
          }
        ]
      },
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user', 'admin'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: 'menu.account.center', keepAlive: true, permission: ['user', 'admin'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user', 'admin'] },
            redirect: '/account/settings/security',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user', 'admin'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user', 'admin'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user', 'admin'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user', 'admin']
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/chygienic/login/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
