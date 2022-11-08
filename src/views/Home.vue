<template>
  <div class="home">
    <!-- 首页搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      disabled
      @click="$router.push('/home/searchpopup');show = true"
    />
    <!-- /首页搜索框 -->

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" width="100%" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- /轮播图 -->
    <van-popup v-model="show" position="right" class="search-popup">
      <router-view></router-view>
    </van-popup>
  </div>
</template>

<script>
import { GetHomeList } from '@/request/api'
export default {
  name: 'Home',
  data() {
    return {
      show: false,
      searchValue: '', // 搜索框的内容
      banner: [], // banner轮播图
    }
  },
  watch: {
    '$route.path'() {
      // 对路由路径进行监听，如果为 /home 是禁止显示搜索弹出框，show = false
      if (this.$route.path === '/home') this.show = false
    }
  },
  created() {
    GetHomeList()
    .then(res => {
      console.log('success', res.data)
      this.banner = res.data.data.banner
    })
    .catch(err => {
      // 请求失败后执行这里的代码
      console.log('err',err)
    })
  }
}
</script>
<style lang="less" scoped>
.search-popup {
  width: 100%;
  height: 100%;
}
</style>
