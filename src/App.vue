<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
