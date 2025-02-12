<template>
  <!-- 輪播圖 -->
  <div>
    <v-carousel hide-delimiters show-arrows="hover">
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>
  <v-container>
    <v-row>
      <!-- 最新消息 -->
      <v-col cols="12" md="6" class="news">
        <h1 class="news_title">最新消息</h1>
        <v-card>
          <v-card-text>最新消息內容</v-card-text>
        </v-card>
      </v-col>
      <!-- 活動資訊 -->
      <v-col cols="12" md="6" class="event">
        <h1 class="event_title">活動資訊</h1>
        <v-card>
          <v-card-text>活動資訊內容</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<style scoped>
.carousel {
  display: block;
  width: 100%;
}

.carousel-slide img {
  width: 100%;
  height: auto;
}

.news {
  margin-top: 20px;
  color: #757575;
  font-family: 'Zen Old Mincho', serif;
}

.news_title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.event {
  margin-top: 20px;
  color: #757575;
  font-family: 'Zen Old Mincho', serif;
}

.event_title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
