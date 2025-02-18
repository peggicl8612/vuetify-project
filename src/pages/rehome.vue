<template>
  <v-container>
    <v-row class="d-flex justify-center py-4">
      <v-col cols="12" md="8">
        <v-card class="custom-card">
          <v-card-title class="text-h4 text-center">{{ $t('adopt.formTitle') }}</v-card-title>
          <v-card-text>
            <!-- 綁定 submit 函式到表單 -->
            <v-form ref="form" :disabled="isSubmitting" @submit.prevent="submit">
              <v-text-field
                v-model="name"
                :label="$t('adopt.catName')"
                :error-messages="nameError"
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
                :error-messages="ageError"
                required
                outlined
                dense
                class="custom-input"
              ></v-text-field>

              <v-select
                v-model="breed"
                :items="breedOptions"
                item-text="title"
                item-value="value"
                :label="$t('adopt.catBreed')"
                :error-messages="breedError"
                required
                outlined
                dense
                class="custom-input"
              ></v-select>

              <v-text-field
                v-model="email"
                :label="$t('adopt.email')"
                :error-messages="emailError"
                required
                outlined
                dense
                class="custom-input"
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
            </v-form>
          </v-card-text>

          <v-card-actions class="d-flex justify-end">
            <v-btn color="grey" outlined @click="resetForm">{{ $t('adopt.cancel') }}</v-btn>
            <v-btn type="submit" :loading="isSubmitting" color="primary">{{
              $t('adopt.submit')
            }}</v-btn>
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
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const breedOptions = computed(() => [
  { title: t('catBreed.black'), value: 'black' },
  { title: t('catBreed.orange'), value: 'orange' },
  { title: t('catBreed.flower'), value: 'flower' },
  { title: t('catBreed.tiger'), value: 'tiger' },
])

const form = ref({
  name: '',
  age: '',
  breed: '',
  photo: null,
  email: '',
})

const { handleSubmit, resetForm, isSubmitting } = useForm({
  initialValues: form.value,
  validationSchema: yup.object({
    name: yup.string().required(t('adopt.catNameRequired')),
    age: yup.number().required(t('adopt.catAgeRequired')).min(0, t('adopt.catAgeTooSmall')),
    breed: yup.string().required(t('adopt.catBreedRequired')),
    photo: yup.mixed().required(t('adopt.catPhotoRequired')),
    email: yup.string().email(t('adopt.emailInvalid')).required(t('adopt.emailRequired')),
  }),
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: age, errorMessage: ageError } = useField('age')
const { value: breed, errorMessage: breedError } = useField('breed')
const { value: email, errorMessage: emailError } = useField('email')
const { value: photo, errorMessage: photoError } = useField('photo')

const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('age', values.age)
    fd.append('breed', values.breed)
    fd.append('email', values.email)
    if (values.photo) fd.append('photo', values.photo)

    // 调用后台API保存送养信息
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
