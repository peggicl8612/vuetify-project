<div class="text-center">
  <v-btn color="dark">
    喵的資訊
    <v-menu activator="parent">
      <v-list>
        <!-- 第一層列表 -->
        <v-list-item link>
          <v-list-item-title>飲食知識</v-list-item-title>
          <template #append>
            <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
          </template>

          <!-- 第二層列表 (飲食知識) -->
          <v-menu :open-on-focus="false" activator="parent" open-on-hover submenu>
            <v-list>
              <v-list-item link>
                <v-list-item-title>幼貓飼養</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title>成貓飼養</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item>

        <!-- 第二層列表 -->
        <v-list-item link>
          <v-list-item-title>疾病資訊</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</div>
