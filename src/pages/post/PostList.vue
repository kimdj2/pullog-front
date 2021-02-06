<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div>
    <PostSearchList/>
  </div>
</template>

<script>

import PostSearchList from "@/components/post/PostSearchList"
import { mapState } from "vuex";

export default {
  name: "PostList",
  computed: {
    ...mapState({
      posts: 'postModule/posts',
      pageInfo: 'postModule/pageInfo',
      clearPostsFlg: 'postModule/clearPostsFlg',
    }),
  },
  components: {
    PostSearchList,
  },
};
</script>
