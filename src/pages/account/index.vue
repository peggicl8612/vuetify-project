<!-- 會員的首頁 -->
<template>
  <v-container class="h-100">
    <v-row class="h-100" align="center">
      <v-col cols="12">
        <h1 class="text-center">{{ $t('admin.index') }}</h1>
        <h1>恭喜佩瑩成功!!再次狂賀!!! 2/20</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<route lang="yaml">
meta:
  layout: account
  login: true
  admin: false
  title: 'nav.account'
</route>
