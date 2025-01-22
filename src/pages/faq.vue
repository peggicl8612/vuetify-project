<!-- 關於我們 -->
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img
            :width="700"
            :height="820"
            aspect-ratio="1/1"
            cover
            src="https://i.imgur.com/uwhOZo7.png"
            class="position-relative"
          >
            <div class="faq">
              <h2 class="title">FAQ</h2>
            </div></v-img
          >
        </v-col>
        <v-col cols="6" class="d-flex align-center">
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
  </div>
</template>

<script>
export default {
  methods: {
    // 跳轉路由的方法
    goTo(routeName) {
      const route = this.$router.resolve({ name: routeName })
      if (route.resolved.matched.length) {
        this.$router.push({ name: routeName })
      } else {
        console.error(`路由名稱 "${routeName}" 不存在`)
      }
    },
  },
}
</script>

<style scoped>
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  gap: 16px;
  flex-wrap: wrap;
}

.memo img {
  width: 280px;
  height: auto;
}
</style>
