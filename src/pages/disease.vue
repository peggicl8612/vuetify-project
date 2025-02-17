<template>
  <v-container class="disease-container">
    <h1 class="title">疾病資訊</h1>

    <v-row>
      <v-col v-for="disease in diseases" :key="disease.id" cols="12" md="4">
        <v-card class="info-card">
          <v-card-text>
            <p class="info-title">{{ disease.title }}</p>
            <v-btn class="read-btn" @click="openDialog(disease)"> 閱讀更多 </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 疾病詳情對話框 -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ selectedDisease.title }}</v-card-title>
        <v-card-text>{{ selectedDisease.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialog = false">關閉</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const diseases = ref([
  { id: 1, title: 'INFO 1', description: '這是疾病 1 的詳細介紹...' },
  { id: 2, title: 'INFO 2', description: '這是疾病 2 的詳細介紹...' },
  { id: 3, title: 'INFO 3', description: '這是疾病 3 的詳細介紹...' },
  { id: 4, title: 'INFO 4', description: '這是疾病 4 的詳細介紹...' },
  { id: 5, title: 'INFO 5', description: '這是疾病 5 的詳細介紹...' },
  { id: 6, title: 'INFO 6', description: '這是疾病 6 的詳細介紹...' },
])

const dialog = ref(false)
const selectedDisease = ref({})

// 打開對話框
const openDialog = (disease) => {
  selectedDisease.value = disease
  dialog.value = true
}
</script>

<style scoped>
.disease-container {
  text-align: center;
  padding: 20px;
  font-family: 'Zen Old Mincho', serif;
}

.title {
  font-size: 3rem;
  margin-bottom: 16px;
  color: #5a4a48;
}

.info-card {
  padding: 80px;
  background-color: #f4ede6;
  border-radius: 12px;
  text-align: center;
}

.info-title {
  font-size: 1.5rem;
  color: #5a4a48;
}

.read-btn {
  background: #6e6259;
  color: white;
  margin-top: 8px;
  border-radius: 8px;
}
</style>
