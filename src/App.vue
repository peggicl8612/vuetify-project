<template>
  <v-app id="app">
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<style>
@import '@/assets/fonts.css';

#app {
  background-color: #f0f0e7;
}
</style>
