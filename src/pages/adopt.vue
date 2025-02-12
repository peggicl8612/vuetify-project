<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="image">
        <img class="picture" src="https://picsum.photos/300/300/?random=10" />
        <v-img
          :width="50"
          :height="50"
          aspect-ratio="1/1"
          cover
          src="https://i.imgur.com/rfPKMiX.png"
          class="like"
        >
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.image {
  position: relative;
  display: inline-block;
}

.picture {
  width: 300px;
  height: 300px;
  display: block;
}

.like {
  position: absolute;
  bottom: 15px;
  left: 250px;
}
</style>
