<template>
  <v-main class="container">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center font-weight-bold" style="color: #a59aa3">
            {{ $t('nav.adminCats') }}
          </h1>
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12">
          <v-data-table :items="cats" :headers="headers" class="table" :search="search">
            <template #top>
              <v-toolbar flat>
                <v-btn color="brown" rounded @click="openDialog(null)"
                  ><v-icon>mdi-plus</v-icon> {{ $t('adminCat.new') }}</v-btn
                >
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  variant="plain"
                  class="search-field"
                  placeholder="搜尋貓咪"
                  style="background-color: #e7e4e7; border-radius: 60px"
                  dense
                ></v-text-field>
              </v-toolbar>
            </template>
            <template #[`item.image`]="{ value }">
              <v-img :src="value" height="100" width="100"></v-img>
            </template>
            <template #[`item.isAdopting`]="{ value }">
              <v-icon v-if="value" color="brown">mdi-check-circle</v-icon>
              <v-icon v-else color="red">mdi-close-circle</v-icon>
            </template>
            <template #[`item.age`]="{ value }">
              <span v-if="value" class="text-brown">{{ value }} 歲</span>
              <span v-else class="text-grey--text">未知</span>
            </template>
            <template #[`item.createdAt`]="{ value }">
              <span>{{ new Date(value).toLocaleDateString() }}</span
              ><br />
              <span>{{ new Date(value).toLocaleTimeString() }}</span
              ><br />
            </template>
            <template #[`item.updatedAt`]="{ value }">
              <span>{{ new Date(value).toLocaleDateString() }}</span
              ><br />
              <span>{{ new Date(value).toLocaleTimeString() }}</span
              ><br />
            </template>
            <template #[`item.breed`]="{ value }">
              <span class="text-primary">{{ $t('catBreed.' + value) }}</span>
            </template>
            <template #[`item.gender`]="{ value }">
              <span>{{ $t('catGender.' + value) }}</span>
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn
                icon="mdi-pencil"
                variant="text"
                color="brown"
                @click="openDialog(item)"
              ></v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-dialog v-model="dialog.open" persistent>
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ $t(dialog.id ? 'adminCat.edit' : 'adminCat.new') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name.value.value"
            :label="$t('cat.name')"
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
            v-model="gender.value.value"
            :error-messages="gender.errorMessage.value"
            :items="genderOptions"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-select
            v-model="breed.value.value"
            :error-messages="breed.errorMessage.value"
            :items="breedOptions"
            item-title="text"
            item-value="value"
          ></v-select>
          <v-checkbox
            v-model="isAdopting.value.value"
            :label="$t('cat.isAdopting')"
            :error-messages="isAdopting.errorMessage.value"
          ></v-checkbox>
          <v-textarea
            v-model="description.value.value"
            :label="$t('cat.description')"
            :error-messages="description.errorMessage.value"
          ></v-textarea>
          <VueFileAgent
            ref="fileAgent"
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            :help-text="$t('fileAgent.helpText')"
            :error-text="{ type: $t('fileAgent.errorType'), size: $t('fileAgent.errorSize') }"
            deletable
            max-size="1MB"
            required
          ></VueFileAgent>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('adminCat.cancel') }}</v-btn>
          <v-btn type="submit" :loading="isSubmitting">{{ $t('adminCat.submit') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <v-btn class="excel text-grey bg-gray-darken-2 rounded-lg px-5 mt-4" @click="exportToExcel">
    {{ $t('adminCat.exportExcel') }}
    <v-icon end>mdi-file-excel</v-icon>
  </v-btn>
</template>

<script setup>
import { useAxios } from '@/composables/axios'
import { computed, reactive, ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import * as XLSX from 'xlsx'

const { t } = useI18n()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const cats = reactive([])
// const cats = ref([])
const search = ref('')
const headers = computed(() => {
  return [
    { title: 'ID', key: '_id', sortable: true },
    { title: t('cat.image'), key: 'image', sortable: false },
    { title: t('cat.name'), key: 'name', sortable: false },
    { title: t('cat.age'), key: 'age', sortable: true },
    { title: t('cats.gender'), key: 'gender', sortable: true },
    { title: t('cat.breed'), key: 'breed', sortable: true },
    { title: t('cat.isAdopting'), key: 'isAdopting', sortable: true },
    { title: t('cat.description'), key: 'description', sortable: false },
    { title: t('cat.createdAt'), key: 'createdAt', sortable: true },
    { title: t('cat.updatedAt'), key: 'updatedAt', sortable: true },
    { title: t('adminCat.edit'), key: 'edit', sortable: false },
  ]
})

const getCats = async () => {
  try {
    const { data } = await apiAuth.get('/cat/all')
    cats.push(...data.result)
  } catch (error) {
    createSnackbar({
      text: t('api.' + (error?.response?.data?.message || 'unknownError')),
      snackbarProps: { color: 'rgb(212, 135, 141)' },
    })
  }
}

getCats()

const dialog = ref({
  open: false,
  id: '',
})

const openDialog = (item) => {
  if (item) {
    // 改為使用 breed
    breed.value.value = item.breed || '' // 如果 breed 不存在，設為空字串

    dialog.value.id = item._id
    name.value.value = item.name
    age.value.value = item.age
    description.value.value = item.description
    isAdopting.value.value = Boolean(item.isAdopting)
    // 避免 undefined
    gender.value.value = item.gender
  } else {
    isAdopting.value.value = false // 確保新貓咪的預設值為 false
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
  name: yup.string().required(t('api.catNameRequired')),
  breed: yup
    .string()
    .required(t('api.catBreedRequired'))
    .oneOf(['black', 'orange', 'flower', 'tiger'], t('api.catBreedRequired')),
  age: yup.number().typeError(t('api.catAgeInvalid')).required(t('api.catAgeRequired')),
  description: yup.string().required(t('api.catDescriptionRequired')),
  gender: yup
    .string()
    .required(t('api.catGenderRequired'))
    .oneOf(['Male', 'Female'], t('api.catGenderRequired')),
  isAdopting: yup.boolean().required(t('api.catIsadoptingRequired')),
})
const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    age: '',
    description: '',
    breed: '',
    gender: '',
    isAdopting: false,
  },
})
const name = useField('name')
const age = useField('age')
const breed = useField('breed')
const description = useField('description')
const gender = useField('gender')
const isAdopting = useField('isAdopting', undefined, { initialValue: false })
const breedOptions = computed(() => [
  { text: t('cat.selectBreed'), value: '' },
  { text: t('catBreed.black'), value: 'black' },
  { text: t('catBreed.orange'), value: 'orange' },
  { text: t('catBreed.flower'), value: 'flower' },
  { text: t('catBreed.tiger'), value: 'tiger' },
])
const genderOptions = computed(() => [
  { text: t('cat.selectGender'), value: '' },
  { text: t('catBreed.Male'), value: 'Male' },
  { text: t('catBreed.Female'), value: 'Female' },
])

const fileAgent = ref(null)
const fileRecords = ref([])
const rawFileRecords = ref([])

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (dialog.value.id.length === 0 && fileRecords.value.length === 0) {
    createSnackbar({
      text: t('api.CatImageRequired'),
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
    fd.append('breed', values.breed)
    fd.append('gender', values.gender)
    fd.append('isAdopting', values.isAdopting ? 'true' : 'false')
    if (fileRecords.value.length > 0 && !fileRecords.value[0]?.error) {
      fd.append('image', fileRecords.value[0].file)
    } else {
      // 保留現有圖片或傳 null
      fd.append('image', dialog.value.image || null)
    }

    if (dialog.value.id.length > 0) {
      await apiAuth.patch('/cat/' + dialog.value.id, fd)
    } else {
      // 前端接資料的動作,不一定要寫
      const { data } = await apiAuth.post('/cat', fd)
      console.log(data)
      // await apiAuth.post('/product', fd)
    }

    cats.splice(0, cats.length)
    getCats()
    createSnackbar({
      text: t(dialog.value.id.length > 0 ? 'adminCat.editSuccess' : 'adminCat.newSuccess'),
      snackbarProps: {
        color: 'rgb(117, 117, 117)',
      },
    })
    closeDialog()
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

const exportToExcel = () => {
  if (!cats.length) {
    createSnackbar({
      text: t('adminCat.noDataToExport'),
      snackbarProps: { color: 'red' },
    })
    return
  }

  // 定義要匯出的資料
  const dataToExport = cats.map((cat) => ({
    ID: cat._id,
    名字: cat.name,
    年齡: cat.age,
    性別: t(`catGender.${cat.gender}`),
    品種: t(`catBreed.${cat.breed}`),
    是否可領養: cat.isAdopting ? t('adminCat.yes') : t('adminCat.no'),
    描述: cat.description,
    創建時間: new Date(cat.createdAt).toLocaleString(),
    更新時間: new Date(cat.updatedAt).toLocaleString(),
  }))

  // 轉換為工作表
  const worksheet = XLSX.utils.json_to_sheet(dataToExport)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '貓咪資料')

  // 下載 Excel 檔案
  XLSX.writeFile(workbook, '貓咪資料.xlsx')
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5eef4;
  font-family: 'Zen Old Mincho', serif;
  display: flex;
  justify-content: center;
  align-items: start;
}

.v-container {
  width: 100%;
  height: 100%;
  margin-right: 220px;
}
:deep(.v-data-table tbody tr:hover) {
  background-color: #cfc2cda9 !important;
  transition: background-color 0.3s ease-in-out;
}

.v-toolbar__content {
  background: #e6dee4;
}

.search-field {
  height: 60px;
  padding: 4px;
  text-align: center;
}

.text-primary {
  font-weight: bold;
}

:deep(.v-data-table thead) {
  background-color: #cfc2cd !important;
  color: white !important;
}

.excel {
  position: absolute;
  top: 1100px;
  left: 1725px;
}
</style>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminCats'
</route>
