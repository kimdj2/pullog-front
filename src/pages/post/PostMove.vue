<template>
  <v-col class="d-flex md-0 move-page-content">
    <v-chip
      class="ma-2 pl-0 mr-auto page-button left"
      outlined
      label
      v-if="nextPost"
      @click="callMovePage(nextPost.id)"
    >
        <v-icon>
          mdi-arrow-left-thick
        </v-icon>
        <span>
          {{nextPost.title}}
        </span>
    </v-chip>
    <v-chip
      class="ma-2 pl-0 mr-auto page-button left"
      outlined
      label
      disabled
      v-else
    >
    </v-chip>
    <v-chip
      class="ma-2 pr-0 page-button right"
      outlined
      label
      v-if="beforePost"
      @click="callMovePage(beforePost.id)"
    >
        <span>
          {{beforePost.title}}
        </span>
        <v-icon>
          mdi-arrow-right-thick
        </v-icon>
    </v-chip>
    <v-chip
      class="ma-2 pl-0 page-button right"
      outlined
      label
      disabled
      v-else
    >
    </v-chip>
  </v-col>
</template>

<script>
export default {
  props: {
    beforePost: Object,
    nextPost: Object,
  },
  methods: {
    callMovePage(postId) {
      this.$emit("movePage", postId);
    }
  }
}
</script>

<style lang="scss">
  .move-page-content {
    .page-button {
      width:30%;
      max-width: 30%;
      overflow: hidden;
      &.left {
        span{
          width:100%;
          overflow:hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      &.right {
        span{
          width:100%;
          overflow:hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

</style>