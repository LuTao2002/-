<template>
  <div class="brand">
    <div class="brand-img">
      <img :src="brand.list_pic_url" alt="">
      <p>{{ brand.name }}</p>
    </div>
    <p>{{ brand.simple_desc }}</p>
  </div>
</template>

<script>
import { GetBrandData } from '@/request/api'
export default {
  data() {
    return {
        brand: {} // 商品数据
    }
  },
  created() {
    this.$toast.loading('加载中...')
    this.GetBrandDataList()
  },
  methods: {
    async GetBrandDataList() {
        try {
          const { data } = await GetBrandData({
            id: this.$route.query.id
          })
          this.brand = data.data.brand
        } catch (err) {
          this.$toast.fail('加载失败！')
        }
    }
  }
}
</script>

<style lang="less" scoped>
.brand {
    background: #fff;
    font-family: "黑体";
    .brand-img {
        position: relative;
        img {
            width: 100%;
        }
        p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: .2rem;
        }
    }
    p {
        font-size: .18rem;
        text-align: center;
        padding: .2rem .1rem;
        line-height: .26rem;
        color: #666;
    }
}
</style>