<template>
  <v-container fluid>
    <!-- 側邊導航列 -->
    <v-navigation-drawer permanent class="drawer">
      <v-list>
        <!-- 顯示用戶的 Avatar -->
        <v-list-item>
          <template #prepend>
            <div class="user-svg" v-html="user.svg"></div>
          </template>
          <v-list-item-title class="account-title">{{ user.account }}</v-list-item-title>
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
          @click="selectNav(nav)"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 主內容區域 -->
    <v-main>
      <v-container>
        <!-- 動態顯示內容 -->
        <div v-if="selectedNav === 'memberData'">
          <h2>會員資料</h2>
          <v-form ref="form" v-model="formValid">
            <!-- 用戶名（禁用） -->
            <v-text-field
              v-model="user.account"
              label="帳戶名稱"
              :rules="[rules.required]"
              outlined
              disabled
            ></v-text-field>

            <!-- 用戶電子郵件（禁用） -->
            <v-text-field
              v-model="user.email"
              label="電子郵件"
              :rules="[rules.email]"
              outlined
              disabled
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
          <p>112</p>
        </div>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // 用戶資料
      user: {
        account: '22222', // 設定帳號名稱
        email: '', // 預設為空，將從後端或登入過程中獲取
        phone: '0912345678', // 新增電話欄位
        svg: '<svg>...</svg>', // 用戶的 SVG 圖像
      },
      // 表單驗證規則
      rules: {
        required: (value) => !!value || '此欄位為必填',
        email: (value) => /.+@.+\..+/.test(value) || '請輸入有效的電子郵件地址',
      },
      // 導航選項
      navs: [
        { text: '會員資料', icon: 'mdi-account', to: 'memberData' },
        { text: '收藏列表', icon: 'mdi-heart', to: 'favorites' },
        { text: '設定', icon: 'mdi-settings', to: 'settings' },
      ],
      // 記錄當前選擇的導航項
      selectedNav: 'memberData', // 預設顯示會員資料
      // 假設的收藏項目
      favoriteItems: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
      formValid: false, // 表單驗證
    }
  },
  mounted() {
    // 假設從後端或登入過程中取得用戶的資料
    this.fetchUserData()
  },
  methods: {
    // 模擬從後端取得用戶資料
    fetchUserData() {
      // 這裡假設您從後端獲取到的電子郵件資料
      // 假設 API 回傳的資料是這樣：
      const userData = {
        account: '22222',
        email: '22222@gmail.com',
        phone: '0912345678',
        svg: '<svg>...</svg>', // 用戶的 SVG 圖像
      }

      // 設置用戶資料
      this.user = { ...this.user, ...userData }
    },
    // 設定當前選擇的導航項目
    selectNav(nav) {
      this.selectedNav = nav.to
    },
    // 保存用戶資料
    saveData() {
      if (this.$refs.form.validate()) {
        // 當表單有效時，這裡可以進行保存操作，例如呼叫 API
        console.log('保存成功:', this.user)
      }
    },
  },
}
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
