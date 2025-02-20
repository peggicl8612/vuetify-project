<template>
  <h1>成貓飼養</h1>
  <v-card class="card">
    <v-tabs v-model="tab" class="tabs">
      <div class="v">
        <v-tab value="one">新生期</v-tab>
        <v-divider vertical></v-divider>
      </div>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one"> </v-tabs-window-item>
        成貓飼養指南 <br /><br />
        1. 飲食管理 ✔ 均衡飲食：選擇高品質的貓糧，確保含有足夠的蛋白質和營養。<br />
        ✔ 固定餵食時間：每天餵食 2-3 次，避免過度餵食導致肥胖。<br />
        ✔ 保持水分攝取：提供乾淨的飲用水，可搭配流動飲水機提高飲水量。<br />
        ✔ 避免危險食物：巧克力、洋蔥、葡萄、生魚等食物對貓咪有害，請勿餵食。<br />
        <br />
        <hr />
        <br />
        2. 環境布置 ✔ 提供舒適空間：準備柔軟的貓窩，讓貓咪有安全感。<br />
        ✔ 貓砂盆管理：選擇適合的貓砂，每天清理，保持衛生。<br />
        ✔ 貓抓板與玩具：提供貓抓板避免家具被抓壞，並準備玩具豐富生活。<br />
        ✔ 確保安全：避免讓貓咪接觸危險物品，如電線、清潔劑等。<br />
        <br />
        <hr />
        <br />
        3. 健康管理 ✔ 定期健康檢查：每年帶貓咪至獸醫院進行健康檢查與疫苗接種。<br />
        ✔ 寄生蟲預防：定期使用驅蟲藥，避免跳蚤、蜱蟲和內寄生蟲感染。<br />
        ✔ 關注體重變化：若發現體重異常變化，應立即諮詢獸醫。<br />
        ✔ 牙齒保健：每週幫貓咪刷牙或提供潔牙零食，預防牙周病。<br />
        <br />
        <hr />
        <br />
        4. 心理與行為照顧 ✔ 保持穩定環境：貓咪喜歡固定的作息與環境，避免頻繁變動。<br />
        ✔ 與貓咪互動：每天陪伴遊戲，提供適量運動，避免過度無聊。<br />
        ✔ 觀察行為變化：若發現貓咪出現異常行為，如攻擊性增加、食慾下降，應及時查明原因。<br />
        ✔ 提供隱私空間：貓咪有時候需要獨處，準備隱蔽的休息角落。<br />
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: null,
  }),
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
  background: #e8b4b865;
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
