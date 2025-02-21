<template>
  <v-card>
    <v-img :src="image" height="200" cover></v-img>
    <v-card-title>
      <router-link :to="'/cat/' + _id">{{ name }}</router-link>
    </v-card-title>
    <v-card-subtitle>{{ $t('catCategory.' + category) }}</v-card-subtitle>
    <v-card-subtitle>{{ age }}</v-card-subtitle>
    <v-card-text>{{ description }}</v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  breed: {
    type: String,
    default: '',
  },
  age: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
  likes: {
    type: Number,
    default: 0,
  },
  isAdopting: {
    type: Boolean,
    default: true,
  },
})
</script>
