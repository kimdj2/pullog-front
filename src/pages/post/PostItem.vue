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
      <v-card-title class="pt-2 font-weight-black" id="post-title">
        {{post.title}}
      </v-card-title>
      <v-card-subtitle class="font-weight-black mx-2">
        {{callGetParseDate(post.created_at)}}
      </v-card-subtitle>
      <v-card-text class="pb-2">
        <span         
          v-for="tag in post.tag_list"
          :key="tag"
        >
        <v-chip
          class="ma-1"
          color="indigo lighten-3"
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
      <v-divider class="mx-4 mb-4"></v-divider>
      <v-img
        v-if="post.image_path"
        :src="post.image_path"
        class="mx-12 align-center justify-center"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
      </v-img>
      <v-card-subtitle class="font-weight-black text-md-h7">
        {{post.description}}
      </v-card-subtitle>
      <v-card-text>
        <viewer
          :initialValue="post.contents"
          :options="editorOptions"
        />
      </v-card-text>
      <Disqus class="ma-4"/>
      <br/>
      <div class="font-weight-bold mx-4 my-2">Related Posts</div>
      <v-divider class="ma-4"></v-divider>
      <v-row>
        <v-col v-if="relatedPosts.length===0" class="text-center align-center justify-center my-10 font-weight-bold">
          関連のポストが存在しません。
        </v-col>
        <v-col 
          cols="12"
          md="4"
          v-else
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
        >
          <v-card class="mx-2" @click="movePage(relatedPost.id)">
            <v-img
              v-if="relatedPost.image_path"
              :src="relatedPost.image_path"
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
              <v-card-subtitle v-text="relatedPost.title" class="black--text text-center"></v-card-subtitle>
            </v-img>
            <v-card-subtitle height="50" class="font-weight-bold">
              {{cutTitleLength(relatedPost.title)}}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="ma-4 py-3"></v-divider>
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
    ...mapState("postModule", ["post","beforePost","nextPost","relatedPosts","postLoading"]),
    postId() {
      return this.$route.params.postId;
    },
  },
  async created () {
    await this.getPost({postId: this.postId});
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
    cutTitleLength(title){
      if (title.length > 15) {
        title = title.substr(0, 15) + '...';
      }
      return title;
    },
  },
  // vue-meta 設定
  metaInfo() {
    let post = this.post
    return {
      title: post ? post.title : 'Engineer Blog',
      titleTemplate: '%s | Pullog',
      htmlAttrs: {
        lang: 'ja-JP',
        dir: 'ltr'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: post ? post.description : 'Pullog Engineer Blog', vmid: 'description' },
        { name: 'keywords', content: post ? post.tag_list.join() : 'java, python, rails, ruby, nginx, aws, vue, javascript' },
        { name: 'author', content: 'inoshishi' },
        {
          property: 'og:title',
          content: post ? post.title : 'Engineer Blog',
          template: chunk => `${chunk} | Pullog`,
          vmid: 'og:title'
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
    }
  },
  async beforeRouterEnter(to, from, next) {
    await this.getPost({postId: this.postId});
    next();
  }
}
</script>
<style lang="scss">
  #post-title {
    font-size: 1.5rem;
  }
</style>