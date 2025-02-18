<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="搜尋可愛貓咪 💕"
          rounded="lg"
          color="pink lighten-3"
          variant="outlined"
        ></v-text-field>
      </v-col>

      <!-- 設定卡片等高並且並排 -->
      <v-row justify="center" align="stretch">
        <v-col
          v-for="product of filteredProducts"
          :key="product._id"
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="d-flex"
        >
          <v-card class="cute-card" elevation="5">
            <product-card v-bind="product"></product-card>

            <!-- 愛心按鈕 -->
            <v-btn
              class="likebtn"
              icon
              :color="product.liked ? 'red' : 'grey'"
              @click="toggleLike(product)"
            >
              <v-icon>{{ product.liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <v-col cols="12" class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
          rounded="lg"
          color="pink lighten-2"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import ProductCard from '@/components/ProductCard.vue'

const { api } = useAxios()

const ITEMS_PER_PAGE = 6
const currentPage = ref(1)
const totalPage = computed(() => Math.ceil(products.value.length / ITEMS_PER_PAGE))

const products = ref([])
const search = ref('')

const filteredProducts = computed(() => {
  return products.value
    .filter((product) => product.name.toLowerCase().includes(search.value.toLowerCase()))
    .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
})

const getProducts = async () => {
  try {
    const { data } = await api.get('/product')
    products.value.push(...data.result)
  } catch (error) {
    console.log(error)
  }
}
getProducts()

const toggleLike = async (product) => {
  product.liked = !product.liked

  // 發送更新請求到後端
  try {
    const response = await api.patch('/user/like', {
      productId: product._id, // 產品 ID
      liked: product.liked, // 喜愛狀態
    })

    console.log(response.data.message) // 顯示成功訊息
  } catch (error) {
    console.error('更新喜好狀態時出錯:', error)
  }

  // 本地儲存更新的產品資料
  localStorage.setItem('likedProducts', JSON.stringify(products.value))
}
</script>

<style>
.cute-card {
  background-color: #ffe3e3 !important;
  border-radius: 15px !important;
  padding: 10px;
  font-family: 'Zen Old Mincho', serif;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.cute-card:hover {
  transform: scale(1.05);
}

/* 喜歡按鈕 */
.likebtn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>

<route lang="yaml">
meta:
  login: false
  admin: false
  title: 'nav.home'
</route>
