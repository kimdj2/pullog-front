<template>
  <v-sheet rounded="lg" elevation="2">
    <v-skeleton-loader
      v-if="loading"
      type="article, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-card color="transparent" v-else>
      <v-subheader>
        <v-icon>mdi-history</v-icon>
        Recent Posts
      </v-subheader>
      <v-card-text class="pa-0">
        <v-col 
          cols='12'
          class="pa-0 py-2"
          v-for="post in recentPosts"
          :key="post.id"
        >
          <v-card class="mx-2 pa-0" outlined @click="movePage(post.id)">
            <v-img
              v-if="post.image_path"
              :src="post.image_path"
              class="white--text align-center justify-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100"
            >
            </v-img>
            <v-img
              :src="require('@/assets/no_image.png')"
              v-else
              class="align-center justify-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100"
            >
              <v-card-subtitle v-text="post.title" class="black--text text-center"></v-card-subtitle>
            </v-img>
            <v-card-subtitle height="50" class="font-weight-bold">
              {{cutTitleLength(post.title)}}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import axios from 'axios';
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      recentPosts:[]
    }
  },
  created () {
    this.retrieveRecentPosts();
  },
  methods: {
    ...mapActions("postModule", ["requestClearPosts"]),
    retrieveRecentPosts: async function(){
      this.loading = true;
      const res = await axios.get('/app/recent_posts');
      this.recentPosts = res.data;
      this.loading = false;
    },
    movePage(postId) {
      this.$router.push({ name: 'post-item', params: { postId } });
    },
    cutTitleLength(title){
      if (title.length > 15) {
        title = title.substr(0, 15) + '...';
      }
      return title;
    },
  }
}
</script>
