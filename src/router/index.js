import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/common/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/keyauth/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/keyauth/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/password-reset',
    component: () => import('@/views/keyauth/login/password-reset'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/common/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/common/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/keyauth/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      },
      {
        hidden: true,
        path: 'init',
        component: () => import('@/views/keyauth/profile/initial'),
        name: 'SubAccountInit',
        meta: {
          title: '首次登陆'
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/sub',
    alwaysShow: true,
    name: 'SubAccount',
    meta: {
      title: '用户管理',
      icon: 'account',
      roles: ['supper', 'domain_admin', 'org_admin']
    },
    children: [
      {
        path: 'domain',
        component: () => import('@/views/keyauth/sub-account/domain'),
        name: 'UserDomain',
        meta: {
          title: '登录安全',
          affix: true }
      },
      {
        path: 'department',
        component: () => import('@/views/keyauth/department'),
        name: 'DepartmentList',
        meta: {
          title: '部门列表'
        }
      },
      {
        hidden: true,
        path: 'department/:id',
        component: () => import('@/views/keyauth/department/detail'),
        name: 'DepartmentDetail',
        meta: {
          title: '部门详情'
        }
      },
      {
        path: 'sub',
        component: () => import('@/views/keyauth/sub-account/index'),
        name: 'SubAccountList',
        meta: {
          title: '用户列表'
        }
      },
      {
        hidden: true,
        path: 'sub/:account',
        component: () => import('@/views/keyauth/sub-account/detail'),
        name: 'SubAccountDetail',
        meta: {
          title: '用户详情'
        }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'permission',
      roles: ['supper', 'domain_admin', 'perm_admin']
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/keyauth/role'),
        name: 'RoleList',
        meta: {
          title: '角色列表'
        }
      },
      {
        hidden: true,
        path: 'role/:id',
        component: () => import('@/views/keyauth/role/detail'),
        name: 'RoleDetail',
        meta: {
          title: '角色详情'
        }
      },
      {
        hidden: true,
        path: 'create-role',
        component: () => import('@/views/keyauth/role/create'),
        name: 'CreateRole',
        meta: {
          title: '角色创建'
        }
      },
      {
        path: 'namespace',
        component: () => import('@/views/keyauth/namespace'),
        name: 'NamespaceList',
        meta: {
          title: '空间列表'
        }
      },
      {
        hidden: true,
        path: 'namespace/:id',
        component: () => import('@/views/keyauth/namespace/detail'),
        name: 'NamespaceDetail',
        meta: {
          title: '空间详情'
        }
      },
      {
        path: 'tag',
        component: () => import('@/views/keyauth/tag'),
        name: 'TagList',
        meta: {
          title: '标签列表'
        }
      }
    ]
  },

  {
    path: '/service',
    component: Layout,
    redirect: '/service/list',
    alwaysShow: true,
    name: 'Service',
    meta: {
      title: '服务管理',
      icon: 'micro',
      roles: ['supper']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/keyauth/service'),
        name: 'ServiceList',
        meta: {
          title: '服务列表'
        }
      },
      {
        hidden: true,
        path: 'detail/:id',
        component: () => import('@/views/keyauth/service/detail'),
        name: 'ServiceDetail',
        meta: {
          title: '服务详情'
        }
      },
      {
        path: 'config',
        component: () => import('@/views/keyauth/service/config'),
        name: 'ServiceConfig',
        meta: {
          title: '服务配置'
        }
      }
    ]
  },

  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/login',
    alwaysShow: true,
    name: 'Audit',
    meta: {
      title: '安全审计',
      icon: 'audit',
      roles: ['supper', 'domain_admin', 'audit_admin']
    },
    children: [
      {
        path: 'session',
        component: () => import('@/views/keyauth/audit/session'),
        name: 'LoginAudit',
        meta: {
          title: '登录日志'
        }
      },
      {
        path: 'operate',
        component: () => import('@/views/keyauth/audit/operate'),
        name: 'OperateAudit',
        meta: {
          title: '操作日志'
        }
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    roles: ['supper'],
    children: [
      {
        path: '',
        component: () => import('@/views/keyauth/setting'),
        name: 'Setting',
        meta: {
          title: '系统设置',
          icon: 'setting',
          roles: ['supper'],
          affix: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
