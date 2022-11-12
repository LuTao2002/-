<template>
  <div class="products">
    <van-grid :border="false" :column-num="2" :gutter="10" v-if="goodsList.length">
      <van-grid-item v-for="item in goodsList" :key="item.id" @click="toProductDetail(item.id)">
        <van-image :src="item.list_pic_url" />
        <div class="txt">
          <p>{{ item.name }}</p>
          <span>{{ item.retail_price | RMBformat }}</span>
        </div>
      </van-grid-item>
    </van-grid>
    <van-empty v-else image="search" description="没有要搜索的商品" />
  </div>
</template>

<script>
export default {
  props: {
    goodsList: {
      type: Array,
      required: true
    }
  },
  methods: {
    toProductDetail(id) {
      this.$router.push({
        path:'/ProductDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.products {
  .van-grid {
    margin-top: .1rem;
    .txt {
      text-align: center;
      p {
        font-size: .14rem;
        margin: .1rem 0;
      }
      span {
        color: crimson;
      }
    }
  }
}
</style>