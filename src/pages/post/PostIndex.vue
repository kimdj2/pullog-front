<template>
  <v-app class="post-main" >
    <Header />
    <v-main class="blue-grey lighten-5">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="9">
            <router-view :key="$route.fullPath"/>
          </v-col>
          <Sidebar />
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<!-- script -->
<script>
import Header from '@/components/global/Header.vue'
import Sidebar from '@/components/global/Sidebar.vue'
import Footer from '@/components/global/Footer.vue'

export default {
  name:"PostIndex",
  components: {
    Header,
    Sidebar,
    Footer
  },
}
</script>

<style lang="scss">
  .bg {
    background-size: cover;
    background-image: url("~@/assets/no_image.png");
  }
  .post-main {
    @media (min-width: 1904px) {
      .container {
        max-width: 1185px;
      }
    }
  }
</style>