<template>
  <div id="app">
    <router-view/>
    <app-tab-bar v-show="$route.meta.isShowTabBar"/>
  </div>
</template>

<script>
import AppTabBar from '@/components/AppTabBar.vue'
export default {
  components: {
    AppTabBar
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #efefef;
  min-height: 100%;
  font-size: .14rem;
}
body, html {
  height: 100%;
}
html {
  font-size: 100px !important; // 16px == 0.16rem
}
</style>
