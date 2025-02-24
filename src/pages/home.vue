<template>
  <div class="container">
    <swiper
      :loop="true"
      :space-between="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      class="mySwiper2"
      @slide-change="onSlideChange"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </swiper-slide>
    </swiper>

    <swiper
      :loop="true"
      :space-between="10"
      :slides-per-view="4"
      :free-mode="true"
      :watch-slides-progress="true"
      :modules="modules"
      class="mySwiper"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide
        v-for="(image, index) in images"
        :key="index"
        :class="{ 'active-thumb': isActiveThumb(index) }"
      >
        <img :src="image" />
      </swiper-slide>
    </swiper>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="news-container">
            <h1 class="news">最新消息</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At harum eaque amet tempore
              odio libero, doloremque quaerat sequi ut, veniam nisi sit minima temporibus quidem
              tenetur id velit dolorem cupiditate vitae ipsam! Minus pariatur iusto nam molestiae
              tempora? Voluptas accusamus nesciunt velit similique voluptate, ducimus nobis nam
              tempore perferendis adipisci quibusdam facere delectus eveniet minima consectetur
              veniam obcaecati corporis dolorem modi iste officia fuga tempora. Ducimus at quos
              optio possimus nam veritatis iure quaerat a, amet quisquam accusantium minima libero
              obcaecati voluptate iusto accusamus assumenda? Nisi, optio! In fugiat nulla sequi,
              sunt, at praesentium explicabo odio quaerat laudantium, officia similique!
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="info-container">
            <h1 class="info">活動資訊</h1>
            <p>
              More details about activities and events can be added here. Lorem ipsum dolor sit
              amet.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const images = ref([
      'https://i.imgur.com/LjEbMqs.jpeg',
      'https://i.imgur.com/2scnSBL.jpeg',
      'https://i.imgur.com/hxAFsLi.jpeg',
      'https://i.imgur.com/f7FZqaU.jpeg',
    ])

    const thumbsSwiper = ref(null)
    const activeIndex = ref(0)

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper
    }

    const onSlideChange = (swiper) => {
      activeIndex.value = swiper.realIndex
    }

    const isActiveThumb = (index) => {
      return activeIndex.value === index
    }

    return {
      images,
      thumbsSwiper,
      setThumbsSwiper,
      onSlideChange,
      isActiveThumb,
      modules: [FreeMode, Navigation, Thumbs],
    }
  },
}
</script>

<style scoped>
.container {
  background-color: #eee0ea !important;
  height: 100vh;
  padding: 20px;
}

/* 主圖 */
.mySwiper2 {
  width: 100%;
  max-width: 80%;
  margin: auto;
}
.mySwiper2 img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

/* 縮圖 */
.mySwiper {
  width: 100%;
  max-width: 1000px;
  margin-top: 5px;
}
.mySwiper img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
}

.mySwiper .swiper-slide {
  filter: brightness(0.4);
  transition: filter 0.8s;
  cursor: url('https://example.com/custom-cursor.png'), pointer;
}

.mySwiper .swiper-slide.active-thumb {
  filter: brightness(1);
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #757575;
  opacity: 0.3;
  font-size: 30px;
  width: 50px;
  height: 50px;
}

.news-container,
.info-container {
  width: 100%;
  height: 500px;
  border: 2px solid #757575;
  padding: 10px;
  border-radius: 8px;
  background-color: #dfcdcd; /* 背景顏色，增加可讀性 */
  opacity: 0.7;
}

.news,
.info {
  text-align: center;
  margin-bottom: 16px; /* 給標題一點底部間距 */
  color: #000;
}
</style>

/* .news { max-width: 80%; width: 30%; height: 200px; text-align: center; margin: 0 auto; border:
3px dashed #757575; position: absolute; left: 210px; display: flex; justify-content: center;
align-items: start; } .info { max-width: 80%; width: 30%; height: 200px; text-align: center; margin:
0 auto; border: 3px dashed #757575; position: absolute; right: 210px; display: flex;
justify-content: center; align-items: start; } */
