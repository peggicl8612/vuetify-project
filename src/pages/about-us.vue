<!-- 關於我們 -->
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-img
            :width="650"
            :height="830"
            aspect-ratio="1/1"
            cover
            src="https://i.imgur.com/DdoVDot.png"
            class="position-relative"
          >
            <div class="overlay">
              <h2 class="title">平台理念</h2>
            </div></v-img
          >
        </v-col>
        <v-col cols="6" class="d-flex align-center">
          <div>
            <h1>聯繫我們</h1>
            <hr />
            <p>TEL: (02)XXXX-XXXX</p>
            <P>email: meow@gmail.com</P>
            <p>contact: Ms.Lin</p>
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
        // 如果路由存在，执行跳转
        this.$router.push({ name: routeName })
      } else {
        console.error(`路由名稱 "${routeName}" 不存在`)
      }
    },
  },
}
</script>

<style scoped>
/* 平台理念 */
.overlay {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 32px;
  color: #f9f1f0;
  font-family: 'Zen Old Mincho', serif;
}
</style>
