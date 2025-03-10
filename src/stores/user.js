// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import avatar from 'animal-avatar-generator'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const account = ref('')
    const role = ref(UserRole.USER)
    const cart = ref(0)
    const svg = ref('')
    const id = ref('')
    const email = ref('')
    const phone = ref(null)
    const image = ref('')
    const favorites = ref('')
    const rehome = ref('')

    const updateImage = (newImageUrl) => {
      image.value = newImageUrl
    }

    const isLoggedIn = computed(() => {
      return token.value.length > 0
    })

    const isAdmin = computed(() => {
      return role.value === UserRole.ADMIN
    })

    svg.value = avatar('your users seed', { size: 50 })

    const login = (data) => {
      if (data.token) {
        token.value = data.token
      }
      account.value = data.account
      role.value = data.role
      cart.value = data.cart
      id.value = data._id
      email.value = data.email
      phone.value = data.phone || null
      image.value = data.image || ''
      favorites.value = data.favorites
      rehome.value = data.rehome
    }

    const logout = () => {
      token.value = ''
      account.value = ''
      email.value = ''
      role.value = UserRole.USER
      cart.value = 0
      image.value = ''
      favorites.value = ''
      rehome.value = ''
    }

    return {
      token,
      account,
      role,
      cart,
      email,
      phone,
      image,
      favorites,
      updateImage,
      id,
      isLoggedIn,
      isAdmin,
      svg,
      login,
      logout,
      rehome,
    }
  },
  {
    persist: {
      key: 'shop-user',
      pick: ['token', 'image', 'favorites'],
    },
  },
)
