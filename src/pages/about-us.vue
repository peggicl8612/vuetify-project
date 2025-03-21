<template>
  <v-main class="main">
    <v-container>
      <v-row>
        <!-- 左側欄：圖片 + 平台理念 -->
        <v-col cols="12" md="6" class="d-flex flex-column align-center">
          <v-img max-width="100%" src="https://i.imgur.com/DdoVDot.png" class="image"></v-img>
          <div class="overlay">
            <p class="content">
              在這個快節奏的社會中，許多貓咪因各種原因被迫與原生家庭分離，它們需要一個新的家、一個能夠給予愛與關懷的避風港。
              因此，我們建立了這個貓咪送養平台，希望能夠成為流浪貓與新家庭之間的橋樑，讓每一隻貓都能擁有溫暖的歸屬。
            </p>
          </div>
        </v-col>

        <!-- 右側欄：聯繫我們 + 社群連結影片 -->
        <v-col cols="12" md="6" class="d-flex flex-column align-center">
          <!-- 聯繫我們 -->
          <div class="contact-container d-flex justify-center align-center">
            <v-col cols="12">
              <div class="text-center contact-card">
                <h1>聯繫我們</h1>
                <v-divider class="my-1"></v-divider>
                <p>TEL: (02)XXXX-XXXX</p>
                <p>Email: meow@gmail.com</p>
                <p>Contact: Ms.Lin</p>
              </div>
            </v-col>
          </div>

          <!-- 社群連結影片 -->
          <v-row class="social-media-row">
            <v-col cols="6" class="d-flex justify-center">
              <div class="FB_container">
                <a href="https://www.facebook.com/share/g/16DH6wB3wY/" target="_blank">
                  <video ref="facebookVideo" autoplay loop muted>
                    <source src="@/assets/facebook.webm" type="video/webm" />
                  </video>
                </a>
              </div>
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <div class="IG_container">
                <a
                  href="https://www.instagram.com/meowu_19/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                >
                  <video ref="instagramVideo" autoplay loop muted>
                    <source src="@/assets/IG.webm" type="video/webm" />
                  </video>
                </a>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      particlesOptions: {
        autoPlay: true,
        background: {
          color: {
            value: '#efefef',
          },
        },
        fullScreen: {
          enable: true,
          zIndex: 1,
        },
        detectRetina: true,
        fpsLimit: 120,
        interactivity: {
          detectsOn: 'window',
          events: {
            onClick: {
              enable: false,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'bubble',
              parallax: {
                enable: false,
                force: 2,
                smooth: 10,
              },
            },
            resize: {
              delay: 0.5,
              enable: true,
            },
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.5,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            remove: {
              quantity: 1,
            },
          },
        },
        particles: {
          collisions: {
            enable: false,
          },
          number: {
            value: 8,
            density: {
              enable: true,
              width: 1920,
              height: 1080,
            },
          },
          color: {
            value: '#b8b2b2',
          },
          shape: {
            type: 'circle',
            polygon: {
              sides: 6,
            },
          },
          size: {
            value: {
              min: 30,
              max: 100,
            },
          },
          move: {
            enable: true,
            speed: 10,
          },
        },
      },
      showDialog: true, // 彈跳視窗的顯示狀態
      showCloseButton: false, // 控制是否顯示關閉按鈕
    }
  },
  created() {
    this.openDialog() // 當頁面加載後顯示彈跳廣告
  },
  methods: {
    // 開始延遲顯示關閉按鈕
    openDialog() {
      setTimeout(() => {
        this.showCloseButton = true // 5 秒後顯示關閉按鈕
      }, 5000) // 延遲 5 秒
    },
    // 點擊關閉按鈕後關閉視窗
    closeDialog() {
      this.showDialog = false
    },
    // 當用戶點擊優惠連結時
    goToLink() {
      window.open('https://la-alex.github.io/vuetify-project/#/', '_blank')
    },
    // 導航到其他頁面
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
@media (max-width: 1024px) {
  /* 平台理念區塊 */
  .overlay {
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 15px;
    font-size: 16px;
    color: white;
    text-align: center;
  }

  /* 調整聯繫我們與 video 的排列 */
  .contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
  }

  .FB_container,
  .IG_container {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
}

@media (max-width: 600px) {
  .ad {
    width: 90%;
    padding: 10px;
    font-size: 18px;
  }
}

.main {
  width: 100%;
  background: #e1d8d7;
  opacity: 0.9;
  font-family: 'Zen Old Mincho', serif;
}

.image {
  width: 100%;

  position: relative;

  opacity: 0.9;
}
/* 平台理念 */
.overlay {
  width: 80%;
  position: absolute;
  top: 30%; /* 讓文字區塊置中 */
  left: 45%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 16px;
  padding: 20px;
  max-width: 800px; /* 控制最大寬度 */
  border-radius: 10px;
  color: white;
  z-index: 1; /* 讓文字區塊在圖片上層 */
  background: none;
}

.overlay p {
  font-size: 12px;
  line-height: 1.3;
}

.content {
  width: 400px;
  font-size: 16px;
  text-align: center;
  color: #e1d8d7;
}

.image {
  width: 100%; /* 讓圖片寬度符合容器 */
  height: auto; /* 讓圖片保持比例 */
  display: block;
}

.contact-card {
  width: 100%;
  background-color: #e1d8d7;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平置中 */
  justify-content: center; /* 垂直置中 */
  text-align: center; /* 確保文字置中 */
}

.contact-card h1 {
  text-align: center;
  margin: 0 auto;
  font-size: 32px;
}

.contact-container {
  width: 100%;
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.FB_container {
  width: 100%;
  display: flex;
  flex-direction: column; /* 預設為垂直排列 */
  align-items: center;
  justify-content: center;
}

.IG_container {
  width: 150px;
  display: flex;
  flex-direction: column; /* 預設為垂直排列 */
  align-items: center;
  justify-content: center;
}
video {
  width: 100%; /* 適應不同螢幕 */
  max-width: 300px;
}

/* 彈跳視窗的樣式 */
.ad {
  z-index: 9999; /* 確保彈跳視窗在最上層 */
  text-align: center;
  border: 1px solid #757575 !important;
  padding: 50px;
  font-family: 'Zen Old Mincho', serif;
  color: #757575;
  background-image: url('../assets/images/faq.png');
  font-size: 22px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  color: rgb(199, 155, 155);
  z-index: 1000;
}

.goto {
  background-color: #ada19f !important;
  font-size: 20px;
}
</style>

<!-- // 原本的平台理念
<p class="content">
  在這個快節奏的社會中，許多貓咪因各種原因被迫與原生家庭分離，它們需要一個新的家、一個能夠給予愛與關懷的避風港。因此，我們建立了這個貓咪送養平台，希望能夠成為流浪貓與新家庭之間的橋樑，讓每一隻貓都能擁有溫暖的歸屬。
  讓每一隻貓咪找到合適的家我們相信，每隻貓咪都是獨一無二的，它們有不同的個性、習慣和需求，因此送養並不是單純的轉手，而是幫助貓咪找到最適合的環境與家庭。我們的平台提供詳細的貓咪資料，包括年齡、品種、性格描述、健康狀況等，讓領養人能夠根據自身的生活型態選擇最合適的夥伴，確保送養成功率，減少二次棄養的可能性。
  打造負責任的送養與領養環境我們深知，領養貓咪不僅是一個愛心舉動，更是一份長期的責任。因此，我們的平台不僅僅是提供送養資訊，更希望透過審核與教育，確保送養與領養雙方都能夠做好準備。送養者需要確保貓咪的健康並提供基本資訊，而領養者則需評估自身條件是否適合養貓，並通過簡單的審核流程，確保貓咪能夠得到妥善照顧。
  推廣「以領養代替購買」的理念現今仍有許多貓咪因為過度繁殖或棄養而流浪街頭，等待一個能夠接納它們的家庭。我們鼓勵大家以領養的方式來獲得新家人，讓這些貓咪不再流離失所，同時也減少市場上不負責任的繁殖行為。我們也積極與動保團體、志工合作，推廣絕育與動物保護觀念，讓更多人認識領養的重要性。
  建立愛與信任的社群我們希望這個平台不僅是一個送養資訊站，更是一個有愛的社群。我們提供貓咪照顧知識、健康管理建議、領養成功故事分享，讓送養者、領養者及愛貓人士都能夠互相交流，共同為貓咪的福祉努力。
  每一隻貓咪的生命都值得被珍惜，每一次成功的送養都是一個溫暖的故事。我們相信，在大家的努力下，能夠讓更多貓咪找到幸福的歸宿，讓愛的傳遞不再中斷。💖
</p> -->
