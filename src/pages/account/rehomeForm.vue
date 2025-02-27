<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">送養紀錄</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <!-- 顯示使用者送出的送養表單 -->
    <v-row>
      <v-col v-for="item in paginatedRehomes" :key="item._id" cols="12" md="4">
        <v-card class="mb-4 card-hover">
          <v-img :src="item.image" height="200px" class="rounded-top"></v-img>
          <v-card-title class="text-center">{{ item.name }}</v-card-title>
          <v-card-subtitle class="text-center">年齡: {{ item.age }} 歲</v-card-subtitle>
          <v-card-subtitle class="text-center">品種: {{ item.breed }}</v-card-subtitle>
          <v-card-subtitle class="text-center">性別: {{ item.gender }}</v-card-subtitle>
          <v-card-text class="text-center">{{ item.description }}</v-card-text>

          <v-card-subtitle class="text-center">
            審核狀態:
            <span>{{ item.status }}</span>
            <!-- 顯示審核狀態，不顯示選擇器 -->
          </v-card-subtitle>
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
// import { useRouter } from 'vue-router'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

// const router = useRouter()

const rehomeForms = ref([])

// 載入使用者送養表單資料
const loadRehomeForms = async () => {
  try {
    const userResponse = await apiAuth.get('/user/me')
    const isAdmin = userResponse.data.role === 1
    const endpoint = isAdmin ? '/rehome' : '/rehome/mine' // 依身份選擇 API
    const { data } = await apiAuth.get(endpoint)
    console.log(' API 回應:', data)

    if (data.success) {
      rehomeForms.value = data.result
    } else {
      console.warn('API 回傳錯誤:', data.message)
      createSnackbar({
        text: '獲取送養紀錄失敗: ' + data.message,
        snackbarProps: { color: 'pink' },
      })
    }
  } catch (error) {
    console.error(' API Error:', error.response ? error.response.data : error)
    createSnackbar({
      text: '獲取送養紀錄失敗',
      snackbarProps: { color: 'pink' },
    })
  }
}

// 當前頁數
const currentPage = ref(1)
const itemsPerPage = 6

// 計算總頁數
const pageCount = computed(() => Math.ceil(rehomeForms.value.length / itemsPerPage))

// 計算當前頁顯示的送養紀錄
const paginatedRehomes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return rehomeForms.value.slice(start, end)
})

// const updateStatus = async (item) => {
//   try {
//     await apiAuth.patch(`/rehome/${item._id}`, { status: item.reviewStatus }) // 更新狀態
//     createSnackbar({ text: '審核狀態更新成功', color: 'success' })
//   } catch (error) {
//     console.log('updateStatus', error)
//     createSnackbar({ text: '更新失敗', color: 'error' })
//   }
// }

// const reviewStatuses = ref([
//   { title: '待審核', value: 'pending' },
//   { title: '審核通過', value: 'approved' },
//   { title: '審核失敗', value: 'rejected' },
// ])

// 頁面加載時執行
onMounted(loadRehomeForms)
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
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
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
  title: 'nav.rehomeForm'
</route>
