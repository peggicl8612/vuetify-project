<template>
  <div class="container">
    <div v-if="isLoading" class="loading-overlay">
      <video autoplay loop muted class="loading-video">
        <source src="../assets/Cat_Animation.webm" type="video/webm" />
      </video>
    </div>

    <!-- 主要內容區塊 -->
    <swiper
      v-if="!isLoading"
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

    <!-- 其他內容 -->
    <swiper
      v-if="!isLoading"
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

    <v-container v-if="!isLoading">
      <v-row>
        <v-col cols="12" md="6">
          <div v-if="isLoaded" class="news-container animate__animated animate__fadeInLeft">
            <h1 class="news">最新消息</h1>
            <ul>
              <li>
                114/02/11
                <a
                  href="https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001630"
                  target="_blank"
                  >高雄市犬貓絕育(結紮)三合一活動【3月16日阿蓮場】
                </a>
              </li>
              <li>222</li>
              <li>333</li>
              <li>444</li>
              <li>555</li>
            </ul>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div v-if="isLoaded" class="info-container animate__animated animate__fadeInRight">
            <h1 class="info">活動資訊</h1>
            <p>More details about activities and events can be added here.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="!isLoading" class="webm-container">
      <video
        ref="webmVideo"
        autoplay
        loop
        muted
        @mouseenter="showHoverMessage = true"
        @mouseleave="showHoverMessage = false"
      >
        <source src="../assets/Cat_Animation.webm" type="video/webm" />
      </video>
      <div :class="{ 'hover-message': true, show: showHoverMessage }">Meow</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import { gsap } from 'gsap'

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
    const isLoading = ref(true) // 用於顯示/隱藏Loading動畫
    const isLoaded = ref(false)
    const showHoverMessage = ref(false)

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false
        isLoaded.value = true // 讓歡迎標題顯示
      }, 3000)
    })

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper
    }

    const onSlideChange = (swiper) => {
      activeIndex.value = swiper.realIndex
    }

    const isActiveThumb = (index) => {
      return activeIndex.value === index
    }

    const webmVideo = ref(null)

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false
        setTimeout(() => {
          isLoaded.value = true
          gsap.from('.news', { x: -1000, opacity: 0.5, duration: 3 }) // 👈 加入滑入動畫
          gsap.from('.info', { x: 1000, opacity: 0.5, duration: 3 }) // 👈 加入滑入動畫
        })
      }, 3000)
    })

    // 使用GSAP動畫讓WebM視頻淡入
    gsap.fromTo(webmVideo.value, { opacity: 0 }, { opacity: 1, duration: 10, delay: 1 })

    return {
      images,
      thumbsSwiper,
      setThumbsSwiper,
      onSlideChange,
      isActiveThumb,
      modules: [FreeMode, Navigation, Thumbs],
      webmVideo,
      isLoading,
      isLoaded,
      showHoverMessage,
    }
  },
}
</script>

<style scoped>
/* 載入動畫的樣式 (WebM 動圖) */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-video {
  width: 80%;
  max-width: 300px;
  height: auto;
}

/* 主要內容 */
.container {
  background-color: #ebe9e9 !important;
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
  padding: 30px;
  border-radius: 8px;
  background-color: #dfcdcd; /* 背景顏色，增加可讀性 */
  opacity: 0.7;
}

.news,
.info {
  text-align: left;
  margin-bottom: 20px; /* 給標題一點底部間距 */
  color: #757575;
}

/* WebM 動畫區域 */
.webm-container {
  position: relative;
  text-align: right;
  display: inline-block;
}

/* Hover Meow 對話框 */
.hover-message {
  position: absolute;
  bottom: 100px;
  left: 80px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 15px;
  border-radius: 70%;
  font-size: 65px;
  font-family: 'Zen Old Mincho', serif;
  white-space: nowrap;
  transition: opacity 1s ease-in-out;
  opacity: 0;
}

.show {
  opacity: 0.8;
}
</style>
