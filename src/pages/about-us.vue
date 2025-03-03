<template>
  <v-main class="main">
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
            </div>
          </v-img>
        </v-col>
        <v-col cols="6" class="d-flex align-start">
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

    <!-- 引入WebM格式影片並調整大小 -->
    <div class="FB_container">
      <a href="https://www.facebook.com/share/g/16DH6wB3wY/" target="_blank">
        <video ref="webmVideo" autoplay loop muted>
          <source src="@/assets/facebook.webm" type="video/webm" />
        </video>
      </a>
    </div>

    <div class="IG_container">
      <a
        href="https://www.instagram.com/peggicl1712?igsh=amQwaXNiMWU5ejly&utm_source=qr"
        target="_blank"
      >
        <video ref="webmVideo" autoplay loop muted>
          <source src="@/assets/IG.webm" type="video/webm" />
        </video>
      </a>
    </div>

    <div id="app">
      <vue-particles
        id="tsparticles"
        class="tsparticles"
        :particles-loaded="particlesLoaded"
        :options="particlesOptions"
      />
    </div>
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
          zIndex: -1,
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
    }
  },
  methods: {
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
.main {
  width: 100%;
  background: #e1d8d7;
  opacity: 0.9;
}
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

.FB_container {
  width: 500px;
  text-align: top;
  position: absolute;
  top: 220px;
  right: 560px;
  opacity: 0.9;
}

.IG_container {
  width: 280px;
  text-align: top;
  position: absolute;
  top: 620px;
  right: 680px;
  opacity: 0.9;
}
video {
  width: 90%; /* 根據需要調整大小 */
  height: auto;
}
</style>
