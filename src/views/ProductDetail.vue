<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" alt="" />
      </van-swipe-item>
    </van-swipe>
    <tips />

    <div class="info">
      <div class="title">{{ info.name }}</div>
      <div class="goods_brief">{{ info.goods_brief }}</div>
      <div class="price">{{ info.retail_price | RMBformat }}</div>
    </div>
    <van-cell title="弹出展示层" @click="show = true" is-link />
    <!-- 购物弹出框 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
    <!-- /购物弹出框 -->
    <div class="attribute-cell">
      <h2>商品参数</h2>
      <div v-for="(item, index) in attribute" :key="index" class="attribute">
        <div class="attribute-div">{{ item.name }}</div>
        <span class="attribute-span">{{ item.value }}</span>
      </div>
    </div>
    <div class="goods_desc" v-html="goods_desc"></div>
    <div class="issue">
      <div class="title">常见问题</div>
      <ul>
        <li v-for="item in issue" :key="item.id">
          <div class="issue-div">{{ item.question }}</div>
          <p class="issue-p">{{ item.answer }}</p>
        </li>
      </ul>
      <div class="title">相关产品</div>
      <van-grid :border="false" :column-num="2">
        <van-grid-item
          v-for="item in goodsList"
          :key="item.id"
          @click="toProductDetail(item.id)"
        >
          <van-image :src="item.list_pic_url" />
          <div class="goodsList">
            <div class="goodsList-title">{{ item.name }}</div>
            <p class="goodsList-p">{{ item.retail_price | RMBformat }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button
        type="warning"
        @click="show = true"
        text="加入购物车"
      />
      <van-goods-action-button
        type="danger"
        @click="show = true"
        text="立即购买"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { GetGoodsDetailData, GetGoodsDetailListData, GetAddGoods } from "@/request/api";
import Tips from "@/components/Tips.vue";
export default {
  components: { Tips },
  data() {
    return {
      show: false, // 是否显示购物窗口
      sku: {}, // 商品信息
      goods: {}, // 商品略缩图
      gallery: [], // 轮播图
      info: {}, //商品数据
      attribute: [], // 商品参数
      goods_desc: "", // 商品图片
      issue: [], // 常见问题
      goodsList: [], // 相关产品
      productList: [], // 加购所用ID
    };
  },
  created() {
    this.$toast.loading("加载中...");
    // 请求商品详情
    this.GetGoodsDetail();
    // 相关产品
    this.GetGoodsDetailList();
  },
  methods: {
    GetGoodsDetail() {
      GetGoodsDetailData({
        id: this.$route.query.id,
      }).then((res) => {
        if (res.data.errno === 0) {
          let { gallery, info, attribute, issue } = res.data.data;
          this.gallery = gallery;
          this.info = info;
          this.attribute = attribute;
          this.goods_desc = info.goods_desc;
          this.issue = issue;
          this.productList = res.data.data.productList
          this.goodsData();
          console.log(res.data);
        }
      });
    },
    GetGoodsDetailList() {
      GetGoodsDetailListData({
        id: this.$route.query.id,
      }).then((res) => {
        this.goodsList = res.data.data.goodsList;
      });
    },
    toProductDetail(id) {
      this.$router.push({
        path: "/ProductDetail",
        query: {
          id,
        },
      });
      // 请求商品详情
      this.GetGoodsDetail();

      // 相关产品
      this.GetGoodsDetailList();
      // 刷新
      this.$router.go(0);
    },

    // 商品购物信息处理
    goodsData() {
      this.sku = {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: this.info.name, // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: this.info.goods_brief, // skuValueName：规格值名称
                imgUrl: this.info.list_pic_url, // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: this.info.list_pic_url, // 用于预览显示的规格类目图片
              },
            ],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            price: this.info.retail_price * 100, // 价格（单位分）
            stock_num: this.info.goods_number, // 当前 sku 组合对应的库存
          },
        ],
      };
      this.goods = {
        // 默认商品 sku 缩略图
        picture: this.info.list_pic_url,
      }
    },
    onBuyClicked(skuData) {
      this.$toast.fail('暂未开发')
      console.log("@@",skuData.selectedNum);
    },
    // 加购
    async onAddCartClicked(skuData) {
      const { data } = await GetAddGoods({
        goodsId: this.$route.query.id,
        productId: this.productList[0].id,
        number: skuData.selectedNum
      })
      this.$toast.success('加购成功！')
      this.show = false
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  background: #fff;
  text-align: center;
  padding: 0.1rem 0;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 0.2rem;
  }
  .goods_brief {
    line-height: 0.4rem;
  }
  .price {
    line-height: 0.4rem;
    color: red;
  }
}
.attribute-cell {
  margin-top: 0.2rem;
  background: #fff;
  padding: 0.2rem;
  h2 {
    font-size: 0.2rem;
    padding: 0.1rem 0;
  }
  .attribute {
    width: 100%;
    background: #efefef;
    border-radius: 0.05rem;
    height: 30px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .attribute-div {
      text-align: right;
      width: 24%;
      padding-right: 0.1rem;
      color: #999;
    }
    .attribute-span {
      width: 76%;
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
/deep/ .goods_desc {
  img {
    display: block;
    width: 100%;
  }
}
.issue {
  background: #fff;
  margin-top: 0.2rem;
  .title {
    width: 100%;
    height: 40px;
    background: #fff;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.2rem;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 25%;
      width: 10%;
      height: 0.02rem;
      background: #ccc;
    }
    &::after {
      content: "";
      position: absolute;
      left: 65%;
      top: 50%;
      width: 10%;
      height: 0.02rem;
      background: #ccc;
    }
  }
  ul {
    li {
      .issue-div {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.16rem;
        position: relative;
        padding-right: 0.1rem;
        padding-left: 0.2rem;
        &::before {
          content: "";
          width: 0.04rem;
          height: 0.04rem;
          background: darkred;
          border-radius: 50%;
          position: absolute;
          left: 0.08rem;
          top: 50%;
          margin-top: -0.02rem;
        }
      }
      .issue-p {
        padding-left: 0.2rem;
        padding-right: 0.1rem;
        color: #666;
      }
    }
  }
}
.goodsList {
  text-align: center;
  font-size: 0.14rem;
  padding-bottom: 0.4rem;
  .goodsList-p {
    color: red;
    margin-top: 0.04rem;
  }
}
</style>