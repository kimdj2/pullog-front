<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list>
      <v-list-item
        v-for="[icon, text, pageLink] in links"
        :key="icon"
        link
        @click="movePage(pageLink)"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name:'admin-sidebar',
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-lead-pencil', 'ポスト作成','admin-post-new'],
      ['mdi-format-list-bulleted-square', 'ポスト一覧', 'admin-post-list'],
    ],
  }),
  methods: {
    movePage(pageLink) {
      console.log(this);
      this.$router.push({ name: pageLink});
    },
  }
}
</script>

<style>

</style>