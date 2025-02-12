<template>
  <h1>幼貓飼養</h1>
  <v-card class="card">
    <v-tabs v-model="tab" class="tabs">
      <div class="v">
        <v-tab value="one">新生期</v-tab>
        <v-divider vertical></v-divider>
        <v-tab value="two">換牙期</v-tab>
        <v-divider vertical></v-divider>
        <v-tab value="three">換毛期</v-tab>
      </div>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit aliquid repellat
          repellendus nemo! Voluptatum voluptate, doloribus officia cum quia vero molestiae magnam
          earum perspiciatis consequuntur ab repellat ipsum enim veniam.
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit aliquid repellat
          repellendus nemo! Voluptatum voluptate, doloribus officia cum quia vero molestiae magnam
          earum perspiciatis consequuntur ab repellat ipsum enim veniam.
        </v-tabs-window-item>
        <v-tabs-window-item value="three">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit aliquid repellat
          repellendus nemo! Voluptatum voluptate, doloribus officia cum quia vero molestiae magnam
          earum perspiciatis consequuntur ab repellat ipsum enim veniam.
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    tab: null,
  }),
}
</script>

<style>
h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 100px;
  color: #67595e;
  font-family: 'Zen Old Mincho', serif;
}
.card {
  margin: 20px auto;
  width: 80%;
  /* padding: 20px; */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(37, 46, 88, 0.76);
  height: 100%;
}

.v-tab {
  font-size: 16px !important;
  font-family: 'Zen Old Mincho', serif !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.v {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: #67595e;
  background-color: #e8b4b8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: 'Zen Old Mincho', serif;
}
.v-tabs-window {
  font-family: 'Zen Old Mincho', serif;
  font-size: 20px;
}
</style>
