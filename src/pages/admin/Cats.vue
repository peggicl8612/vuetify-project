<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center font-weight-bold" style="color: #a59aa3">
          {{ $t('nav.adminCats') }}
        </h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="cats" :headers="headers" class="table" :search="search">
          <template #top>
            <v-toolbar flat>
              <v-btn color="brown" rounded @click="openDialog(null)"
                ><v-icon>mdi-plus</v-icon> {{ $t('adminCat.new') }}</v-btn
              >
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                variant="plain"
                class="search-field"
                placeholder="搜尋貓咪"
                style="background-color: #e7e4e7; border-radius: 60px"
                dense
              ></v-text-field>
            </v-toolbar>
          </template>
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="100" width="100"></v-img>
          </template>
          <template #[`item.isAdopting`]="{ value }">
            <v-icon v-if="value" color="brown">mdi-check-circle</v-icon>
            <v-icon v-else color="red">mdi-close-circle</v-icon>
          </template>
          <template #[`item.age`]="{ value }">
            <span v-if="value" class="text-brown">{{ value }} 歲</span>
            <span v-else class="text-grey--text">未知</span>
          </template>
          <template #[`item.createdAt`]="{ value }">
            <span>{{ new Date(value).toLocaleDateString() }}</span
            ><br />
            <span>{{ new Date(value).toLocaleTimeString() }}</span
            ><br />
          </template>
          <template #[`item.updatedAt`]="{ value }">
            <span>{{ new Date(value).toLocaleDateString() }}</span
            ><br />
            <span>{{ new Date(value).toLocaleTimeString() }}</span
            ><br />
          </template>
          <template #[`item.breed`]="{ value }">
            <span class="text-primary">{{ $t('catBreed.' + value) }}</span>
          </template>
          <template #[`item.gender`]="{ value }">
            <span>{{ $t('catGender.' + value) }}</span>
          </template>
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" color="brown" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog> </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { computed, reactive, ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const cats = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    { title: t('cat.image'), key: 'image', sortable: false },
    { title: t('cat.name'), key: 'name', sortable: false },
    { title: t('cat.age'), key: 'age', sortable: true },
    { title: t('cat.breed'), key: 'breed', sortable: true },
    { title: t('cat.isAdopting'), key: 'isAdopting', sortable: true },
    { title: t('cat.description'), key: 'description', sortable: false },
    { title: t('cat.createdAt'), key: 'createdAt', sortable: true },
    { title: t('cat.updatedAt'), key: 'updatedAt', sortable: true },
    { title: t('adminCat.edit'), key: 'edit', sortable: false },
  ]
})

const getCats = async () => {
  try {
    const { data } = await apiAuth.get('/cat/all')
    cats.push(...data.result)
  } catch (error) {
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: { color: 'rgb(212, 135, 141)' },
    })
  }
}

getCats()
</script>

<style scoped>
.container {
  background: #f5eef4;
  font-family: 'Zen Old Mincho', serif;
}

:deep(.v-data-table tbody tr:hover) {
  background-color: #cfc2cda9 !important;
  transition: background-color 0.3s ease-in-out;
}

.v-toolbar__content {
  background: #e6dee4;
}

.search-field {
  height: 60px;
  padding: 4px;
  text-align: center;
}

.text-primary {
  font-weight: bold;
}

.v-divider {
  margin-top: 20px;
  margin-bottom: 20px;
}
:deep(.v-data-table thead) {
  background-color: #cfc2cd !important;
  color: white !important;
}
</style>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminCats'
</route>
