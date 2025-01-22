<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-container>

    <v-carousel hide-delimiters show-arrows="hover">
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup></script>

<style scoped>
.carousel {
  display: block;
  width: 100%;
}

.carousel-slide img {
  width: 100%;
  height: auto;
}
</style>
