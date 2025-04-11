<template>
  <v-main class="disease-main">
    <h1 class="title">疾病資訊</h1>
    <v-row>
      <v-col v-for="disease in diseases" :key="disease.id" cols="12" md="4">
        <v-card class="info-card">
          <v-card-text>
            <p class="info-title" v-html="formatTitle(disease.title)"></p>
            <v-btn class="read-btn" @click="openDialog(disease)">閱讀更多</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px" scrollable>
      <v-card class="card">
        <v-card-title class="dialog_title">{{ selectedDisease.title }}</v-card-title>
        <v-card-text class="pre-line">{{ selectedDisease.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="brown" @click="dialog = false">關閉</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'

const diseases = ref([
  {
    id: 1,
    title: '貓傳染性腹膜炎(FIP)',
    description: `
      病因：
      由貓冠狀病毒(FCoV)變異後引發，大多數貓感染貓冠狀病毒後只會出現輕微的腸胃症狀，但某些情況下病毒可能會變異，進而攻擊貓咪的免疫系統，引發致命的 FIP。

      症狀：
      📌 發燒
      📌 食慾下降、體重減輕
      📌 胸部或胸腔積水(濕性 FIP)
      📌 神經症狀(步態不穩、癲癇發作等)
      📌 眼睛發炎

      如何預防：
      Δ 避免群養，減少病毒傳播風險
      Δ 維持乾淨衛生的環境
      Δ 提供優質飲食，提高貓咪免疫力
      `,
  },
  {
    id: 2,
    title: '貓艾滋\n(FIV)',
    description: `
      病因：
      貓艾滋病由貓免疫缺陷病毒(FIV)引起，主要透過貓咪之間的咬傷傳播，尤其在戶外流浪貓族群中較為常見。

      症狀：
      📌 慢性發燒
      📌 體重減輕
      📌 牙齦炎、口腔潰瘍
      📌 毛髮粗糙、皮膚感染
      📌 容易感染其他疾病(免疫力下降)

      如何預防：
      Δ 避免讓貓咪與未知健康狀況的貓接觸
      Δ 建議將貓咪養在室內，減少打鬥機會
      Δ 可考慮接種 FIV 疫苗(但保護力有限)
      `,
  },
  {
    id: 3,
    title: '貓瘟/貓泛白血球減少症(FPV)',
    description: `
      病因：
      由貓泛白血球病毒(FPV)引起，是高度傳染性的致命疾病，病毒可透過唾液、糞便或受污染的環境傳播。

      症狀：
      📌 高燒
      📌 嚴重嘔吐與腹瀉
      📌 食慾不振、極度虛弱
      📌 白血球數急劇下降，免疫力崩潰

      如何預防：
      Δ 定期施打疫苗(FPV 疫苗非常有效)
      Δ 避免接觸病貓或受污染的物品
      Δ 保持環境清潔、勤洗手
      `,
  },
  {
    id: 4,
    title: '尿道阻塞 (FLUTD)',
    description: `
      病因：
      貓下泌尿道疾病(FLUTD)是多種尿路問題的統稱，可能由尿結石、膀胱炎、尿道狹窄等引起，尤其好發於公貓。

      症狀：
      📌 頻繁上廁所但無法排尿
      📌 排尿困難、疼痛、呻吟
      📌 血尿
      📌 腹部腫脹，貓咪感到不適或嗜睡

      如何預防：
      Δ 確保貓咪每天攝取足夠的水分
      Δ 避免高鹽、高鎂的食物(容易引發尿結石)
      Δ 定期檢查貓咪的尿液狀況(特別是公貓)
      `,
  },
  {
    id: 5,
    title: '過敏性皮膚炎(FAD)',
    description: `
      病因：
      皮膚過敏可能由於環境因素（花粉、灰塵）、食物過敏、跳蚤叮咬等引起，導致貓咪出現皮膚搔癢和發炎。

      症狀：
      📌 貓咪頻繁舔毛或抓撓
      📌 皮膚發紅、脫毛、出現小結痂
      📌 可能有皮膚潰瘍或濕疹

      如何預防：
      Δ 盡量減少過敏原(使用無塵環境、濕度調控)
      Δ 選擇低敏配方飼料，觀察是否有食物過敏反應
      Δ 定期驅蟲，防止跳蚤叮咬
      `,
  },
  {
    id: 6,
    title: '牙周病\n(Dental Disease) ',
    description: `
      病因：
      當貓咪牙齒未經常清潔，牙菌斑與牙垢堆積，細菌繁殖後可能導致牙齦發炎、牙周病，甚至牙齒脫落。

      症狀：
      📌 口臭
      📌 牙齦紅腫、出血
      📌 牙齒鬆動或掉落
      📌 咀嚼時疼痛、不願進食

      如何預防：
      Δ 每週幫貓咪刷牙(使用專門的貓咪牙膏)
      Δ 提供潔牙零食或潔牙玩具
      Δ 定期由獸醫進行口腔檢查
      `,
  },
])

const dialog = ref(false)
const selectedDisease = ref({})

// 打開對話框
const openDialog = (disease) => {
  selectedDisease.value = disease
  dialog.value = true
}

const formatTitle = (title) => {
  return title.replace(/\n/g, '<br/>')
}
</script>

<style scoped>
.disease-main {
  text-align: center;
  padding: 30px;
  font-family: 'Zen Old Mincho', serif;
  position: relative;
  min-height: 100vh; /* 設定最小高度為 100% 視窗高度 */
}

.disease-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://i.imgur.com/AT0xasr.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.6; /* 調整透明度 */
  z-index: 0; /* 保證它在最底層 */
}

.pre-line {
  white-space: pre-line;
  font-family: 'Zen Kurenaido', sans-serif;
}

.title {
  font-size: 3rem;
  margin-bottom: 16px;
  color: #5a4a48;
  z-index: 1; /* 確保標題在圖片上層 */
  white-space: pre-line;
}

.info-card {
  padding: 80px;
  background-color: rgba(244, 237, 230, 0.9); /* 半透明背景以顯示背景圖片 */
  border-radius: 12px;
  text-align: center;
  position: relative;
  z-index: 2;
  margin-top: 50px;
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

.card {
  background: #f1ebe3;
  border-radius: 15px !important;
  border: 6px dashed #757575;
  font-family: 'Zen Kurenaido', sans-serif;
}
.dialog_title {
  text-align: center;
  font-size: 26px;
  font-family: 'Zen Kurenaido', sans-serif;
  color: #757575;
}
</style>
