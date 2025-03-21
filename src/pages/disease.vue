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

    <v-dialog v-model="dialog" max-width="500px">
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
<<<<<<< HEAD
  white-space: pre-line;
=======
  margin-top: 30px;
>>>>>>> 007cf36338364a57680669ce528d7fd022eaef6d
}

.info-card {
  padding: 100px;
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

以下是六種貓咪常見的疾病，以及它們的病因、症狀和預防方法： ### 1. **貓傳染性腹膜炎 (FIP)** -
**病因**：貓傳染性腹膜炎是由貓冠狀病毒引起的疾病。雖然貓冠狀病毒在大多數情況下不會造成嚴重影響，但在某些情況下，病毒可能會變異，並攻擊貓咪的腹膜或內臟。
- **症狀**： - 發燒 - 牠的腹部或胸部可能會腫脹 - 食慾減退，體重減輕 - 呼吸急促 - 黃疸 -
神經系統受損的情況（例如步態不穩） -
**如何預防**：目前並無治療貓傳染性腹膜炎的特效藥物，且疫苗效果也較為有限。最佳的預防方法是維持良好的貓咪健康環境，避免感染，並定期檢查貓咪的健康。
--- ### 2. **貓艾滋病 (FIV)** -
**病因**：貓艾滋病是由貓免疫缺陷病毒（FIV）引起的，這是一種攻擊貓咪免疫系統的病毒。主要通過深度咬傷傳播。
- **症狀**： - 持續的發燒 - 嚴重的體重下降 - 長期的呼吸道感染 - 牙齦炎和口腔潰瘍 -
免疫功能下降，容易感染其他疾病 -
**如何預防**：避免讓貓咪與其他已知感染FIV的貓咪接觸，並提供良好的健康管理。對於高風險群體（如戶外貓咪），可考慮接種疫苗來降低風險。
--- ### 3. **貓瘟 (Panleukopenia)** -
**病因**：貓瘟是由貓泛白血球病毒引起的。這是一種非常傳染性的病毒，會破壞貓咪的白血球、腸道和骨髓，導致免疫系統衰弱。
- **症狀**： - 高燒 - 嚴重嘔吐 - 腹瀉 - 體力衰弱 - 食慾不振 - 脫水 -
**如何預防**：定期接種疫苗是預防貓瘟的最有效方法。保持清潔、乾燥的環境，避免與患病的貓咪接觸。 ---
### 4. **尿道阻塞 (Feline Lower Urinary Tract Disease, FLUTD)** -
**病因**：這種病狀通常由尿路感染、尿結石或膀胱發炎引起。尿道阻塞會導致貓咪無法正常排尿，這對健康威脅巨大。
- **症狀**： - 頻繁排尿但排尿量少 - 血尿 - 排尿時出現痛苦的表現（如呻吟、躲避） - 腹部脹大 -
嗜睡或體力下降 -
**如何預防**：確保貓咪獲得充足的水分，避免過度食用含有高鹽、高脂肪的食物，並定期檢查尿液健康。對於某些品種的貓咪（如公貓），應特別注意其尿道健康。
--- ### 5. **過敏性皮膚病 (Feline Allergic Dermatitis)** -
**病因**：貓咪可能對食物、跳蚤叮咬、灰塵、花粉等物質過敏，這些過敏原會引起皮膚發炎和搔癢。 -
**症狀**： - 養癖或抓撓 - 皮膚紅腫或出現脫毛區域 - 可能會有濕疹或水泡 -
嘴部、眼睛周圍等部位可能有過敏反應 -
**如何預防**：避免貓咪接觸已知的過敏源，定期為貓咪驅除跳蚤和其他寄生蟲，並根據獸醫建議進行過敏測試，適當調整飲食或環境。
--- ### 6. **牙周病 (Dental Disease)** -
**病因**：貓咪的牙齒和牙齦也會受到細菌感染，尤其是當口腔衛生不良時。牙垢積累，導致牙周炎或牙周病。 -
**症狀**： - 口臭 - 齒石或牙垢積累 - 牙齦紅腫、出血 - 牙齒松動或脫落 -
食慾減退（特別是在咀嚼時感到疼痛） -
**如何預防**：定期為貓咪刷牙，使用專為貓咪設計的牙膏和牙刷，避免讓貓咪吃過多的軟食，並定期檢查口腔健康，必要時進行專業清潔。
這些疾病都有其特定的症狀和治療方式，因此，定期的健康檢查、適當的預防接種以及對貓咪健康狀況的密切關注，對於預防和管理這些疾病至關重要。
