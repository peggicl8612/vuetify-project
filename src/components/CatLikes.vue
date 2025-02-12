<script setup>
import { ref, onMounted } from 'vue'

const cats = ref([])

// 取得貓咪列表
onMounted(async () => {
  try {
    const res = await fetch('/api/cats')
    cats.value = await res.json()
  } catch (error) {
    console.error('載入貓咪資料時發生錯誤:', error)
  }
})

// 按讚功能
const likeCat = async (cat) => {
  try {
    await fetch(`/api/cats/${cat._id}/like`, { method: 'POST' }) // 傳送 API 請求
    cat.likes += 1 // 更新按讚數
    cat.liked = true // 設定為已按讚
  } catch (error) {
    console.error('按讚失敗:', error)
  }
}
</script>

<template>
  <v-container>
    <h2>貓咪列表</h2>
    <v-row>
      <v-col v-for="cat in cats" :key="cat._id" cols="12" sm="6" md="4">
        <div class="image-container">
          <img class="picture" src="https://picsum.photos/300/300/?random=10" />
          <v-img
            :width="50"
            :height="50"
            aspect-ratio="1/1"
            cover
            :src="cat.liked ? 'https://i.imgur.com/VX0cLLn.png' : 'https://i.imgur.com/rfPKMiX.png'"
            class="like"
            @click="likeCat(cat)"
          />
        </div>
        <p>{{ cat.name }} - {{ cat.likes }} ❤️</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.picture {
  width: 300px;
  height: 300px;
  display: block;
}

.like {
  position: absolute;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
}
</style>
