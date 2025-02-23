<template>
  <v-container class="py-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminUsers') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table
          class="elevation-3 rounded-lg hover_table"
          :items="users"
          :headers="headers"
          :search="search"
          density="compact"
        >
          <template #top>
            <v-toolbar class="mb-2">
              <v-btn
                class="text-white bg-brown-lighten-3 rounded-lg px-5"
                @click="openDialog(null)"
              >
                {{ $t('adminUser.new') }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                variant="underlined"
                label="搜尋使用者"
                class="w-40"
              ></v-text-field>
            </v-toolbar>
          </template>

          <template #[`item.active`]="{ value }">
            <v-icon :color="value ? 'green' : 'red'">{{
              value ? 'mdi-checkbox-blank-circle-outline' : 'mdi-close'
            }}</v-icon>
          </template>

          <template #[`item.username`]="{ value }">
            <span>{{ value }}</span>
          </template>
          <template #[`item.image`]="{value}">
            <v-img
            :src="value"
            width="50"
            height="50"
            class="rounded-circle"
            contain
            ></v-img>
          </template>
          <template #[`item.email`]="{ value }">
            <!-- -icon 替換成 v-text 來呈現 email -->
            <span>{{ value }}</span>
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
            <v-btn
              icon="mdi-pencil"
              variant="text"
              class="text-brown-darken-1"
              @click="openDialog(item)"
            ></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog.open" persistent max-width="600px">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card class="rounded-lg">
        <v-card-title class="text-h5 font-weight-bold" font-family="Junge">
          {{ $t(dialog.id ? 'adminUsers.edit' : 'adminUser.new') }}</v-card-title
        >
        <v-card-text class="py-4">
          <v-text-field
            v-model="username.value.value"
            :label="$t('user.username')"
            :error-messages="username.errorMessage.value"
            readonly
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="email.value.value"
            :label="$t('user.email')"
            :error-messages="email.errorMessage.value"
            type="email"
            readonly
            variant="outlined"
          ></v-text-field>
          <v-select
            v-model="role.value.value"
            :error-messages="role.errorMessage.value"
            :items="roleOptions"
            :label="$t('user.role')"
            item-title="text"
            item-value="value"
            variant="outlined"
          ></v-select>
          <v-checkbox
            v-model="active.value.value"
            :label="$t('user.active')"
            :error-messages="active.errorMessage.value"
            icon="mdi-check"
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

const user = ref({
  username: '', // 使用者名稱
  email: '', // 使用者 email
  role: '', // 使用者角色
  active: true, // 是否啟用
})

const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: t('user.image'), key: 'image', sortable: false },
    { title: t('user.username'), key: 'account', sortable: true },
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
    users.value = data.result.map((user) => ({
      ...user,
      active: user.active !== undefined ? user.active : true,
    }))
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
    setValues({
      username: item.account || '',
      email: item.email || '',
      role: item.role || '0',
      active: item.active !== undefined ? item.active : true,
    })
  } else {
    setValues({
      username: '',
      email: '',
      role: '0', // 預設角色為一般使用者
      active: true, // 預設為啟用
    })
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
  username: yup.string().required(t('api.userNameRequired')),
  email: yup.string().email(t('api.userEmailInvalid')).required(t('api.userEmailRequired')),
  role: yup.string().required(t('api.userRoleRequired')),
  active: yup.boolean().required(t('api.userActiveRequired')),
})
const { handleSubmit, isSubmitting, resetForm, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    username: '',
    email: '',
    role: '',
    active: true,
  },
})
const username = useField('username', { initialValue: user.value.username })
const email = useField('email', { initialValue: user.value.email })
const role = useField('role', { initialValue: user.value.role })
const active = useField('active', { initialValue: true })
const roleOptions = computed(() => [
  { text: t('userRole.admin'), value: '1' },
  { text: t('userRole.user'), value: '0' },
])

const submit = handleSubmit(async (values) => {
  console.log('Submitting:', values)

  try {
    const fd = new FormData()
    fd.append('username', values.username)
    fd.append('email', values.email)
    fd.append('role', values.role)
    fd.append('active', values.active ? '1' : '0')

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/user/' + dialog.value.id, fd)
      // 更新 `users` 陣列內對應的 user
      const index = users.value.findIndex((u) => u._id === dialog.value.id)
      if (index !== -1) {
        users.value[index].active = values.active // 直接更新資料
      }
    } else {
      const { data } = await apiAuth.post('/user', fd)
      users.value.push(data.result) // 直接新增至 users 陣列
    }

    // users.value.splice(0, users.value.length)
    // getUsers()
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

<style>
.hover_table tbody tr:hover {
  background-color: #f0e9df;
  transition: background-color 0.2s ease-in-out;
}

body {
  background-color: #f4f7fa; /* 淺灰藍色背景 */
}
</style>
