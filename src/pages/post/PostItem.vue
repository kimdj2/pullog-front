<template>
  <div>
    <v-skeleton-loader
    type="article, image, image, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
    v-if="postLoading"
    ></v-skeleton-loader>
    <v-card
      color="white"
      elevation="2"
      rounded="lg"
      min-height="70vh"
      v-else
    >
      <post-move :beforePost="beforePost" :nextPost="nextPost" @movePage="movePage"/>
      <v-card-title class="pt-2 font-weight-black text-md-h4">
        {{post.title}}
      </v-card-title>
      <v-card-subtitle class="font-weight-black">
        {{callGetParseDate(post.created_at)}}
      </v-card-subtitle>
      <v-card-text>
        <span         
          v-for="tag in post.tag_list"
          :key="tag"
        >
        <v-chip
          class="ma-1"
          color="pink"
          label
          small
          text-color="white"
          @click="searchTag(tag)"
        >
          <v-icon left>
            mdi-tag
          </v-icon>
          {{tag}}
        </v-chip>
        </span>
      </v-card-text>
      <v-divider class="mx-4 pb-6"></v-divider>
      <v-img
        v-if="post.image_path"
        :src="post.image_path"
        class="mx-12 align-center justify-center"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
      </v-img>
      <v-card-subtitle class="font-weight-black text-md-h6">
        {{post.description}}
      </v-card-subtitle>
      <v-divider class="ma-4" v-if="post.image_path || post.description"></v-divider>
      <v-card-text>
        <viewer
          :initialValue="post.contents"
          :options="editorOptions"
        />
      </v-card-text>
      <Disqus class="ma-4"/>
      <post-move :beforePost="beforePost" :nextPost="nextPost" @movePage="movePage"/>
    </v-card>
  </div>
</template>

<script>

import {mapState, mapActions} from "vuex"
import { getParseDate } from "@/utils/time"
import PostMove from "@/pages/post/PostMove"
import { Disqus } from 'vue-disqus'
import 'highlight.js/styles/github.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js';
import { Viewer } from '@toast-ui/vue-editor'

export default {
  components: {
    PostMove,
    Disqus,
    'viewer' :Viewer,
  },
  computed: {
    ...mapState("postModule", ["post","beforePost","nextPost","postLoading"]),
    postId() {
      return this.$route.params.postId;
    },
  },
  mounted () {
    this.getPost({postId: this.postId});
  },
  data() {
    return {
      editorOptions: {
        plugins:[[codeSyntaxHighlight, {hljs}]],
      },
    };
  },
  methods: {
    ...mapActions("postModule", {
      getPost: "getPost",
      requestClearPosts: "requestClearPosts",
    }),
    callGetParseDate(dateString){
      return getParseDate(dateString);
    },
    movePage(postId) {
      this.$router.push({ name: 'post-item', params: { postId } });
      this.getPost({postId: postId});
    },
    searchTag(tagName) {
      this.requestClearPosts();
      this.$router.push({ name: 'post-list-tag', params: {tagName} }).catch(() => {});
    },
  },

}
</script>
