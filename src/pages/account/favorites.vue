<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">收藏列表</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <!-- 顯示收藏的貓咪列表 -->
    <v-row>
      <v-col v-for="cat in paginatedCats" :key="cat._id" cols="12" md="4">
        <v-card class="mb-4 card-hover">
          <v-img :src="cat.image" height="200px" class="rounded-top"></v-img>
          <v-card-title class="text-center">{{ cat.name }}</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn class="ma-1" @click="removeFavorite(cat._id)">取消收藏 💔</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 分頁 -->
    <v-pagination v-model="currentPage" :length="pageCount" circle class="mt-4" />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const favoriteCats = ref([])

// 載入使用者的收藏貓咪資料
const loadFavorites = async () => {
  try {
    const { data } = await apiAuth.get('/user/favorites') // 後端應返回完整的貓咪資料
    favoriteCats.value = data.result
  } catch (error) {
    console.error(error)
    createSnackbar({
      text: '獲取收藏列表失敗',
      snackbarProps: { color: 'pink' },
    })
  }
}

// 移除收藏
const removeFavorite = async (catId) => {
  try {
    await apiAuth.delete(`/user/favorites/${catId}`)
    favoriteCats.value = favoriteCats.value.filter((cat) => cat._id !== catId)
    createSnackbar({ text: '已取消收藏', snackbarProps: { color: 'brown' } })
  } catch (error) {
    console.error(error)
    createSnackbar({ text: '取消收藏失敗', snackbarProps: { color: 'pink' } })
  }
}

// 當前頁數
const currentPage = ref(1)
const itemsPerPage = 6

// 計算總頁數
const pageCount = computed(() => Math.ceil(favoriteCats.value.length / itemsPerPage))

// 計算當前頁顯示的貓咪
const paginatedCats = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return favoriteCats.value.slice(start, end)
})

// 頁面加載時執行
onMounted(loadFavorites)
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #757575;
}

.v-img {
  border-radius: 10px;
}

/* 卡片邊框和陰影效果 */
.v-card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.562);
  border-radius: 10px;
  overflow: hidden;
  background: #e6c7c7b2;
}

/* 卡片標題樣式 */
.v-card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #757575;
}

/* 按鈕樣式 */
.v-btn {
  font-weight: 600;
  padding: 6px 16px;
  text-transform: none;
  font-family: 'Zen Old Mincho', serif;
}

.ma-1 {
  color: #d86f6f;
}

.card-hover {
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.card-hover:hover {
  transform: scale(1.02);
}

/* 分頁 */
.v-pagination {
  display: flex;
  justify-content: center;
}
</style>

<route lang="yaml">
meta:
  layout: account
  login: true
  admin: false
  title: 'nav.favorites'
</route>
