<template>
  <div class="box">
    <div class="topic-box" v-for="item in topicList" :key="item.id">
      <img :src="item.scene_pic_url" width="100%" alt="">
      <div class="topic-div">
        <div class="title">{{ item.title }}</div>
        <div class="tip">{{ item.subtitle }}</div>
        <div class="price">{{ item.price_info | RMBformat }}</div>
      </div>
    </div>
    <div class="button">
      <van-button @click="onPage('上')" :disabled="page === 1 ? true : false">上一页</van-button>
      <van-button @click="onPage('下')" :disabled="page === totalPages ? true : false">下一页</van-button>
    </div>
  </div>
</template>

<script>
import { GetTopicData } from '@/request/api'
export default {
  data() {
    return {
      totalPages: 0, // 总页数
      page: 1, // 当前页数
      topicList: [], // 页面数据
    }
  },
  created() {
    this.GetTopicDataList()
  },
  methods: {
    async GetTopicDataList() {
      this.$toast.loading('加载中...')
      const { data } = await GetTopicData({
        page: this.page,
        size: 10
      })
      this.topicList = data.data.data
      this.totalPages = data.data.totalPages
    },
    onPage(show) {
      if (show === '上') {
        if (this.page === 1) {
          return 0
        } else {
          this.page--
        }
      } else {
        if (this.page === this.totalPages) {
          return 0
        } else {
          this.page++
        }
      }
      this.GetTopicDataList()
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding-bottom: .45rem;
}
img {
  display: block;
}
.topic-box {
  margin-bottom: .2rem;
}
.topic-div {
  text-align: center;
  background: #fff;
  padding: .1rem 0;
  .title {
    font-size: .15rem;
    font-weight: 550;
  }
  .tip {
    font-size: .15rem;
    font-weight: 550;
    margin: .1rem 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .price {
    color: red;
  }
}
.button {
  .van-button {
    width: 50%;
  }
  padding-bottom: .4rem;
}
</style>