<template>
  <div class="aearch-popup">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      show-action
      :placeholder="placeholderVal"
      @search="onSearch"
      @cancel="onCancel"
    />
    <!-- /搜索框 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: '', // 搜索框内容
      placeholderVal: '', // 搜索框提示内容
    }
  },
  created() {

  },
  methods: {
    onSearch(val) { // 用户回车搜索时执行
      console.log(val)
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.aearch-popup {
}
</style>