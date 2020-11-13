<template>
  <v-app-bar
    app
    color="white"
  >
    <v-container class="py-0 fill-height" v-if="isMobile">
    </v-container>
    <v-container class="py-0 fill-height" v-else>
      
      <v-img
        :src="require('@/assets/logo.png')"
        max-height="50"
        max-width="100"
        contain
        @click="moveHome"
      ></v-img>
      <v-spacer></v-spacer>
      <SearchForm />
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
import SearchForm from "@/components/form/SearchForm"

export default {
  name: "Header",
  components: {
    SearchForm,
  },
  computed: {
    isMobile: function(){ 
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    ...mapActions("postModule", ["requestClearPosts"]),
    moveHome(){
      this.requestClearPosts();
      this.$router.push({ name: 'post-home'}).catch(() => {});
    },
  },
};
</script>

