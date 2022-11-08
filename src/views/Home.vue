<template>
  <div class="home">
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      disabled
    />
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      searchValue: ''
    }
  },
}
</script>
