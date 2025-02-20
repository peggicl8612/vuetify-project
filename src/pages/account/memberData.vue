<template>
  <v-container class="container">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="title">會員資料</h1>
        <v-divider class="divider"></v-divider>
      </v-col>
    </v-row>

    <v-form class="form-box" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="user.account"
            label="使用者帳號"
            outlined
            disabled
            class="rounded"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="user.email"
            label="電子郵件"
            outlined
            disabled
            class="rounded"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="phone.value.value"
            label="電話"
            :error-messages="phone.errorMessage.value"
            outlined
            class="rounded"
          ></v-text-field>
        </v-col>

        <VueFileAgent
          ref="fileAgent"
          v-model="fileRecords"
          v-model:raw-model-value="rawFileRecords"
          accept="image/jpeg,image/png"
          deletable
          max-size="1MB"
          :help-text="$t('fileAgent.helpText')"
          :error-text="{ type: $t('fileAgent.errorType'), size: $t('fileAgent.errorSize') }"
        ></VueFileAgent>

        <!-- <v-col cols="12" md="6">
          <VueFileAgent
            v-model="image"
            accept="image/jpeg,image/png"
            class="photo-upload"
            deletable
            required
          ></VueFileAgent>
        </v-col> -->

        <v-col cols="12" class="text-center">
          <v-btn type="submit" color="pink" class="cute-btn" :loading="isSubmitting">💾 保存</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'

const { apiAuth } = useAxios()

const user = useUserStore()

const schema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, '請輸入正確的手機號碼')
    .required('此欄位為必填'),
})
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    phone: user.phone,
  },
})
const phone = useField('phone')

const uploadAvatar = async (file) => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const { data } = await apiAuth.post('/upload-avatar', formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    user.image = data.image // 更新
  } catch (error) {
    console.log('上傳失敗', error.response?.data?.message || error.message)
    console.log('大頭貼', uploadAvatar)
  }
}

// const onFileChange = async (event) => {
//   const file = event.target.files[0]
//   if (file) {
//     await uploadAvatar(file)
//     event.target.value = ''
//   }
// }

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

// const phone = useField('phone', { initialValue: user.phone })
const submitForm = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (fileRecords.value.length === 0) {
    alert('請上傳圖片')
    return
  }

  try {
    const fd = new FormData()
    fd.append('phone', values.phone)
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }
    console.log(fd)

    await apiAuth.patch('/user/' + user.id, fd)

    alert('資料已成功保存')
  } catch (error) {
    console.error('保存資料失敗:', error)
    alert('保存失敗，請稍後再試')
  }
})
</script>

<style scoped>
.container {
  background-color: #f5f1e2;
  border-radius: 16px;
  padding: 80px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 1500px;
  height: 820px;
}
.title {
  font-family: 'Zen Old Mincho', serif;
  color: #757575;
}
.divider {
  border-color: #757575;
}
.form-box {
  background: #f7f5ecaf;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(211, 210, 148, 0.3);
}
.rounded {
  border-radius: 12px;
}
.cute-btn {
  background-color: #757575 !important;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  font-family: 'Zen Old Mincho', serif;
}
.photo-upload {
  border: 2px dashed #757575;
  border-radius: 12px;
  padding: 10px;
}
</style>

<route lang="yaml">
meta:
  layout: account
  login: true
  admin: false
  title: 'nav.account'
</route>
