<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminUsers') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="users" :headers="headers" :search="search">
          <template #top>
            <v-toolbar>
              <v-btn @click="openDialog(null)">{{ $t('adminUser.new') }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                variant="underlined"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template #[`item.active`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
            <v-icon v-else icon="mdi-close"></v-icon>
          </template>

          <template #[`item.name`]="{ value }">
            <v-img :src="value" height="50"></v-img>
          </template>
          <template #[`item.email`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.role`]="{ value }">
            {{ $t('userrole.' + value) }}
          </template>
          <template #[`item.edit`]="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="openDialog(item)"></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent>
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ $t(dialog.id ? 'adminUsers.edit' : 'adminUser.new') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            :label="$t('user.name')"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            v-model="email.value.value"
            :label="$t('user.email')"
            :error-messages="email.errorMessage.value"
            type="email"
          ></v-text-field>
          <v-select
            v-model="role.value.value"
            :error-messages="role.errorMessage.value"
            :items="roleOptions"
            :label="$t('user.role')"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-checkbox
            v-model="active.value.value"
            :label="$t('user.active')"
            :error-messages="active.errorMessage.value"
          ></v-checkbox>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('adminUser.cancel') }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ $t('adminUser.submit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const users = ref([])

const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: t('user.avatar'), key: 'avatar', sortable: false },
    { title: t('user.name'), key: 'name', sortable: true },
    { title: t('user.email'), key: 'email', sortable: true },
    { title: t('user.role'), key: 'role', sortable: true },
    { title: t('user.active'), key: 'active', sortable: true },
    { title: t('user.createdAt'), key: 'createdAt', sortable: true },
    { title: t('user.updatedAt'), key: 'updatedAt', sortable: true },
    { title: t('adminUser.edit'), key: 'edit', sortable: false },
  ]
})

const getUsers = async () => {
  try {
    const { data } = await apiAuth.get('/user/all')
    console.log('API 回傳資料：', data)
    users.value = data.result // 直接賦值，而不是 push
  } catch (error) {
    console.error('取得使用者失敗：', error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
console.log('headers:', headers.value)
console.log('users:', users.value)
getUsers()

const dialog = ref({
  open: false,
  id: '',
})
const openDialog = (item) => {
  if (item) {
    dialog.value.id = item._id
    name.value.value = item.name
    email.value.value = item.email
    role.value.value = item.role
    active.value.value = item.active
  }
  dialog.value.open = true
}
const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  // fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  name: yup.string().required(t('api.userNameRequired')),
  email: yup.string().email(t('api.userEmailInvalid')).required(t('api.userEmailRequired')),
  role: yup.string().required(t('api.userRoleRequired')),
  active: yup.boolean().required(t('api.userActiveRequired')),
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    role: '',
    active: '',
  },
})
const name = useField('name')
const email = useField('email')
const role = useField('role')
const active = useField('active')
const roleOptions = computed(() => [
  { text: t('userRole.admin'), value: 'admin' },
  { text: t('userRole.user'), value: 'user' },
])

const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('email', values.email)
    fd.append('role', values.role)
    fd.append('active', values.active ? '1' : '0')

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/user/' + dialog.value.id, fd)
    } else {
      await apiAuth.post('/user', fd)
    }

    users.value.splice(0, users.value.length)
    getUsers()
    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'adminUser.editSuccess' : 'adminUser.newSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    closeDialog()
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
})
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminUsers'
</route>

<style></style>
