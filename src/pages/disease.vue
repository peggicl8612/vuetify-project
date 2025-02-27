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
