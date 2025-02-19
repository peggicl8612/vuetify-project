<template>
  <v-navigation-drawer permanent class="drawer">
    <v-list>
      <!-- 顯示用戶的 Avatar -->
      <v-list-item>
        <template #prepend>
          <div class="user-svg" v-html="user.svg"></div>
          <!-- 顯示用戶的 avatar -->
        </template>
        <v-list-item-title class="account-title">{{ user.account }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="nav in navs"
        :key="nav.to"
        :prepend-icon="nav.icon"
        :title="nav.text"
        :to="nav.to"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed, createApp } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import App from '@/App.vue'

const { t } = useI18n()
const user = useUserStore()
const app = createApp(App)
app.config.errorHandler = (err) => {
  console.error('Vue Error:', err)
}
const navs = computed(() => {
  // 已是管理員頁面,所以不需要加 show: !user.isLoggedIn
  return [
    { to: '/admin/users', text: t('nav.adminUsers'), icon: 'mdi-account-box-outline' },
    { to: '/admin/products', text: t('nav.adminAdopting'), icon: 'mdi-shopping' },
    { to: '/admin/cats', text: t('nav.adminCats'), icon: 'mdi-cat' },
    // { to: '/admin/orders', text: t('nav.adminOrders'), icon: 'mdi-format-list-bulleted' },
    { to: '/home', text: t('nav.home'), icon: 'mdi-home' },
  ]
})
</script>

<style>
.drawer {
  font-family: 'Zen Old Mincho', serif;
}
.account-title {
  font-weight: bold;
  font-size: 20px;
  color: #757575;
  font-family: 'Zen Old Mincho', serif;
}
.user-svg {
  margin-right: 20px;
}
</style>
