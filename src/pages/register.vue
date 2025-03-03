<template>
  <v-container class="register-container">
    <v-row justify="center">
      <v-col cols="8" md="10" lg="8">
        <v-card class="pa-5 form-card">
          <v-card-title class="text-center text-h4 register">{{ $t('nav.register') }}</v-card-title>
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
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              :label="$t('user.email')"
              prepend-inner-icon="mdi-email"
            />
            <v-text-field
              v-model="password.value.value"
              :type="showPassword ? 'text' : 'password'"
              :error-messages="password.errorMessage.value"
              :label="$t('user.password')"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              minlength="4"
              maxlength="15"
              counter
              class="input-field"
              @click:append-inner="togglePasswordVisibility"
            />
            <v-text-field
              v-model="passwordConfirm.value.value"
              :type="showPasswordConfirm ? 'text' : 'password'"
              :error-messages="passwordConfirm.errorMessage.value"
              :label="$t('user.passwordConfirm')"
              prepend-inner-icon="mdi-check"
              :append-inner-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
              minlength="4"
              maxlength="15"
              counter
              @click:append-inner="togglePasswordConfirmVisibility"
            />
            <div class="text-center mt-2">
              <v-btn :loading="isSubmitting" type="submit" color="#a49393">
                <v-icon>mdi-account-plus</v-icon>
                {{ $t('register.submit') }}</v-btn
              >
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
import { ref } from 'vue'

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
const router = useRouter()

// 切換顯示、隱藏密碼
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordConfirmVisibility = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}
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
  email: yup
    .string()
    .required(t('api.userEmailRequired'))
    .test('isEmail', t('api.userEmailInvalid'), (value) => validator.isEmail(value)),
  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(15, t('api.userPasswordTooLong')),
  passwordConfirm: yup
    .string()
    .required(t('api.userPasswordConfirm'))
    // .oneOf(陣列, 訊息)  必須要是陣列內其中一個值
    // .ref(欄位名稱)      取得欄位的值
    // .ref('password')   password 欄位的值
    .oneOf([yup.ref('password')], t('api.userPasswordNotMatch')),
  phone: yup
    .string()
    .nullable() // 讓 phone 欄位可以是 null
    .notRequired(), // 使 phone 欄位成為可選
})

// 此種寫法只能一個頁面使用一個 form 標籤
// 建立表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})
// 建立欄位
const account = useField('account')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (values) => {
  try {
    await api.post('/user', {
      account: values.account,
      email: values.email,
      password: values.password,
    })
    createSnackbar({
      text: t('register.success'),
      snackbarProps: {
        color: 'rgb(117, 117, 117)',
      },
    })
    router.push('/login')
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
.register-container {
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
.register {
  font-family: 'Zen Old Mincho', serif;
  color: #757575;
}

.submit {
  background: #a49393;
}
</style>

<route lang="yaml">
meta:
  title: 'nav.register'
</route>
