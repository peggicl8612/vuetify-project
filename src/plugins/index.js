/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import i18n from '@/i18n'
import VuetifyUseDialog from 'vuetify-use-dialog'
import VueFileAgentNext from '@boindil/vue-file-agent-next'
import '@boindil/vue-file-agent-next/dist/vue-file-agent-next.css'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
export function registerPlugins(app) {
  app
    .use(i18n)
    .use(vuetify)
    .use(VuetifyUseDialog, {
      snackbar: {
        showCloseButton: false,
        snackbarProps: {
          timeout: 2000,
        },
      },
    })
    .use(router)
    .use(pinia)
    .use(VueFileAgentNext)
    .use(Particles, {
      init: async (engine) => {
        await loadFull(engine)
      },
    })
}
