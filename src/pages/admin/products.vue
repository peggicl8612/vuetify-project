<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('nav.adminProducts') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <v-data-table :items="products" :headers="headers" :search="search">
          <template #top>
            <v-toolbar>
              <v-btn @click="openDialog(null)">{{ $t('adminProduct.new') }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                variant="underlined"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template #[`item.image`]="{ value }">
            <v-img :src="value" height="50"></v-img>
          </template>
          <template #[`item.sell`]="{ value }">
            <v-icon v-if="value" icon="mdi-check"></v-icon>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.breed`]="{ value }">
            {{ $t('catBreed.' + value) }}
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
        <v-card-title>{{ $t(dialog.id ? 'adminProduct.edit' : 'adminProduct.new') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            :label="$t('product.name')"
            :error-messages="name.errorMessage.value"
          ></v-text-field>
          <v-text-field
            v-model="age.value.value"
            :label="$t('cat.age')"
            :error-messages="age.errorMessage.value"
            type="number"
            min="0"
          ></v-text-field>
          <v-select
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
            :items="categoryOptions"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-checkbox
            v-model="sell.value.value"
            :label="$t('product.onSell')"
            :error-messages="sell.errorMessage.value"
          ></v-checkbox>
          <v-textarea
            v-model="description.value.value"
            :label="$t('product.description')"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
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
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('adminProduct.cancel') }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ $t('adminProduct.submit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { reactive, computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const products = reactive([])
const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: t('product.image'), key: 'image', sortable: false },
    { title: t('product.name'), key: 'name', sortable: true },
    { title: t('product.description'), key: 'description', sortable: true },
    { title: t('cat.age'), key: 'age', sortable: true },
    { title: t('cat.category'), key: 'category', sortable: true },
    { title: t('product.sell'), key: 'sell', sortable: true },
    { title: t('product.createdAt'), key: 'createdAt', sortable: true },
    { title: t('product.updatedAt'), key: 'updatedAt', sortable: true },
    { title: t('adminProduct.edit'), key: 'edit', sortable: false },
  ]
})

const getProducts = async () => {
  try {
    const { data } = await apiAuth.get('/product/all')
    products.push(...data.result)
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
getProducts()

const dialog = ref({
  open: false,
  id: '',
})
const openDialog = (item) => {
  if (item) {
    console.log('item.category:', item.category) // 確認這裡的值是否正確
    category.value.value = ['black', 'orange', 'flower', 'tiger'].includes(item.category)
      ? item.category
      : '' // 如果 category 無效，就設為空值
    console.log('category.value.value:', category.value.value)

    dialog.value.id = item._id
    name.value.value = item.name
    age.value.value = item.age
    description.value.value = item.description
    // category.value.value = item.category
    sell.value.value = item.sell
  }
  dialog.value.open = true
}
const closeDialog = () => {
  resetForm()
  dialog.value.id = ''
  dialog.value.open = false
  fileAgent.value.deleteFileRecord()
}

const schema = yup.object({
  name: yup.string().required(t('api.CatNameRequired')),
  age: yup
    .number()
    .typeError(t('api.catAgeRequired'))
    .required(t('api.catAgeRequired'))
    .min(0, t('api.catAgeTooSmall')),
  description: yup.string().required(t('api.productDescriptionRequired')),
  category: yup
    .string()
    .trim()
    .required(t('api.catBreedRequired'))
    .oneOf(['black', 'orange', 'flower', 'tiger'], t('api.catBreedRequired')),
  sell: yup.boolean().required(t('api.productSellRequired')),
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    age: 0,
    description: '',
    category: '',
    sell: false,
  },
})
const name = useField('name')
const age = useField('age')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')
const categoryOptions = computed(() => [
  { text: t('cat.selectCategory'), value: '' },
  { text: t('catBreed.black'), value: 'black' },
  { text: t('catBreed.orange'), value: 'orange' },
  { text: t('catBreed.flower'), value: 'flower' },
  { text: t('catBreed.tiger'), value: 'tiger' },
])

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  console.log('提交的值:', values)
  console.log('category 值:', values.category)
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: t('api.productImageRequired'),
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }

  try {
    const fd = new FormData()
    // fd.append(key, value)
    fd.append('name', values.name)
    fd.append('age', values.age)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('sell', values.sell)
    if (fileRecords.value.length > 0) {
      fd.append('image', fileRecords.value[0].file)
    }

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/product/' + dialog.value.id, fd)
    } else {
      // 前端接資料的動作,不一定要寫
      const { data } = await apiAuth.post('/product', fd)
      console.log(data)
      // await apiAuth.post('/product', fd)
    }

    products.splice(0, products.length)
    getProducts()
    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'adminProduct.editSuccess' : 'adminProduct.newSuccess'),
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
  title: 'nav.adminAdopting'
</route>
