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
      <v-col v-for="cat in cats" :key="cat.id" cols="12" md="4">
        <v-card class="mb-4 card-hover">
          <v-img :src="cat.image" height="200px" class="rounded-top"></v-img>
          <v-card-title class="text-center">{{ cat.name }}</v-card-title>
          <v-card-actions class="justify-center">
            <v-btn class="ma-1" :disabled="false"> 讚 💕 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 分頁 -->
    <v-pagination v-model="currentPage" :length="pageCount" circle class="mt-4" />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模擬的貓咪資料
const cats = ref([
  { id: 1, name: '小虎', image: 'https://example.com/cat1.jpg' },
  { id: 2, name: '小花', image: 'https://example.com/cat2.jpg' },
  { id: 3, name: '大橘', image: 'https://example.com/cat3.jpg' },
  { id: 4, name: '黑貓', image: 'https://example.com/cat4.jpg' },
  { id: 5, name: '小雪', image: 'https://example.com/cat5.jpg' },
  { id: 6, name: '小藍', image: 'https://example.com/cat6.jpg' },
])

// 分頁設置
const currentPage = ref(1)
const itemsPerPage = 6
const pageCount = computed(() => Math.ceil(cats.value.length / itemsPerPage))
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
