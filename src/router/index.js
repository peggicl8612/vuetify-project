/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'
import adminHome from '@/pages/home.vue'
import adminLayout from '@/layouts/adminLayout.vue'
import AboutUs from '@/pages/about-us.vue'
import Faq from '@/pages/faq.vue'
import Kitten from '@/pages/kitten.vue'
import Adult from '@/pages/adult.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([
    ...routes,
    {
      path: '/admin',
      component: adminLayout,
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
      ],
    },
    {
      path: '/',
      redirect: '/home',
    },

    { path: '/about-us', name: 'about-us', component: AboutUs },
    { path: '/kitten', name: 'kitten', component: Kitten },
    { path: '/adult', name: 'adult', component: Adult },
    { path: '/faq', name: 'faq', component: Faq },
    // console.log(routes),
  ]),
})

router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()

  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await apiAuth.get('/user/profile')
      user.login(data.result)
    } catch (error) {
      console.log(error)
      user.logout()
    }
  }

  if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    next('/')
  } else if (to.meta.login && !user.isLoggedIn) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

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
