<template>
  <v-responsive :max-width="maxWidth">
    <v-text-field
      :class="textClass"
      prepend-inner-icon="mdi-magnify"
      background-color="teal lighten-4"
      single-line
      hide-details
      rounded
      v-model="keyword"
      @keydown.enter="search"
    ></v-text-field>
  </v-responsive>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name:'search-form',
  data () {
    return {
      keyword:'',
    }
  }, 
  computed: {
    maxWidth() { 
      if (!this.$vuetify.breakpoint.smAndDown) {
        return "300";
      }
      return "100%";
    },
    textClass() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return "pt-0 pb-2";
      }
      return "";
    }
  },
  methods: {
    ...mapActions("postModule", ["requestClearPosts"]),
    search(event) {
      if (event.keyCode !== 13) return;
      this.requestClearPosts();
      this.$router.push({ name: 'post-list-search', params: {search: this.keyword} }).catch(() => {});
    }
  }
}
</script>

<style>

</style>