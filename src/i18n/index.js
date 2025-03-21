import { createI18n } from 'vue-i18n'
import zhHant from './zhHant'
import en from './en'
import jp from './jp'

const i18n = createI18n({
  locale: 'zhHant',
  fallback: 'zhHant',
  legacy: false,
  messages: {
    zhHant,
    en,
    jp,
  },
})

export default i18n
