/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
import adminHome from '@/pages/home.vue'
import admin from '@/layouts/admin.vue'
import AboutUs from '@/pages/about-us.vue'
import Faq from '@/pages/faq.vue'
import Kitten from '@/pages/kitten.vue'
import Adult from '@/pages/adult.vue'
import Adopting from '@/pages/adopting.vue'
import Agree from '@/pages/agree.vue'
import rehome from '@/pages/rehome.vue'
import users from '@/pages/admin/users.vue'
import rehomes from '@/pages/admin/rehomes.vue'
import Disease from '@/pages/disease.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([
    ...routes,
    {
      path: '/',
      redirect: () => '/home',
    },

    {
      path: '/admin',
      component: admin,
      children: [
        {
          path: '',
          name: 'Home',
          component: adminHome,
          meta: {
            layout: 'admin',
            login: true,
            admin: true,
            title: 'nav.admin',
          },
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: users,
          meta: {
            layout: 'admin',
            login: true,
            admin: true,
            title: 'nav.adminUsers',
          },
        },
        {
          path: '/rehomes',
          name: 'adminRehomes',
          component: rehomes,
          meta: {
            layout: 'admin',
            login: true,
            admin: true,
            title: 'nav.adminRehomes',
          },
        },
      ],
    },
    { path: '/about-us', name: 'about-us', component: AboutUs },
    { path: '/kitten', name: 'kitten', component: Kitten },
    { path: '/adult', name: 'adult', component: Adult },
    { path: '/disease', name: 'disease', component: Disease },
    { path: '/faq', name: 'faq', component: Faq },
    // meta: { requiresAuth: true } 表示這個頁面需要登入才能進入
    { path: '/adopting', name: 'adopting', component: Adopting, meta: { requiresAuth: true } },
    { path: '/agree', name: 'agree', component: Agree, meta: { requiresAuth: true } },
    { path: '/rehome', name: 'rehome', component: rehome, meta: { requiresAuth: true } },
  ]),
})

// 進到每一頁之前,進行一個 function
router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()

  if (to.path === '/') {
    next('/home')
  } else {
    next()
  }

  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await apiAuth.get('/user/profile')
      user.login(data.result)
    } catch (error) {
      console.log(error)
      user.logout()
    }
  }
  // 若未登入且需要登入,則導向登入頁面
  if (to.meta.requiresAuth && !user.isLoggedIn) {
    next('/login')
  } else if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLoggedIn) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

// 設定頁面的標題
router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title) + ' | 咪凹屋'
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
