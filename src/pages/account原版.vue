<template>
  <v-container fluid>
    <!-- 側邊導航列 -->
    <v-navigation-drawer permanent class="drawer">
      <v-list>
        <!-- 顯示用戶的 Avatar 和帳戶名稱 -->
        <v-list-item>
          <template #prepend>
            <div class="user-svg" v-html="user.svg"></div>
          </template>
          <v-list-item-title class="account-title">{{ user.account }}</v-list-item-title>
          <!-- 显示用户名 -->
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- 導航列 -->
      <v-list>
        <v-list-item
          v-for="nav in navs"
          :key="nav.to"
          :prepend-icon="nav.icon"
          :title="nav.text"
          :to="nav.to"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 主內容區域 -->

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-main>
      <v-container>
        <!-- 動態顯示內容 -->
        <div v-if="selectedNav === 'memberData'">
          <h2>會員資料</h2>
          <v-form ref="form" v-model="formValid">
            <!-- 用戶名（不可修改） -->
            <v-text-field
              v-model="user.account"
              label="使用者帳號"
              :rules="[rules.required]"
              outlined
            ></v-text-field>

            <!-- 用戶電子郵件（不可修改） -->
            <v-text-field
              v-model="user.email"
              label="電子郵件"
              :rules="[rules.email]"
              outlined
            ></v-text-field>

            <!-- 用戶電話 -->
            <v-text-field
              v-model="user.phone"
              label="電話"
              :rules="[rules.required]"
              outlined
            ></v-text-field>

            <!-- 保存按鈕 -->
            <v-btn :disabled="!formValid" @click="saveData">保存</v-btn>
          </v-form>
        </div>

        <div v-if="selectedNav === 'favorites'">
          <h2>收藏列表</h2>
          <!-- 收藏列表內容 -->
          <ul>
            <li v-for="item in favoriteItems" :key="item.id">{{ item.name }}</li>
          </ul>
        </div>

        <div v-if="selectedNav === 'settings'">
          <h2>設定</h2>
          <!-- 設定內容 -->
          <p>111</p>
        </div>
      </v-container>
    </v-main>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
// import axios from 'axios'
import { useUserStore } from '@/stores/user'

import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const user = useUserStore()
console.log('123', user.svg)

const navs = computed(() => {
  return [
    { text: '會員資料', icon: 'mdi-account', to: 'memberData' },
    { text: '收藏列表', icon: 'mdi-heart', to: 'favorites' },
    { text: '首頁', icon: 'mdi-home', to: '/home' },
  ]
})

// const schema = yup.object({
//   phone: yup
//     .stirng()
//     // 翻譯檔要改 手機必填
//     .required(t('api.')),
// })
// export default {
//   data() {
//     return {
//       // 用戶資料
//       user: {
//         account: '',
//         email: '',
//         phone: '0912345678',
//         svg: '<svg>...</svg>',
//       },
//       // 表單驗證規則
//       rules: {
//         required: (value) => !!value || '此欄位為必填',
//         email: (value) => /.+@.+\..+/.test(value) || '請輸入有效的電子郵件地址',
//       },
//       // 導航選項
//
//       // 記錄當前選擇的導航項
//       selectedNav: 'memberData', // 預設顯示會員資料
//       // 假設的收藏項目
//       favoriteItems: [
//         { id: 1, name: 'Item 1' },
//         { id: 2, name: 'Item 2' },
//         { id: 3, name: 'Item 3' },
//       ],
//       formValid: {
//         rules: {
//           required: (value) => !!value || '此欄位為必填',
//           phone: (value) => /^[0-9]{10}$/.test(value) || '請輸入正確的手機號碼',
//         }, // 表單驗證
//       },
//     }
//   },

//   mounted() {
//     // 呼叫 API 來獲取當前用戶資料
//     this.fetchUserData()
//   },

//   methods: {
//     async fetchUserData() {
//       try {
//         // 假设后端有 /user/me 这个接口，返回当前登录的用户数据
//         const response = await axios.get('/user/me') // 根据实际情况调整接口路径
//         const userData = response.data
//         console.log(userData)
//         this.user = { ...this.user, ...userData }
//         console.log(this.user)
//       } catch (error) {
//         console.error('無法獲取用戶資料:', error)
//       }
//     },

//     // 设置当前选择的导航项
//     selectNav(nav) {
//       if (nav.to === '/home') {
//         this.$router.push('/home')
//       } else {
//         this.selectedNav = nav.to
//       }
//     },

//     saveData() {
//       if (this.$refs.form.validate()) {
//         // 提交更新的数据，确保不修改 `account` 和 `email`
//         axios
//           .patch('/user/' + this.user._id, {
//             phone: this.user.phone, // 只提交需要更新的字段
//           })
//           .then((response) => {
//             console.log('资料已成功保存:', response.data)
//             this.user = response.data
//           })
//           .catch((error) => {
//             console.error('保存资料失败:', error)
//           })
//       }
//     },
//   },
// }
</script>

<style scoped>
.drawer {
  width: 250px;
}

.account-title {
  font-weight: bold;
  font-size: 18px;
}

.user-svg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
