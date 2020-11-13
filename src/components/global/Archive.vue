<template>
  <v-sheet rounded="lg" elevation="2">
    <v-skeleton-loader
      v-if="loading"
      type="article, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-list color="transparent" v-else>
      <v-subheader color="teal lighten-4">
        <v-icon>mdi-calendar-month</v-icon>
        Archive
      </v-subheader>
      <v-list-item
        link
        color="teal lighten-4"
        v-for="archive in this.archives" :key="archive.id"
      >
        <v-list-item-content>
          <v-list-item-title @click="movePage(archive.month)">
            {{callGetParseMonth(archive.month)}}
            ({{archive.total_month}})
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
import API from "@/utils/API";
import { getParseMonth } from "@/utils/time"

export default {
  data() {
    return {
      loading: false,
      archives:[]
    }
  },
  created () {
    this.retrieveArchiveList();
  },
  methods: {
    ...mapActions("postModule", ["requestClearPosts"]),
    retrieveArchiveList: async function(){
      this.loading = true;
      const res = await API.get('/app/archive');
      this.archives = res.data;
      this.loading = false;
    },
    callGetParseMonth(dateString){
      return getParseMonth(dateString);
    },
    movePage(month) {
      this.requestClearPosts();
      this.$router.push({ name: 'post-list-month', params: {month: this.callGetParseMonth(month)} }).catch(() => {});
    }
  }
}

</script>
