<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" sm="6" md="4">
        <v-text-field
          v-model="searchQuery"
          label="搜尋"
          clearable
          outlined
          dense
          class="search-field"
          @input="onSearch"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    onSearch() {
      // 當用戶輸入時觸發搜尋
    },
  },
}
</script>

<style scoped>
.search-field {
  margin-top: 20px;
  text-align: center; /* 使搜尋框置中 */
}

.v-container,
.v-row {
  background-color: #f0f0f0; /* 可以幫助檢查容器是否正確顯示 */
}
</style>
