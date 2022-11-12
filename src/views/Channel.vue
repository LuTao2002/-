<template>
  <div>
    <van-tabs @click="onClick" v-model="activeName">
      <van-tab
        v-for="item in brotherCategory"
        :title="item.name"
        :key="item.id"
      >
        <div class="tab">
            <div class="tab-name">{{ item.front_name }}</div>
            <div class="tab-desc">{{ item.front_desc }}</div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="goods">
      <van-grid :border="false" :column-num="2">
      <van-grid-item
        v-for="goods in goodsList"
        :key="goods.id"
        @click="
          $router.push({
            path: '/ProductDetail',
            query: {
              id: goods.id,
            },
          })
        "
        >
          <van-image :src="goods.list_pic_url" width="100%" cover>
            <template v-slot:loading>
              <van-loading type="spinner" color="#1989fa" size="30" />
            </template>
          </van-image>
          <div class="category-txt">
            <div class="category-name">{{ goods.name }}</div>
            <div class="category-price">
              {{ goods.retail_price | RMBformat }}
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { GetChannelDate, GetChannelList } from '@/request/api'
export default {
  data() {
    return {
      activeName: 0, // id
      brotherCategory: [], // 标题
      goodsList: [], // 商品数据
    }
  },
  created() {
    this.channelData()
  },
  methods: {
    async channelData() {
      try {
        this.$toast.loading('加载中...')
        const { data } = await GetChannelDate({
          id: this.$route.query.id
        })
        let { brotherCategory } = data.data
        this.brotherCategory = brotherCategory
        let tabsId = this.brotherCategory[this.activeName].id
        this.GetChannelListData(tabsId)
      } catch (erre) {
        this.$toast.fail('加载失败！')
      }
    },
    async GetChannelListData(id) {
      try {
        const { data } = await GetChannelList({
            categoryId: id,
            page: 1,
            size: 1000
        })
        this.goodsList = data.data.data
      } catch (err) {
        this.$toast.fail('加载失败！')
      }
    },
    onClick() {
      let tabsId = this.brotherCategory[this.activeName].id
      this.$router.push({
        path: '/channel',
        query: {
          id: tabsId,
        }
      })
      this.channelData()
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
    text-align: center;
    .tab-name {
        font-size: .18rem;
        height: .5rem;
        line-height: .5rem;
    }
    .tab-desc {
        height: .3rem;
        line-height: .3rem;
        color: #666;
    }
}
.goods {
    background: #fff;
    width: 100%;
    /deep/ .van-grid-item {
        width: 50%;
    }
    .category-txt {
    width: 100%;
    text-align: center;
    .category-name {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.14rem;
    }
    .category-price {
      line-height: 0.4rem;
      color: #8b0000;
    }
  }
}
</style>