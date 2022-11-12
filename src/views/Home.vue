<template>
  <div class="home">
    <!-- 首页搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      disabled
      @click="$router.push('/home/searchpopup')"
    />
    <!-- /首页搜索框 -->

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" width="100%" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- /轮播图 -->

    <!-- 分类区域 -->
    <van-grid :border="false" :column-num="5">
      <van-grid-item
        v-for="item in channel"
        :key="item.id"
        @click="
          $router.push({
            path: '/channel',
            query: {
              id: item.id,
            },
          })
        "
      >
        <van-image :src="item.icon_url" width=".3rem" height=".3rem" />
        <div class="channel-title">{{ item.name }}</div>
      </van-grid-item>
    </van-grid>
    <!-- /分类区域 -->

    <!-- 品牌制造区 -->
    <div class="brand-top">品牌制造商直供</div>
    <van-row gutter="10">
      <van-col span="12"
        class="brand"
        v-for="item in brandList"
        :key="item.id"
        @click="
          $router.push({
            path: '/brand',
            query: {
              id: item.id,
            }
          })
        "
      >
        <van-image
          class="brand-img"
          width="100%"
          height="100%"
          cover
          :src="item.pic_url"
        />
        <div class="brand-title">
          <h4>{{ item.name }}</h4>
          <p>{{ item.floor_price | RMBformat }}</p>
        </div>
      </van-col>
    </van-row>
    <!-- /品牌制造区 -->
    <!-- 新品首发 -->
    <div class="newGoods">
      <h4>周一周四·新品首发</h4>
      <van-grid :border="false" :column-num="2">
        <van-grid-item
          v-for="item in newGoodsList"
          :key="item.id"
          @click="
            $router.push({
              path: '/ProductDetail',
              query: {
                id: item.id,
              },
            })
          "
        >
          <van-image :src="item.list_pic_url" width="100%" cover />
          <div>
            <div class="newGoods-name">{{ item.name }}</div>
            <div class="newGoods-price">
              {{ item.retail_price | RMBformat }}
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- /新品首发 -->
    <!-- 人气推荐 -->
    <div class="hot">
      <h4>人气推荐</h4>
      <van-card
        v-for="item in hotGoodsList"
        :key="item.id"
        :price="item.retail_price + '元'"
        :desc="item.goods_brief"
        :title="item.name"
        :thumb="item.list_pic_url"
      />
    </div>
    <!-- /人气推荐 -->
    <!-- 专题精选 -->
    <div class="topic">
      <h4>专题精选</h4>
      <van-swipe :loop="false" width="300">
        <van-swipe-item v-for="item in topicList" :key="item.id">
          <van-image :src="item.item_pic_url" width="95%" height="200px" cover>
            <template v-slot:loading>
              <van-loading type="spinner" color="#1989fa" />
            </template>
          </van-image>
          <div class="topic-txt">
            <h2 class="topic-title">
              {{ item.title }}<span>{{ item.price_info | RMBformat }}</span>
            </h2>
            <p class="topic-subtitle">{{ item.subtitle }}</p>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- /专题精选 -->
    <!-- 专题分类 -->
    <div class="category" v-for="item in categoryList" :key="item.id">
      <h4>{{ item.name }}</h4>
      <van-grid :border="false" :column-num="2">
        <van-grid-item
          v-for="goods in item.goodsList"
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
    <!-- /专题分类 -->
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { GetHomeList } from "@/request/api";
export default {
  name: "Home",
  data() {
    return {
      searchValue: "", // 搜索框的内容
      banner: [], // banner轮播图
      channel: [], // 首页分类
      brandList: [], // 品牌制造列表
      newGoodsList: [], // 新品
      hotGoodsList: [], // 人气推荐
      topicList: [], //专题精选
      categoryList: [], // 专题分类
    };
  },
  created() {
    this.$toast.loading("加载中...");
    GetHomeList()
      .then((res) => {
        if (res.data.errno === 0) {
          let {
            banner,
            channel,
            brandList,
            newGoodsList,
            hotGoodsList,
            topicList,
            categoryList,
          } = res.data.data;
          this.banner = banner;
          this.channel = channel;
          this.brandList = brandList;
          this.newGoodsList = newGoodsList;
          this.hotGoodsList = hotGoodsList;
          this.topicList = topicList;
          this.categoryList = categoryList;
        }
      })
      .catch((err) => {
        // 请求失败后执行这里的代码
        console.log("err", err);
      });
  },
};
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 0.5rem;
}
.channel-title {
  color: #646566;
  font-size: 0.12rem;
  line-height: 1.5;
  margin-top: 0.05rem;
}
.brand-top {
  margin-top: 0.2rem;
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.18rem;
  background: #fff;
}
.brand {
  position: relative;
  .brand-title {
    position: absolute;
    left: 0.1rem;
    top: 0.1rem;
    h4 {
      font-family: "黑体";
      font-size: 0.14rem;
      color: #333;
    }
    p {
      color: #8b0000;
      margin-top: 0.1rem;
    }
  }
}
.newGoods {
  margin-top: 0.2rem;
  background: #fff;
  text-align: center;
  h4 {
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.18rem;
  }
  .newGoods-name {
    font-family: "黑体";
    font-size: 0.14rem;
    color: #333;
  }
  .newGoods-price {
    margin-top: 0.05rem;
    color: darkred;
  }
}
.hot {
  margin-top: 0.2rem;
  background: #fff;
  h4 {
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.18rem;
  }
  .van-card__title,
  .van-multi-ellipsis--l2 {
    max-height: 0.32rem;
    line-height: 0.29rem;
    font-weight: 5rem;
    font-size: 0.18rem;
  }
  .van-card__desc,
  .van-ellipsis {
    height: 0.4rem;
    max-height: 1rem;
    line-height: 0.4rem;
    color: #323233;
    font-size: 0.12rem;
  }
  .van-card__price-currency,
  .van-card__price-integer {
    line-height: 0.2rem;
    color: #8d0000;
    font-size: 0.12rem;
  }
}
.topic {
  margin-top: 0.2rem;
  background: #fff;
  h4 {
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.18rem;
  }
  .topic-txt {
    line-height: 0.4rem;
    font-size: 0.16rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
    span {
      color: darkred;
    }
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 90%;
    }
  }
}
.category {
  background: #fff;
  width: 100%;
  /deep/ .van-grid-item {
    width: 50%;
  }
  h4 {
    text-align: center;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.18rem;
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