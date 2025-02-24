<template>
  <v-container>
    <v-row class="d-flex justify-center py-4">
      <v-col cols="12" md="8">
        <v-card class="custom-card">
          <v-card-title class="text-h4 text-center">{{ $t('adopt.formTitle') }}</v-card-title>
          <v-card-text>
            <v-form ref="form" :disabled="isSubmitting" @submit.prevent="submitForm">
              <v-card>
                <v-card-text>
                  <v-text-field
                    v-model="name"
                    :label="$t('adopt.catName')"
                    :error-messages="errors.name"
                    required
                    outlined
                    dense
                    class="custom-input"
                  ></v-text-field>

                  <v-text-field
                    v-model="age"
                    :label="$t('adopt.catAge')"
                    type="number"
                    min="0"
                    :error-messages="errors.age"
                    required
                    outlined
                    dense
                    class="custom-input"
                  ></v-text-field>

                  <!-- 類別欄位 -->
                  <v-select
                    v-model="category"
                    :items="breedOptions"
                    item-text="title"
                    item-value="value"
                    :label="$t('adopt.catBreed')"
                    :error-messages="errors.breed"
                    required
                    outlined
                    dense
                    class="custom-input"
                  ></v-select>

                  <v-text-field
                    v-model="user.email"
                    :label="$t('user.email')"
                    :error-messages="errors.email"
                    disabled
                    required
                    outlined
                    dense
                    class="custom-input"
                  ></v-text-field>

                  <!-- 照片欄位 -->
                  <VueFileAgent
                    ref="fileAgent"
                    v-model="fileRecords"
                    v-model:raw-model-value="rawFileRecords"
                    accept="image/jpeg,image/png"
                    :help-text="$t('adopt.photoHelpText')"
                    :error-text="$t('adopt.photoErrorText')"
                    :error-messages="errors.photo"
                    deletable
                    max-size="1MB"
                    required
                  ></VueFileAgent>
                </v-card-text>
              </v-card>
            </v-form>
          </v-card-text>

          <v-card-actions class="d-flex justify-end">
            <v-btn color="grey" outlined @click="resetForm">{{ $t('adopt.cancel') }}</v-btn>
            <v-btn type="submit" :loading="isSubmitting" color="primary">
              {{ $t('adopt.submit') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const user = useUserStore()
const category = ref('')
const name = ref('')
const age = ref('')
const breedOptions = computed(() => [
  { title: t('cat.selectCategory'), value: '' },
  { title: t('catBreed.black'), value: 'black' },
  { title: t('catBreed.orange'), value: 'orange' },
  { title: t('catBreed.flower'), value: 'flower' },
  { title: t('catBreed.tiger'), value: 'tiger' },
])

const fileRecords = ref([])
const rawFileRecords = ref([])

const schema = yup.object({
  name: yup.string().required(t('api.CatNameRequired')),
  age: yup
    .number()
    .typeError(t('api.catAgeRequired'))
    .required(t('api.catAgeRequired'))
    .min(0, t('api.catAgeTooSmall')),
  category: yup
    .string()
    .trim()
    .required(t('api.catBreedRequired'))
    .oneOf(['black', 'orange', 'flower', 'tiger'], t('api.catBreedRequired')),
})

// 使用 useForm 來處理表單提交
const { handleSubmit, resetForm, isSubmitting, errors } = useForm({
  validationSchema: schema,
})

// 提交表單
const submitForm = handleSubmit(async (values) => {
  try {
    // 檢查是否有錯誤訊息
    if (Object.keys(errors.value).length > 0) {
      return
    }

    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('age', values.age)
    fd.append('breed', values.breed)
    fd.append('email', values.email)

    // 只取第一張圖片
    if (values.photo && values.photo.length > 0) {
      fd.append('photo', values.photo[0].file)
    }

    // 送出 API
    await apiAuth.post('/adopt/cat', fd)

    createSnackbar({
      text: t('adopt.submitSuccess'),
      snackbarProps: { color: 'green' },
    })

    resetForm()
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: t('adopt.submitError'),
      snackbarProps: { color: 'red' },
    })
  }
})
</script>

<style scoped>
.custom-card {
  background-color: #f0e9df;
  color: #757575;
}

.custom-input .v-input__control {
  background-color: #ffffff;
}

.custom-input .v-input__label {
  color: #757575;
}
</style>
