<template>
  <v-main class="main">
    <v-container>
      <v-row>
        <v-col cols="4" class="d-flex justify-start">
          <v-img :width="700" :height="820" cover src="https://i.imgur.com/uwhOZo7.png">
            <div class="faq">
              <h2 class="title">FAQ</h2>
            </div>
          </v-img>
<<<<<<< HEAD
          <v-img class="faq_cat" :width="500" src="https://i.imgur.com/sD30SXM.png"></v-img>
=======
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
        </v-col>
        <v-col cols="8" class="d-flex align-center">
          <div>
            <!-- <h1>常見問答</h1> -->
          </div>
          <div>
            <div class="memo">
              <!-- Q1 -->
              <div class="memo-item">
                <img class="Q1" src="../assets/images/faq_memo.png" alt="Q1" />
                <p class="answer-text">
                  A1: <br /><br />
                  可通過我們的網站提交中途照顧申請表 <br />
                  並提供必要的貓咪照顧資源。
                </p>
                <p class="memo-text">Q1: 如何申請貓咪的中途照顧？</p>
              </div>
              <!-- Q2 -->
              <div class="memo-item">
                <img class="Q2" src="../assets/images/faq_memo.png" alt="Q2" />
                <p class="answer-text">
                  A2: <br /><br />
                  是的，只要您符合領養條件 <br />
                  並完成領養程序，您就可以領養貓咪。
                </p>
                <p class="memo-text">Q2: 我可以領養貓咪嗎？</p>
              </div>
              <!-- Q3 -->
              <div class="memo-item">
                <img class="Q3" src="../assets/images/faq_memo.png" alt="Q3" />
                <p class="answer-text">
                  A3: <br /><br />
                  費用通常由提供中途照顧的人負擔<br />
                  您可以向我們申請補助或尋求協助。
                </p>
                <p class="memo-text">Q3: 貓咪中途照顧的費用由誰負擔？</p>
              </div>
              <!-- Q4 -->
              <div class="memo-item">
                <img class="Q4" src="../assets/images/faq_memo.png" alt="Q4" />
                <p class="answer-text">
                  A4: <br /><br />
                  照顧的時間視乎每隻貓咪的情況而定<br />
                  通常需要數週至數月的時間。
                </p>
                <p class="memo-text">Q4: 中途照顧需要多久的時間？</p>
              </div>
              <!-- Q5 -->
              <div class="memo-item">
                <img class="Q5" src="../assets/images/faq_memo.png" alt="Q5" />
                <p class="answer-text">
                  A5: <br /><br />
                  如果您確定無法繼續領養貓咪 <br />
                  可以聯絡我們進行領養取消處理。
                </p>
                <p class="memo-text">Q5: 我可以取消領養貓咪嗎？</p>
              </div>
              <!-- Q6 -->
              <div class="memo-item">
                <img class="Q6" src="../assets/images/faq_memo.png" alt="Q6" />
                <p class="answer-text">
                  A6: <br /><br />
                  我們會為每隻貓咪進行健康檢查<br />
                  和必要的疫苗注射 <br />
                  確保貓咪處於最佳狀態。
                </p>
                <p class="memo-text">Q6: 如何確保貓咪健康並準備好送養？</p>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
/* 背景動畫 */
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
  /* 設定背景動畫在 v-main 元素內 */
  background: linear-gradient(45deg, #ce93b7, #d3bca7, #fcd0b7b6, #eed7e0);
  background-size: 400% 400%; /* 減小背景的大小 */
  animation: gradientAnimation 5s ease infinite; /* 背景動畫 */
  height: 100vh; /* 確保 v-main 擴展到整個視窗高度 */
}

.faq {
  position: absolute;
  bottom: 0px;
  right: 20px;
  text-align: center;
  font-size: 112px;
  color: #a49393;
  opacity: 0.5;
  font-family: 'Zen Kurenaido', sans-serif;
}

h1 {
  font-size: 72px;
  font-family: 'Zen Old Mincho', serif;
  color: #a49393;
  position: absolute;
  top: 60px;
}

.memo {
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 16px;
  flex-wrap: wrap;
}

.memo-item {
  position: relative;
}

.memo img {
  width: 300px;
  height: auto;
}

.memo-text {
  position: absolute;
  bottom: 50px;
  left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  font-family: 'Zen Kurenaido', sans-serif;
}

.answer-text {
  width: 255px;
  height: 200px;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  font-weight: normal;
  color: white;
  background-color: rgba(0, 0, 0, 0.24);
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-family: 'Zen Kurenaido', sans-serif;
}

.faq_cat {
  opacity: 0.6;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
