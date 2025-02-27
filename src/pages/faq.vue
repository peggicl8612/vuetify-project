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
        </v-col>
        <v-col cols="8" class="d-flex align-center">
          <div>
            <!-- <h1>常見問答</h1> -->
          </div>
          <div>
            <div class="memo">
              <img class="Q1" src="../assets/images/faq_memo.png" alt="Q1" />
              <img class="Q2" src="../assets/images/faq_memo.png" alt="Q2" />
              <img class="Q3" src="../assets/images/faq_memo.png" alt="Q3" />
              <img class="Q4" src="../assets/images/faq_memo.png" alt="Q4" />
              <img class="Q5" src="../assets/images/faq_memo.png" alt="Q5" />
              <img class="Q6" src="../assets/images/faq_memo.png" alt="Q6" />
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

.memo img {
  width: 300px;
  height: auto;
}
</style>
