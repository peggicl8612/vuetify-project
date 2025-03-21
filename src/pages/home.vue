<template>
  <div class="v-container">
    <!-- 載入動畫 -->
    <div v-if="isLoading" class="loading-overlay">
      <video autoplay loop muted class="loading-video">
        <source src="../assets/Cat_Animation.webm" type="video/webm" />
      </video>
    </div>

    <!-- 主輪播圖 -->
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
      <swiper-slide v-for="(item, index) in images" :key="index">
        <div class="image-container">
          <!-- 當圖片的 src 是影片檔案時，顯示影片 -->
          <template v-if="item.type === 'video'">
            <iframe
              :src="item.src"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              width="100%"
              height="500px"
            ></iframe>
          </template>

          <!-- 當 src 是圖片檔案時，顯示圖片 -->
          <template v-else>
            <img :src="item.src" />
          </template>
          <div class="image-text">{{ item.text }}</div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- 縮略圖輪播圖 -->
    <!-- <swiper
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
        <img :src="image.src" />
      </swiper-slide>
    </swiper> -->

    <!-- 最新消息與活動資訊 -->

    <v-row v-if="!isLoading">
      <v-col cols="12" md="6">
        <v-card class="cute-card">
          <div v-if="isLoaded" class="news-container animate__animated animate__fadeInLeft">
            <h1 class="news">最新消息</h1>

            <br />
            <ul>
              <li v-for="(news, index) in visibleNews" :key="index">
                {{ news.date }} <a :href="news.link" target="_blank">{{ news.title }}</a>
              </li>
            </ul>
            <br />
            <br />
            <br />
            <div class="more">
              <a href="#" @click.prevent="toggleMoreNews">{{
                showMoreNews ? '顯示更少' : '查看更多'
              }}</a>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="cute-card">
          <div v-if="isLoaded" class="info-container animate__animated animate__fadeInRight">
            <h1 class="info">活動資訊</h1>
            <br />

            <li v-for="(event, index) in visibleEvents" :key="index">
              {{ event.date }} <a :href="event.link" target="_blank">{{ event.title }}</a>
            </li>
            <br />
            <br />
            <br />
            <div class="more">
              <a href="#" @click.prevent="toggleMoreEvents">{{
                showMoreEvents ? '顯示更少' : '查看更多'
              }}</a>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- WebM 動畫影片區域 -->
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
      { src: 'https://i.imgur.com/LjEbMqs.jpeg', text: '歡迎來到咪凹屋', type: 'image' },
      {
        src: 'https://www.youtube.com/embed/r0NO3AyXieE?si=Srez-dR3hZTgDbOh',
        text: '貓咪動畫',
        type: 'video',
      },
      // { src: 'https://i.imgur.com/2scnSBL.jpeg', text: '', type:'image' },
      { src: 'https://i.imgur.com/hxAFsLi.jpeg', text: '', type: 'image' },
      { src: 'https://i.imgur.com/f7FZqaU.jpeg', text: '', type: 'image' },
    ])

    const thumbsSwiper = ref(null)
    const activeIndex = ref(0)
    const isLoading = ref(true)
    const isLoaded = ref(false)
    const showHoverMessage = ref(false)

    // 記錄所有消息和活動資料
    const allNews = ref([
      {
        date: '114/01/13',
        title: '臺中市動保處與農業部合作，一同守護毛孩健康',
        link: 'https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001552',
      },
      {
        date: '114/02/11',
        title: '高雄市犬貓絕育(結紮)三合一活動【3月16日阿蓮場】',
        link: 'https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001630',
      },
      {
        date: '114/02/25',
        title: '南昌動保園區114年3月開辦動保講座',
        link: 'https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001656',
      },
      {
        date: '114/02/27',
        title: '中市開春迎新 大家快來參加犬貓狂犬病巡迴注射活動！',
        link: 'http://animal.moa.gov.tw/Frontend/News/Detail/N0000000001661',
      },
      {
        date: '114/02/28',
        title: '寵物食品檢驗不合格產品專區不定期公布',
        link: 'https://animal.moa.gov.tw/Frontend/News/Detail/N0000000001450',
      },
    ])
    const allEvents = ref([
      {
        date: '114/02/01',
        title: '南港展覽館二館「給浪浪一個家」領養活動',
        link: 'https://pet-fair.top-link.com.tw/page/13593',
      },
      {
        date: '114/02/05',
        title: '高流浪動物花園送養活動',
        link: 'https://www.doghome.org.tw/pages/single_page.php?ID=171',
      },
      {
        date: '114/02/10',
        title: '臺北市流浪貓保護協會認養活動',
        link: 'https://mypet-club.com/phpBB3/portal.php?fbclid=IwZXh0bgNhZW0CMTAAAR0xuvSaTv-y99ezRr2Z-ghV2fZDPJu9mJhuY6nBjIjjsK6GhVAeEfDS3_o_aem_bqiWOb8IrA9zQ_ealNPEUA',
      },
      {
        date: '114/02/25',
        title: '寵物公園毛孩領養會',
        link: 'https://www.facebook.com/twPetpark/posts/pfbid02EwM3Dbo5HTne2vR9MP9Et49W5b7183dtXCycxLHH2fyChdGQCdS3GVwbcCDCiX4vl?locale=zh_TW',
      },
    ])

    const visibleNews = ref(allNews.value.slice(0, 3))
    const visibleEvents = ref(allEvents.value.slice(0, 3))

    const showMoreNews = ref(false)
    const showMoreEvents = ref(false)

    const toggleMoreNews = () => {
      showMoreNews.value = !showMoreNews.value
      visibleNews.value = showMoreNews.value ? allNews.value : allNews.value.slice(0, 3)
    }

    const toggleMoreEvents = () => {
      showMoreEvents.value = !showMoreEvents.value
      visibleEvents.value = showMoreEvents.value ? allEvents.value : allEvents.value.slice(0, 3)
    }

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false
        isLoaded.value = true
        gsap.from('.news', { x: -1000, opacity: 0.5, duration: 3 })
        gsap.from('.info', { x: 1000, opacity: 0.5, duration: 3 })
      }, 2000)
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

    return {
      images,
      thumbsSwiper,
      setThumbsSwiper,
      onSlideChange,
      isActiveThumb,
      modules: [FreeMode, Navigation, Thumbs],
      isLoading,
      isLoaded,
      showHoverMessage,
      visibleNews,
      visibleEvents,
      showMoreNews,
      showMoreEvents,
      toggleMoreNews,
      toggleMoreEvents,
    }
  },
}
</script>

<style scoped>
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

.carousel-video {
  width: 100%;
  height: 500px;
  object-fit: cover;
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

.news-container li,
.info-container li {
  margin-bottom: 15px;
  font-size: 16px;
}
.news,
.info {
  color: #d63384;
  font-size: 36px;
  font-weight: bold;
  margin-left: 20px;
  text-align: center;
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

.more {
  text-align: right;
  color: #757575;
}
.more a:visited {
  color: #757575;
}
</style>
