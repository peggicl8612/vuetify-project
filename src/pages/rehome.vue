<template>
  <v-main class="main">
    <v-container>
      <v-row class="d-flex justify-center py-4">
        <v-col cols="12" md="8">
          <v-form ref="form" :disabled="isSubmitting" @submit.prevent="submitForm">
            <v-card class="custom_card">
              <v-card-title class="text-h4 text-center">{{ $t('rehome.formTitle') }}</v-card-title>
              <v-card-text>
                <v-card>
                  <v-card-text>
                    <v-text-field
                      v-model="name.value.value"
                      :label="$t('rehome.catName')"
                      :error-messages="name.errorMessage.value"
                      required
                      outlined
                      dense
                      class="keyin"
                    ></v-text-field>

                    <v-text-field
                      v-model="age.value.value"
                      :label="$t('rehome.catAge')"
                      type="number"
                      min="0"
                      :error-messages="age.errorMessage.value"
                      required
                      outlined
                      dense
                      class="keyin"
                    ></v-text-field>

                    <v-select
                      v-model="category.value.value"
                      :items="breedOptions"
                      item-text="title"
                      item-value="value"
                      :label="$t('rehome.catBreed')"
                      :error-messages="category.errorMessage.value"
                      required
                      outlined
                      dense
                      class="keyin"
                    ></v-select>

                    <v-select
                      v-model="gender.value.value"
                      :items="genderOptions"
                      item-text="title"
                      item-value="value"
                      :label="$t('rehome.catGender')"
                      :error-messages="gender.errorMessage.value"
                      required
                      outlined
                      dense
                      class="keyin"
                    ></v-select>

                    <v-text-field
                      v-model="description.value.value"
                      :label="$t('rehome.catDescription')"
                      :error-messages="description.errorMessage.value"
                      outlined
                      required
                      dense
                      class="keyin"
                    ></v-text-field>

                    <v-text-field
                      v-model="user.email"
                      :label="$t('user.email')"
                      :error-messages="errors.email"
                      disabled
                      required
                      outlined
                      dense
                      class="keyin"
                    ></v-text-field>

                    <!-- 照片欄位 -->
                    <VueFileAgent
                      ref="fileAgent"
                      v-model="fileRecords"
                      v-model:raw-model-value="rawFileRecords"
                      accept="image/jpeg,image/png"
                      :help-text="$t('rehome.photoHelpText')"
                      :error-text="$t('rehome.photoErrorText')"
                      :error-messages="errors.photo"
                      deletable
                      max-size="1MB"
                      required
                    ></VueFileAgent>
                  </v-card-text>
                </v-card>

                <v-card-actions class="d-flex justify-end">
                  <v-btn color="grey" outlined @click="resetForm">{{ $t('rehome.cancel') }}</v-btn>
                  <v-btn type="submit" color="pink" :loading="isSubmitting">
                    {{ $t('rehome.submit') }}
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const user = useUserStore()

const schema = yup.object({
  name: yup.string().required(t('api.catNameRequired')),
  age: yup.number().required(t('api.catAgeRequired')).min(0, t('api.catAgeTooSmall')),
  category: yup
    .string()
    .trim()
    .required(t('api.catBreedRequired'))
    .oneOf(['black', 'orange', 'flower', 'tiger'], t('api.catBreedRequired')),
  gender: yup.string().required(t('api.catGenderRequired')),
  // image: yup.string().required(t('api.catImageRequired')),
  description: yup.string().required(t('api.catDescriptionRequired')),
})

// 使用 useForm
const { handleSubmit, resetForm, isSubmitting, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    age: '',
    category: '',
    gender: '',
    description: '',
  },
})

// 使用 useField() 對每個表單字段進行綁定
const name = useField('name')
const age = useField('age')
const category = useField('category')
const gender = useField('gender')
const description = useField('description')

// const { value: name, errorMessage: nameError } = useField('name')
// const { value: age, errorMessage: ageError } = useField('age')
// const { value: category, errorMessage: categoryError } = useField('category')
// const { value: gender, errorMessage: genderError } = useField('gender')
// const { value: description, errorMessage: descriptionError } = useField('description')

const breedOptions = computed(() => [
  { title: t('cat.selectCategory'), value: '' },
  { title: t('catBreed.black'), value: 'black' },
  { title: t('catBreed.orange'), value: 'orange' },
  { title: t('catBreed.flower'), value: 'flower' },
  { title: t('catBreed.tiger'), value: 'tiger' },
])

const genderOptions = computed(() => [
  { title: t('catGender.male'), value: 'male' },
  { title: t('catGender.female'), value: 'female' },
])

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

// 提交
const submitForm = handleSubmit(async (values) => {
  console.log('submitForm triggered')
  console.log('isSubmitting:', isSubmitting.value)
  try {
    if (Object.keys(errors.value).length > 0) {
      return
    }

    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('age', values.age)
    fd.append('breed', values.category)
    fd.append('gender', values.gender)
    fd.append('description', values.description)
    fd.append('email', user.email)

    // 照片
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    await apiAuth.post('/rehome', fd)

    createSnackbar({
      text: t('rehome.submitSuccess'),
      snackbarProps: {
        color: 'rgb(117, 117, 117)',
      },
    })

    resetForm()
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: t('rehome.submitError'),
      snackbarProps: {
        color: 'rgb(212, 135, 141)',
      },
    })
  } finally {
    isSubmitting.value = false
  }
})
</script>

<style scoped>
.container,
.v-container,
.v-row {
  margin: 0;
  padding: 0;
}

v-main {
  height: 100%;
}

.main {
  text-align: center;
  padding: 20px;
  font-family: 'Zen Old Mincho', serif;
  position: relative;
  min-height: 100vh;
}

.main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://i.imgur.com/NPN9YTz.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: 0;
}

.custom_card {
  background-color: #f0e9df;
  opacity: 0.8;
  color: #757575;
}
</style>
