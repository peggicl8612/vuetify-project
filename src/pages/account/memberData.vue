<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

console.log(user.id)

// 定義驗證規則
const schema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, '請輸入正確的手機號碼') // 10 位數字驗證
    .required('此欄位為必填'),
})

// 設定表單
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

// 設定表單欄位
const phone = useField('phone') // 使用 vee-validate 來綁定欄位和錯誤訊息

// 提交表單
const submitForm = handleSubmit(async (values) => {
  try {
    await axios.patch(`/user/${user.id}`, { phone: values.phone })
    alert('資料已成功保存')
  } catch (error) {
    console.error('保存資料失敗:', error)
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>會員資料</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-form @submit.prevent="submitForm">
      <v-row>
        <!-- 使用者帳號（不可修改） -->
        <v-col cols="12" md="8">
          <v-text-field v-model="user.account" label="使用者帳號" outlined></v-text-field>
        </v-col>

        <!-- 電子信箱（不可修改） -->
        <v-col cols="12" md="8">
          <v-text-field v-model="user.email" label="電子郵件" outlined></v-text-field>
        </v-col>

        <!-- 電話（可編輯） -->
        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone.value.value"
            label="電話"
            :error-messages="errorMessage"
            outlined
          ></v-text-field>

          <VueFileAgent
            v-model="photo"
            accept="image/jpeg,image/png"
            :help-text="$t('adopt.photoHelpText')"
            :error-text="$t('adopt.photoErrorText')"
            :error-messages="photoError"
            deletable
            required
          ></VueFileAgent>
        </v-col>

        <!-- 提交按鈕 -->
        <v-col cols="12">
          <v-btn type="submit" color="primary" :loading="isSubmitting">保存</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<route lang="yaml">
meta:
  layout: account
  login: true
  admin: false
  title: 'nav.account'
</route>
