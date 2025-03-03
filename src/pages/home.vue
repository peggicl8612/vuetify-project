<template>
<<<<<<< HEAD
  <div class="v-container">
    <!-- 載入動畫 -->
=======
  <div class="container">
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
    <div v-if="isLoading" class="loading-overlay">
      <video autoplay loop muted class="loading-video">
        <source src="../assets/Cat_Animation.webm" type="video/webm" />
      </video>
    </div>

<<<<<<< HEAD
    <!-- 主輪播圖 -->
=======
    <!-- 主要內容區塊 -->
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
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
<<<<<<< HEAD
        <div class="image-container">
          <img :src="image.src" />
          <div class="image-text">{{ image.text }}</div>
          <!-- 加入圖片對應的文字 -->
        </div>
      </swiper-slide>
    </swiper>

    <!-- 縮略圖輪播圖 -->
=======
        <img :src="image" />
      </swiper-slide>
    </swiper>

    <!-- 其他內容 -->
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
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
<<<<<<< HEAD
        <img :src="image.src" />
      </swiper-slide>
    </swiper>

    <!-- 最新消息與活動資訊 -->

    <v-row v-if="!isLoading">
      <v-col cols="12" md="6">
        <v-card class="cute-card">
          <div v-if="isLoaded" class="news-container animate__animated animate__fadeInLeft">
            <h1 class="news">最新消息</h1>
            <br />
            <ul>
              <li>
                114/01/13
                <a
                  href="https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001552"
                  target="_blank"
                  >臺中市動保處與農業部合作，一同守護毛孩健康</a
                >
              </li>
              <br />
              <li>
=======
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
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
                114/02/11
                <a
                  href="https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001630"
                  target="_blank"
<<<<<<< HEAD
                  >高雄市犬貓絕育(結紮)三合一活動【3月16日阿蓮場】</a
                >
              </li>
              <br />
              <li>
                114/02/25
                <a href="https://animal.moa.gov.tw/Frontend/News/LatestNews?tab=0" target="_blank"
                  >南昌動保園區114年3月開辦動保講座</a
                >
              </li>
              <br />
              <li>
                114/02/27
                <a
                  href="http://animal.moa.gov.tw/Frontend/News/Detail/N0000000001661"
                  target="_blank"
                  >中市開春迎新 大家快來參加犬貓狂犬病巡迴注射活動！</a
                >
              </li>
              <br />
              <li>
                114/02/28
                <a
                  href="https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001450"
                  target="_blank"
                  >「寵物食品檢驗不合格產品專區」不定期公布，請民眾可到寵物食品申報網瀏覽查詢</a
                >
              </li>
              <br />
              <br />
              <br />
              <div class="more"><a href="#">查看更多</a></div>
            </ul>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="cute-card">
          <div v-if="isLoaded" class="info-container animate__animated animate__fadeInRight">
            <h1 class="info">活動資訊</h1>
            <br />
            <ul>
              <li>
                114/02/01
                <a href="https://pet-fair.top-link.com.tw/page/13593" target="_blank"
                  >南港展覽館二館「給浪浪一個家」領養活動</a
                >
              </li>
              <br />
              <li>
                114/02/05
                <a href="https://www.doghome.org.tw/pages/single_page.php?ID=171" target="_blank"
                  >高流浪動物花園送養活動</a
                >
              </li>
              <br />
              <li>
                114/02/10
                <a
                  href="https://mypet-club.com/phpBB3/portal.php?fbclid=IwZXh0bgNhZW0CMTAAAR0xuvSaTv-y99ezRr2Z-ghV2fZDPJu9mJhuY6nBjIjjsK6GhVAeEfDS3_o_aem_bqiWOb8IrA9zQ_ealNPEUA"
                  target="_blank"
                  >臺北市流浪貓保護協會認養活動</a
                >
              </li>
              <br />
              <li>
                114/02/25
                <a
                  href="https://www.facebook.com/twPetpark/posts/pfbid02EwM3Dbo5HTne2vR9MP9Et49W5b7183dtXCycxLHH2fyChdGQCdS3GVwbcCDCiX4vl?locale=zh_TW"
                  target="_blank"
                  >寵物公園毛孩領養會</a
                >
              </li>
              <br />
              <br />
              <br />
              <div class="more"><a href="#">查看更多</a></div>
            </ul>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- WebM 動畫影片區域 -->
=======
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

>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
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
<<<<<<< HEAD
      { src: 'https://i.imgur.com/LjEbMqs.jpeg', text: '歡迎來到咪凹屋' },
      { src: 'https://i.imgur.com/2scnSBL.jpeg', text: '' },
      { src: 'https://i.imgur.com/hxAFsLi.jpeg', text: '' },
      { src: 'https://i.imgur.com/f7FZqaU.jpeg', text: '' },
=======
      'https://i.imgur.com/LjEbMqs.jpeg',
      'https://i.imgur.com/2scnSBL.jpeg',
      'https://i.imgur.com/hxAFsLi.jpeg',
      'https://i.imgur.com/f7FZqaU.jpeg',
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
    ])

    const thumbsSwiper = ref(null)
    const activeIndex = ref(0)
<<<<<<< HEAD
    const isLoading = ref(true)
=======
    const isLoading = ref(true) // 用於顯示/隱藏Loading動畫
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
    const isLoaded = ref(false)
    const showHoverMessage = ref(false)

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false
<<<<<<< HEAD
        isLoaded.value = true
        gsap.from('.news', { x: -1000, opacity: 0.5, duration: 3 })
        gsap.from('.info', { x: 1000, opacity: 0.5, duration: 3 })
=======
        isLoaded.value = true // 讓歡迎標題顯示
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
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

<<<<<<< HEAD
=======
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

>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
    return {
      images,
      thumbsSwiper,
      setThumbsSwiper,
      onSlideChange,
      isActiveThumb,
      modules: [FreeMode, Navigation, Thumbs],
<<<<<<< HEAD
=======
      webmVideo,
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
      isLoading,
      isLoaded,
      showHoverMessage,
    }
  },
}
</script>

<style scoped>
<<<<<<< HEAD
=======
/* 載入動畫的樣式 (WebM 動圖) */
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
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
<<<<<<< HEAD
=======
.container {
  background-color: #ebe9e9 !important;
  height: 100vh;
  padding: 20px;
}
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159

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

<<<<<<< HEAD
.mySwiper2 .image-container {
  position: relative;
}

.mySwiper2 .image-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.432);
  font-size: 60px;
  padding: 10px;
  font-family: 'Zen Old Mincho', serif;
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

.cute-card {
  background: linear-gradient(135deg, #f4c1c8, #e5e6ba);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(255, 105, 180, 0.3);
  /* text-align: center; */
  transition: transform 0.3s ease-in-out;
  height: 500px;
  font-family: 'Zen Kurenaido', sans-serif;
}

.cute-card:hover {
  transform: translateY(-10px);
}

.cute-card a {
  color: #757575;
}

.cute-card a:visited {
  color: rgb(228, 195, 134);
}

.news-container,
.info-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 15px;
  height: 500px;
}

.news,
.info {
  color: #d63384;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
}

=======
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

>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
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
<<<<<<< HEAD
}

.more {
  text-align: right;
  color: #757575;
}
.more a:visited {
  color: #757575;
=======
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
}
</style>
