<template>
  <v-main class="main">
    <div class="background" :style="{ backgroundImage: `url(${currentImage})` }"></div>
    <h1>幼貓飼養</h1>
    <v-card class="card">
      <v-tabs v-model="tab" class="tabs">
        <div class="v">
          <v-tab value="one">新生期</v-tab>
          <v-divider vertical></v-divider>
          <v-tab value="two">換牙期</v-tab>
          <v-divider vertical></v-divider>
          <v-tab value="three">換毛期</v-tab>
        </div>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab" class="tabs_window">
          <v-tabs-window-item value="one">
            <v-divider>新生期 ( 0 ~ 4 週)</v-divider>
            <br />
            <p>
              特徵：<br />
              眼睛與耳朵尚未完全打開，行動能力有限 <br />
              完全依賴母貓或人類照顧 <br />
              需要頻繁餵食和保持體溫 <br />
            </p>
            <br />
            <p>
              飲食調整：<br />
              避免過硬食物：換牙時期牙齦敏感，建議提供濕糧或泡軟的乾糧，幫助貓咪適應新長出的牙齒。
              <br />
              適當補鈣：可在獸醫建議下提供適量的鈣質補充，以確保牙齒與骨骼發育良好。<br />
              提供磨牙玩具：使用貓咪專用磨牙棒或潔牙零食，避免貓咪亂咬家具或電線。<br />
            </p>
            <br />
            <p>
              口腔照護：<br />
              習慣刷牙：從小培養刷牙習慣，可使用指套牙刷或寵物專用牙膏，輕柔刷拭牙齒，降低牙結石與口臭問題。<br />
              觀察牙齒狀況：若發現乳齒未脫落但恆齒已長出，需帶去獸醫院檢查，避免牙齒擁擠或咬合不正。<br />
            </p>
            <br />
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <v-divider>換牙期 ( 3 ~ 6 個月)</v-divider>
            <br />
            <p>
              特徵：<br />
              乳齒開始脫落，恆齒逐漸長出<br />
              可能會出現咬東西、流口水、口臭等現象<br />
              食慾變化，有時可能會偏食或咀嚼異物<br />
            </p>
            <br />
            <p>
              飲食調整：<br />
              避免過硬食物：換牙時期牙齦敏感，建議提供濕糧或泡軟的乾糧，幫助貓咪適應新長出的牙齒。<br />
              適當補鈣：可在獸醫建議下提供適量的鈣質補充，以確保牙齒與骨骼發育良好。<br />
              提供磨牙玩具：使用貓咪專用磨牙棒或潔牙零食，避免貓咪亂咬家具或電線。<br />
            </p>
            <br />
            <p>
              口腔照護：<br />
              習慣刷牙：從小培養刷牙習慣，可使用指套牙刷或寵物專用牙膏<br />
              輕柔刷拭牙齒，降低牙結石與口臭問題。<br />
              觀察牙齒狀況：若發現乳齒未脫落但恆齒已長出，需帶去獸醫院檢查，避免牙齒擁擠或咬合不正。<br />
            </p>
            <br />
          </v-tabs-window-item>
          <v-tabs-window-item value="three">
            <v-divider>換毛期 ( 6 個月以上)</v-divider>
            <br />
            <p>
              特徵：<br />
              每年春天（3-5月）與秋天（9-11月），毛髮會大量脫落 <br />
              幼貓逐漸長出更厚、更成熟的成貓毛髮 <br />
              可能因舔毛吞入大量毛髮，導致毛球症 <br />
            </p>
            <br />
            <p>
              毛髮管理：<br />
              每日梳毛：使用細齒梳或除毛手套，減少掉毛，降低毛球形成的機率。<br />
              適當補充營養：可添加富含Omega-3、Omega-6的食物（如魚油），幫助毛髮健康生長。<br />
            </p>
            <br />
            <p>
              環境清潔：<br />
              加強清理家中毛髮：定期吸塵、使用靜電拖把，減少空氣中毛髮飄散。<br />
              提供充足飲水：幫助消化毛球，避免毛球阻塞腸胃。<br />
            </p>
            <br />
            <p>
              預防毛球症：提供化毛膏或化毛飼料：幫助貓咪排出吞入的毛髮，減少嘔吐毛球的狀況。<br />
              觀察異常症狀：若貓咪頻繁乾嘔但無法吐出毛球，可能需要就醫處理。<br />
            </p>
            <br />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
    <div>
      <v-img class="paw" src="../assets/images/paw.png"></v-img>
    </div>
    <!-- <div class="Logo_container">
      <video ref="webmVideo" autoplay loop muted>
        <source src="../assets/Logo.webm" type="video/webm" />
      </video>
    </div> -->
  </v-main>
</template>
<script>
export default {
  data: () => ({
    tab: null,
  }),
}
</script>

<style scoped>
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.main {
  background: linear-gradient(45deg, #e6c7a2, #ee962a, #dbd286b6, #cdd646);
  background-size: 400% 400%; /* 減小背景的大小 */
  animation: gradientAnimation 5s ease infinite; /* 背景動畫 */
  height: 100vh;
}

.tabs_window {
  font-family: 'Comic Sans MS';
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.main {
  background: linear-gradient(45deg, #ffebcd, #ffd1dc, #ffe4b5, #fff7e6);
  background-size: 400% 400%;
  animation: gradientAnimation 8s ease infinite;
  min-height: 100vh; /* 確保頁面填滿 */
}

/* 卡片加上圓角，讓它更柔和 */
.card {
  margin: 20px auto;
  width: 80%;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(255, 170, 170, 0.8);
  background: rgba(255, 245, 238, 0.9); /* 柔和奶油色 */
  padding: 10px;
}

.v-btn__content {
  grid-area: content;
  justify-content: center;
  white-space: nowrap;
  font-family: 'Zen Kurenaido', sans-serif;
}

/* 貓掌風格的 Tabs */
.v-tab {
  font-size: 18px !important;
  font-weight: bold;
  font-family: 'Zen Kurenaido', sans-serif;
  border-radius: 50px; /* 變圓 */
  padding: 10px 20px;
  background-color: #ffd1dc !important; /* 粉色貓掌 */
  color: #6b3e26 !important;
  transition: all 0.3s ease-in-out;
}

.v-tab:hover {
  background-color: #ffb6c1 !important; /* 貓掌粉 hover */
  transform: scale(1.1); /* 放大變可愛 */
}

/* 分隔線改為小貓掌 */
.title_1::before,
.title_2::before,
.title_3::before {
  content: '🐾';
  font-size: 20px;
  margin-right: 10px;
  color: #ff6f61;
}

/* 文字區塊美化 */
p {
  font-family: 'Zen Kurenaido', sans-serif;
  font-size: 18px;
  color: #6b3e26;
}

/* 讓標題更可愛 */
h1 {
  font-size: 52px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #e3bd72;
  font-family: 'Zen Kurenaido', sans-serif;
  text-shadow: 2px 2px 4px rgba(255, 170, 170, 0.5);
}

.card {
  margin: 20px auto;
  width: 80%;
  /* padding: 20px; */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(37, 46, 88, 0.76);
  height: 100%;
  background: #e8b4b865;
}

.v-tab {
  font-size: 16px !important;
  font-family: 'Zen Kurenaido', sans-serif !important;
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
  background-color: #efecec6c;
  opacity: 0.8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: 'Zen Old Mincho', serif;
}
.v-tabs-window {
  font-family: 'Zen Old Mincho', serif;
  font-size: 20px;
}

.paw {
  width: 300px;
  height: auto;
  position: absolute;
  bottom: 0;
  right: 150px;
  opacity: 0.3;
}
</style>
