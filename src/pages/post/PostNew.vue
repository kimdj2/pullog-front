<template>
  <v-card class="elevation-1 pa-3">
    <v-card-title>
      ポスト作成
    </v-card-title>
    <v-card-text>
      <PostForm @changeFormData="changeFormData"/>
    </v-card-text>
    <v-col class="text-right">
      <v-btn tile color="success" @click="submitPost">
        <v-icon left>
          mdi-pencil
        </v-icon>
          作成
      </v-btn>
    </v-col>
  </v-card>
</template>
<script>

import {mapActions} from "vuex"
import PostForm from '@/pages/post/PostForm' 

export default {
  components: {
    PostForm,
  },
  data(){
    return {
      formData: {},
    }
  },
  methods: {
    ...mapActions('postModule',['savePost', 'clearPosts']),
    changeFormData(formData) {
      this.formData = formData;
    },
    submitPost(){
      const formData = this.createFormData(this.formData);
      this.savePost({params: formData});
      this.clearPosts();
      this.$router.push({name: 'admin-post-list'});
    },
    createFormData(data){
      let formData = new FormData();
      for (let key in data) {
        if (data[key]) {
          formData.append(`board[${key}]`, data[key]);
        }
      }
      return formData;
    }
  }
};
</script>
