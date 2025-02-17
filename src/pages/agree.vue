<template>
  <h1>領養須知</h1>
  <v-card class="card">
    <v-tabs v-model="tab" class="tabs">
      <div class="v">
        <v-tab value="one">READ</v-tab>
        <v-divider vertical></v-divider>
      </div>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit aliquid repellat
          repellendus nemo! Voluptatum voluptate, doloribus officia cum quia vero molestiae magnam
          earum perspiciatis consequuntur ab repellat ipsum enim veniam.
        </v-tabs-window-item>
      </v-tabs-window>

      <!-- 下載檔案按鈕 -->
      <v-btn color="primary" class="download" @click="downloadFile"> 下載檔案 </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: null,
  }),
  methods: {
    downloadFile() {
      // 創建一個隱藏的 <a> 元素來進行檔案下載
      const link = document.createElement('a')
      link.href = require('@/assets/images') // 輸入正確的檔案路徑
      link.download = '認養同意書.pdf' // 設定下載的檔案名稱
      link.click() // 模擬點擊下載
    },
  },
}
</script>

<style>
h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 100px;
  color: #67595e;
  font-family: 'Zen Old Mincho', serif;
}
.card {
  margin: 20px auto;
  width: 80%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(37, 46, 88, 0.76);
  height: 100%;
}

.v-tab {
  font-size: 16px !important;
  font-family: 'Zen Old Mincho', serif !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.v {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: #67595e;
  background-color: #e8b4b8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: 'Zen Old Mincho', serif;
}
.v-tabs-window {
  font-family: 'Zen Old Mincho', serif;
  font-size: 20px;
}
</style>
