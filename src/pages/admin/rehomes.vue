<template>
  <v-main class="container">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center font-weight-bold" style="color: #a59aa3">
            {{ $t('nav.adminRehomes') }}
          </h1>
        </v-col>
      </v-row>
      <v-form>
        <v-progress-linear v-if="loading" indeterminate></v-progress-linear>

        <v-table v-else dense class="elevation-1">
          <thead class="bg-primary text-white">
            <tr>
              <th>{{ $t('user.email') }}</th>
              <th>{{ $t('cat.name') }}</th>
              <th>{{ $t('cat.age') }}</th>
              <th>{{ $t('cat.breed') }}</th>
              <th>{{ $t('cat.gender') }}</th>
              <th>{{ $t('cat.description') }}</th>
              <th>{{ $t('cat.image') }}</th>
              <th>{{ $t('cat.reviewStatus') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in rehomeFroms"
              :key="index"
              :class="{ 'bg-light': index % 2 === 0 }"
            >
              <td>{{ item.email }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ item.breed }}</td>
              <td>{{ item.gender }}</td>
              <td>{{ item.description }}</td>
              <td>
                <v-img :src="item.image" width="50" height="50" contain></v-img>
              </td>
              <td>
                <!-- 管理者可以更改審核狀態 -->
                <v-select
                  v-model="item.status"
                  :items="reviewStatuses"
                  dense
                  outlined
                  class="mx-1"
                ></v-select>
              </td>
            </tr>
          </tbody>
        </v-table>

        <!-- 提交按鈕 -->
        <v-btn color="primary" :loading="loading" :disabled="loading" @click="submitChanges">
          {{ $t('common.submit') }}
        </v-btn>
      </v-form>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const loading = ref(false)

const rehomeFroms = ref([])

const reviewStatuses = ref([
  { title: '待審核', value: 'pending' },
  { title: '審核通過', value: 'approved' },
  { title: '審核失敗', value: 'rejected' },
])

// 從後端獲取送養表單
const getRehomeForm = async () => {
  loading.value = true
  try {
    const response = await apiAuth.get('/rehome')
    rehomeFroms.value = response.data.result
  } catch (error) {
    console.log('rehomeForm', error)
    createSnackbar({ text: '獲取送養資料失敗', color: 'error' })
  } finally {
    loading.value = false
  }
}

// 更新狀態並提交
const updateStatus = async (item) => {
  try {
    const response = await apiAuth.patch(`/rehome/${item._id}`, {
      status: item.status,
    })
    createSnackbar({ text: '審核狀態更新成功', color: 'success' })

    // 更新本地資料
    const index = rehomeFroms.value.findIndex((r) => r._id === item._id)
    if (index !== -1) {
      rehomeFroms.value[index] = response.data.result
    }
  } catch (error) {
    console.log('updateStatus', error)
    createSnackbar({ text: '更新失敗', color: 'error' })
  }
}

// 提交所有變更
const submitChanges = async () => {
  loading.value = true
  try {
    // 逐一更新每個送養表單的狀態
    for (const item of rehomeFroms.value) {
      await updateStatus(item)
    }
    createSnackbar({ text: '所有狀態更新成功', color: 'success' })
  } catch (error) {
    console.log('提交', error)
    createSnackbar({ text: '部分狀態更新失敗', color: 'error' })
  } finally {
    loading.value = false
  }
}

onMounted(getRehomeForm)
</script>

<route lang="yaml">
meta:
  layout: admin
  login: true
  admin: true
  title: 'nav.adminRehomes'
</route>

<style scoped>
.container {
  height: 100vh;
<<<<<<< HEAD
  background: rgba(255, 239, 213, 0.363);
=======
  background: #ddcfd7;
>>>>>>> d197db0b129941a398854a894ea9407ad7ff5159
  display: flex;
  justify-content: center;
  align-items: start;
}
.v-container {
  width: 100%;
  margin-right: 220px;
}
.v-table {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 20px;
}

th {
  font-weight: 600;
  font-size: 1rem;
}

td {
  font-size: 0.9rem;
  padding: 12px;
}

.v-select {
  padding: 10px;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
