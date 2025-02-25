<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center font-weight-bold" style="color: #a59aa3">
          {{ $t('nav.adminRehomes') }}
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminRehomes'
</route>
