<template>
  <h1>須知</h1>
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
          <p>
            領養人條件
            <br />
            <br />
            ．年滿20歲 <br />
            ．無動保法第三十三條之一第一項各款所定情形 <br />
            ．理解飼主責任、動物福利及動物飼養管理教育 <br />
            ．家中成員皆同意飼養 <br />
            ．可提供適合及安全的居住環境 <br />
            ．經濟能力得以應付長期的固定開銷及突發的醫療費用 <br />
            ．對毛孩的終生負責絕不棄養 <br />
            ．若違反認養條款(如遺棄、虐待、私自轉讓等)送養方有權依法追回貓咪<br />
            ．確認無重大動物過失紀錄，並承諾遵守《動物保護法》相關規定<br />
          </p>
          <br />
          <p>
            領養程序：<br />
            ．下載同意書 <br />
            ．填寫相關資料、想領養的貓咪<br />
            ．填寫完畢寄送至email：Meowu_19@gmail.com <br />
            ．領養程序約 3-5 個工作天 (領養結果以email通知) <br />
          </p>
        </v-tabs-window-item>
      </v-tabs-window>

      <!-- 下載檔案按鈕 -->
      <div class="download">
        <v-btn color="rgb(231, 208, 208)" class="download">
          <a href="/adoption-guide.pdf" download="adoption-guide.pdf" target="_blank">
            下載同意書
          </a>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
// export default {
//   data: () => ({
//     tab: null,
//   }),
//   methods: {
//     downloadFile() {
//       // 設定要下載的檔案路徑
//       const fileUrl = '/vuetify-project-main/public/adoption-guide' // 放在 public 資料夾中的檔案
//       const link = document.createElement('a')
//       link.href = fileUrl
//       link.setAttribute('download', 'adoption-guide.pdf') // 設定下載的檔案名稱
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     },
//   },
// }
</script>

<style>
h1 {
  font-size: 42px;
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
  height: 80%;
  background: #fcf8e6;
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
  background-color: #e6d2a8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: 'Zen Old Mincho', serif;
}
.v-tabs-window {
  font-family: 'Zen Old Mincho', serif;
  font-size: 24px;
}

.download {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-family: 'Zen Old Mincho', serif;
  font-size: 20px;
  color: #757575;
  position: absolute;
  top: 280px;
  left: 380px;
}
</style>
