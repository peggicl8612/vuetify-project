<template>
  <v-app-bar
    :style="{ backgroundColor: '#D4878D', color: 'white', fontSize: '36px', fontFamily: 'Junge' }"
  >
    <v-container class="d-flex align-center">
      <v-btn to="/home" :active="false" :style="{ fontSize: '28px', fontFamily: 'Junge' }">
        咪凹屋
      </v-btn>

      <v-spacer />

      <!-- 關於我們 -->
      <template v-for="nav of navs" :key="nav.to">
        <!-- 首頁 -->
        <v-btn
          v-if="!nav.isMenu && nav.show && !nav.isAbout && !nav.isInfo && !nav.isAdopt"
          :to="nav.to"
          :prepend-icon="nav.icon"
        >
          {{ nav.text }}
          <v-badge v-if="nav.to === '/cart'" :content="user.cart" floating color="red"></v-badge>
        </v-btn>

        <!-- 關於我們 -->
        <v-menu v-if="nav.isAbout" offset-y :close-on-content-click="true">
          <template #activator="{ props }">
            <v-btn v-bind="props">
              <v-icon icon="mdi-information-box-outline"></v-icon>
              {{ nav.text }}
            </v-btn>
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

        <!-- 喵的資訊 -->
        <v-menu v-if="nav.isInfo" offset-y :close-on-content-click="true">
          <template #activator="{ props }">
            <v-btn v-bind="props">
              <v-icon icon="mdi-note-search-outline"></v-icon>
              {{ nav.text }}
            </v-btn>
          </template>
          <v-list>
            <!-- 第一層 -->
            <v-list-item link>
              <v-list-item-title>飲食知識</v-list-item-title>
              <template #append>
                <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
              </template>

              <!-- 第二層 -->
              <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
                <v-list>
                  <v-list-item @click="goTo('kitten')">
                    <v-list-item-title>幼貓飼養</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="goTo('adult')">
                    <v-list-item-title>成貓飼養</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>

            <!-- 第二層列表 -->
            <v-list-item link @click="goTo('disease')">
              <v-list-item-title>疾病資訊</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- 認養貓咪 -->
        <v-menu v-if="nav.isAdopt" offset-y :close-on-content-click="true">
          <template #activator="{ props }">
            <v-btn v-bind="props">
              <v-icon icon="mdi-home-heart"></v-icon>
              {{ nav.text }}
            </v-btn>
          </template>
          <v-list>
            <!-- 第一層 -->
            <v-list-item link>
              <v-list-item-title>領養專區</v-list-item-title>
              <template #append>
                <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
              </template>

              <!-- 第二層 -->
              <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
                <v-list>
                  <v-list-item @click="goTo('adopting')">
                    <v-list-item-title>待領養專區</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="goTo('agree')">
                    <v-list-item-title>下載同意書</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>

            <!-- 第二層列表 -->
            <v-list-item @click="goTo('rehome')">
              <v-list-item-title>送養專區</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">
        {{ $t('nav.logout') }}
      </v-btn>

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

// 導覽列項目
const navs = computed(() => {
  return [
    { to: '/home', text: t('nav.home'), icon: 'mdi-home', show: true },
    {
      to: 'null',
      text: t('nav.about'),
      show: false,
      isAbout: true,
    },

    {
      to: 'null',
      text: t('nav.info'),
      show: false,
      isInfo: true,
    },

    {
      to: 'null',
      text: t('nav.adopt'),
      show: user.isLoggedIn,
      isAdopt: true,
    },

    { to: '/account', text: t('nav.account'), icon: 'mdi-account', show: true },
    { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    // { to: '/cart', text: t('nav.cart'), icon: 'mdi-cart', show: user.isLoggedIn },
    // {
    //   to: '/orders',
    //   text: t('nav.orders'),
    //   icon: 'mdi-format-list-bulleted',
    //   show: user.isLoggedIn,
    // },
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
    console.log('error:', error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'rgb(117, 117, 117)',
    },
  })
  router.push('/')
}

const goTo = (routeName) => {
  router.push({ name: routeName })
}
</script>
