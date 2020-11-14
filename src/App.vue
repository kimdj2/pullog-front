<template>
  <router-view />
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
@font-face {
  font-family: 'M Plus 1p';
  src: url('~@/assets/fonts/MPLUS1p-Medium.ttf') format('truetype');
}
.v-application{
  font-family: "M Plus 1p" !important;
  code {
    font-size: 95% !important;
    font-weight: 500 !important;
  }
}
.tui-editor-contents{
  font-family: "M Plus 1p",'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕', 'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif !important;
}
</style>