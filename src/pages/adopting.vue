<template>
  <v-main class="container">
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
        <v-row justify="center" align="stretch" no-gutters>
          <v-col
            v-for="cat of filteredCats"
            :key="cat._id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="d-flex"
          >
            <v-card class="cute-card" elevation="5">
              <product-card v-bind="cat"></product-card>

              <!-- 愛心按鈕 -->
              <div class="like_container">
                <v-btn
                  class="likebtn"
                  icon
                  :color="cat.liked ? 'pink' : 'grey'"
                  @click="toggleLike(cat)"
                >
                  <v-icon>{{ cat.liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                </v-btn>
                <span class="like_count">{{ cat.likes }}</span>
              </div>
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
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import ProductCard from '@/components/ProductCard.vue'

const { api, apiAuth } = useAxios()

const ITEMS_PER_PAGE = 8
const currentPage = ref(1)
const totalPage = computed(() => Math.ceil(cats.value.length / ITEMS_PER_PAGE))

const cats = ref([]) // 用來儲存所有貓咪資料
const search = ref('') // 搜尋框內容
const userFavorites = ref([]) // 用來儲存使用者已經按過讚的貓咪 ID

// const filteredCats = computed(() => {
//   // 先過濾搜尋條件，再進行分頁
//   const filtered = cats.value.filter((cat) =>
//     cat.name.toLowerCase().includes(search.value.toLowerCase()),
//   )
//   return filtered.slice(
//     (currentPage.value - 1) * ITEMS_PER_PAGE,
//     currentPage.value * ITEMS_PER_PAGE,
//   )
// })

const filteredCats = computed(() => {
  return (
    cats.value
      .filter((cat) => cat.name.toLowerCase().includes(search.value.toLowerCase()))
      // 一頁 2 筆
      // 第 1 頁 = 0 ~ 1
      // 第 2 頁 = 2 ~ 3
      // 第 3 頁 = 4 ~ 5
      // .slice(開始索引, 結束索引)
      // 不包含結束索引
      .slice((currentPage.value - 1) * ITEMS_PER_PAGE, currentPage.value * ITEMS_PER_PAGE)
  )
})

// 取得貓咪清單
const getCats = async () => {
  try {
    const { data } = await api.get('/cat')
    cats.value = data.result // 確保資料結構符合
    await getFavorites() // 取得喜愛的貓咪資料
  } catch (error) {
    console.log(error)
  }
}

// 取得使用者已按讚的貓咪清單
const getFavorites = async () => {
  try {
    const { data } = await apiAuth.get('/user/favorites')
    userFavorites.value = data.result.map((cat) => cat._id) // 存入已按讚的貓咪 ID 陣列

    // 更新 `cats` 陣列，標記哪些貓咪是使用者按過讚的
    cats.value.forEach((cat) => {
      cat.liked = userFavorites.value.includes(cat._id)
    })
  } catch (error) {
    console.log('無法獲取使用者的喜好資料:', error)
  }
}

// 呼叫初始化資料
getCats()

// 點擊喜歡按鈕後的處理邏輯
const toggleLike = async (cat) => {
  try {
    const response = await apiAuth.post('/user/favorites', {
      catId: cat._id,
      liked: !cat.liked,
    })

    console.log('adopting.vue 成功', response.data.message) // 顯示成功訊息

    // 更新本地資料
    cat.liked = !cat.liked
    cat.likes = response.data.likes
    // 重新載入資料，保持同步
    await getCats()
    // 更新 userFavorites 中的資料
    if (cat.liked) {
      userFavorites.value.push(cat._id)
    } else {
      userFavorites.value = userFavorites.value.filter((id) => id !== cat._id)
    }
  } catch (error) {
    console.error('更新喜好狀態時出錯:', error)
  }
}

// 初始化時執行
getCats()

// computed(getCats)
</script>

<style>
.container {
  width: 100vw;
  background: #ebd0ddde;
}
.cute-card {
  background-color: #ffe3e3 !important;
  border-radius: 15px !important;
  padding: 10px;
  font-family: 'Zen Old Mincho', serif;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  min-height: 350px;
}
.v-col {
  display: flex;
  justify-content: center;
  align-items: center;
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

.like_container {
  display: flex;
  width: 50px;
  height: auto;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 30px;
}

.like_count {
  font-weight: bold;
  color: #d32f2f !important; /* 深紅色，讓數字更明顯 */
  position: absolute;
  right: -5px;
  bottom: 25px;
  font-size: 24px;
  font-family: Junge;
}
</style>
