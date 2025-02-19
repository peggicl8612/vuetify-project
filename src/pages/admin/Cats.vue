<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminCats') }}</h1>
      </v-col>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { reactive } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const Cats = reactive([])

const getCats = async () => {
  try {
    const { data } = await apiAuth.get('/cat/all')
    Cats.push(...data.result)
  } catch (error) {
    console.log('cats.vue', error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

getCats()
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminCats'
</route>
