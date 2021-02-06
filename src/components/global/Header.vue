<template>
  <div>
    <v-app-bar
      app
      color="white"
    >
      <v-container class="py-0 fill-height">
        <v-img
          :src="require('@/assets/Kim_Dongjin.png')"
          contain
          @click="moveHome"
        ></v-img>
        <v-spacer></v-spacer>
        <SearchForm  v-if="!isMobile"/>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SearchForm from "@/components/form/SearchForm"

export default {
  name: "Header",
  data () {
    return {
      drawer: false,
    }
  },
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

