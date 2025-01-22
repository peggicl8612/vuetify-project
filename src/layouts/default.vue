<template>
  <v-app-bar
    :style="{ backgroundColor: '#E8B4B8', color: 'white', fontSize: '36px', fontFamily: 'Junge' }"
  >
    <v-container class="d-flex align-center">
      <v-btn to="/home" :active="false" :style="{ fontSize: '24px', fontFamily: 'Junge' }">
        咪凹屋
      </v-btn>

      <v-spacer />

      <template v-for="nav of navs" :key="nav.to">
        <!-- 如果是“关于我们”，绑定v-menu，其他按钮正常显示 -->
        <v-menu v-if="nav.isMenu" offset-y :close-on-content-click="true">
          <template #activator="{ props }">
            <v-btn v-bind="props">
              <v-icon icon="mdi-information-box-outline"></v-icon>
              {{ nav.text }}</v-btn
            >
          </template>
          <v-list>
            <v-list-item @click="goTo('about-us')">
              <v-list-item-title>關於我們</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('faq')">
              <v-list-item-title>常見問答</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn v-if="!nav.isMenu" :to="nav.to" :prepend-icon="nav.icon">
          {{ nav.text }}
          <v-badge v-if="nav.to === '/cart'" :content="user.cart" floating color="red"></v-badge>
        </v-btn>
      </template>

      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props">
            <v-icon icon="mdi-translate"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="lang in langs" :key="lang.value" @click="$i18n.locale = lang.value">
            {{ lang.text }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>

  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

const navs = computed(() => {
  return [
    { to: '/home', text: t('nav.home'), icon: 'mdi-home', show: true },
    {
      to: 'null',
      text: t('nav.about'),
      show: true,
      isMenu: true,
    },
    { to: '/info', text: t('nav.info'), icon: 'mdi-note-search-outline', show: true },
    { to: '/adopt', text: t('nav.adopt'), icon: 'mdi-home-heart', show: true },
    { to: '/account', text: t('nav.account'), icon: 'mdi-account', show: true },
    { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    { to: '/cart', text: t('nav.cart'), icon: 'mdi-cart', show: user.isLoggedIn },
    {
      to: '/orders',
      text: t('nav.orders'),
      icon: 'mdi-format-list-bulleted',
      show: user.isLoggedIn,
    },
    { to: '/admin', text: t('nav.admin'), icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
  ]
})

const langs = [
  { text: '繁體中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
]

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'green',
    },
  })
  router.push('/')
}

const goTo = (routeName) => {
  router.push({ name: routeName })
}
</script>
