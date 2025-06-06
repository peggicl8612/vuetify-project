<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ cat.name }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="6">
        <v-img :src="product.image"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <p>{{ $t('catBreed.' + cat.breed) }}</p>
        <p>{{ product.price }}</p>
        <p>{{ product.description }}</p>
        <v-form :disabled="isSubmitting" @submit.prevent="submit">
          <v-text-field
            v-model.number="quantity.value.value"
            type="number"
            :error-messages="quantity.errorMessage.value"
          ></v-text-field>
          <v-btn type="submit" prepend-icon="mdi-cart" :loading="isSubmitting">{{
            $t('product.addCart')
          }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay
    :model-value="!product.sell"
    class="align-center justify-center"
    scrim="black"
    opacity="0.8"
    persistent
  >
    <h1 class="text-center">{{ $t('api.productNotOnSell') }}</h1>
  </v-overlay>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from 'vuetify-use-dialog'

const { api, apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const user = useUserStore()
const createSnackbar = useSnackbar()

const cat = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  image: '',
  sell: true,
  breed: '',
})

const getProduct = async () => {
  try {
    const { data } = await api.get('/product/' + route.params.id)
    cat.value = data.result
    document.title = cat.value.name + ' | 咪凹屋'
  } catch (error) {
    console.log(error)
    router.push('/')
  }
}
getProduct()

const schema = yup.object({
  quantity: yup
    .number()
    .typeError(t('product.addCartQuantityInvalid'))
    .required(t('product.addCartQuantityInvalid'))
    .positive(t('product.addCartQuantityInvalid'))
    .integer(t('product.addCartQuantityInvalid')),
})
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    quantity: 1,
  },
})
const quantity = useField('quantity')

const submit = handleSubmit(async (values) => {
  if (!user.isLoggedIn) {
    router.push('/login')
    return
  }
  try {
    const { data } = await apiAuth.patch('/user/cart', {
      cat: cat.value._id,
      quantity: values.quantity,
    })
    user.cart = data.result
    createSnackbar({
      text: t('product.addCartSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
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
  title: 'nav.product'
</route>
