<template>
  <v-sheet rounded="lg" elevation="2">
    <v-skeleton-loader
      v-if="loading"
      type="article, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-card color="transparent" v-else>
      <v-subheader>
        <v-icon>mdi-tag-multiple</v-icon>
        Tags
      </v-subheader>
      <v-card-text>
        <span 
          v-for="tag in tagList"
          :key="tag"
        >
          <v-hover v-slot="{ hover }">
            <v-chip
              class="ma-1"
              color="pink"
              label
              small
              text-color="white"
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              @click="searchTag(tag.name)"
            >
              {{tag.name}}({{tag.taggings_count}})
            </v-chip>
          </v-hover>
        </span>
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
      tagList:[]
    }
  },
  created () {
    this.retrieveTagList();
  },
  methods: {
    ...mapActions("postModule", ["requestClearPosts"]),
    retrieveTagList: async function(){
      this.loading = true;
      const res = await axios.get('/app/taglist');
      this.tagList = res.data;
      this.loading = false;
    },
    searchTag(tagName) {
      this.requestClearPosts();
      this.$router.push({ name: 'post-list-tag', params: {tagName} }).catch(() => {});
    },
  }
}
</script>
