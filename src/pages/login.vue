<template>
  <v-container class="login-container">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-5 form-card">
          <v-card-title class="text-center text-h4 login">{{ $t('nav.login') }}</v-card-title>
          <v-divider class="my-3"></v-divider>
          <v-form :disabled="isSubmitting" @submit.prevent="submit">
            <v-text-field
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"
              :label="$t('user.account')"
              prepend-inner-icon="mdi-account"
              minlength="4"
              maxlength="15"
              counter
            />
            <v-text-field
              v-model="password.value.value"
              type="password"
              :error-messages="password.errorMessage.value"
              :label="$t('user.password')"
              prepend-inner-icon="mdi-lock"
              minlength="4"
              maxlength="15"
              counter
            />
            <div class="text-center">
              <v-btn :loading="isSubmitting" type="submit" color="#a49393">{{
                $t('login.submit')
              }}</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  account: yup
    // 資料型態是文字
    .string()
    // 必填
    .required(t('api.userAccountRequired'))
    // 最短長度
    .min(4, t('api.userAccountTooShort'))
    // 最長長度
    .max(15, t('api.userAccountTooLong'))
    // 自訂驗證(自訂驗證名稱, 錯誤訊息, function)
    .test('isAlphanumeric', t('api.userAccountInvalid'), (value) =>
      validator.isAlphanumeric(value),
    ),
  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(15, t('api.userPasswordTooLong')),
})

// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/user/login', {
      account: values.account,
      password: values.password,
    })
    user.login(data.result)
    createSnackbar({
      text: t('login.success'),
      snackbarProps: {
        color: 'rgb(117, 117, 117)',
      },
    })
    // 登入後到首頁
    router.push('/home')
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'rgb(212, 135, 141)',
      },
    })
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.form-card {
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0px 0px 2px #a49393;
  border: 3px dashed #a49393;
  font-family: 'Zen Old Mincho', serif;
  background: #f0e9df;
}
.login {
  font-family: 'Zen Old Mincho', serif;
  color: #757575;
}
</style>

<route lang="yaml">
meta:
  title: 'nav.login'
</route>
