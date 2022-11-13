<template>
  <div class="box">
    <!-- 分类搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      disabled
      @click="$router.push('/category/searchpopup')"
    />
    <!-- /分类搜索框 -->
    <!-- 搜索区 -->
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
    <!-- /搜索区 -->
    <!-- 分类区 -->
    <div class="row-box">
      <div class="div-row">
        <div class="div-col-left">
          <van-sidebar v-model="activeKey" class="sidebar">
            <van-sidebar-item
              v-for="item in categoryList"
              :key="item.id"
              :title="item.name"
              @click="onItem(item.id)"
            />
          </van-sidebar>
        </div>
        <div class="div-col-right">
          <div class="img-box">
            <img
              :src="currentCategory.banner_url"
              width="95%"
              height="140px"
              alt=""
            />
            <div class="img-title">{{ currentCategory.front_name }}</div>
          </div>
          <div class="title">{{ currentCategory.name }}</div>
          <van-grid :column-num="3">
            <van-grid-item
              v-for="item in currentCategory.subCategoryList"
              :key="item.id"
            >
              <van-image
                :src="item.wap_banner_url"
                width="50%"
                height="50%"
                cover
              />
              <div>{{ item.name }}</div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>

    <!-- /分类区 -->
  </div>
</template>

<script>
import { GetCategoryData, GetCategoryCurrent } from "@/request/api";
export default {
  data() {
    return {
      searchValue: "", // 搜索框的内容
      activeKey: 0,
      categoryList: [], // 列表
      currentCategory: [], // 详细列表
    };
  },
  created() {
    this.GetCategoryDataList();
    // document.querySelector('#app').style.background = '#fff'
  },
  methods: {
    async GetCategoryDataList() {
      this.$toast.loading("加载中...");
      const { data } = await GetCategoryData();
      this.categoryList = data.data.categoryList;
      let { id } = this.categoryList[0];
      this.onItem(id);
    },
    async onItem(id) {
      this.$toast.loading("加载中...");

      const { data } = await GetCategoryCurrent({
        id,
      });
      this.currentCategory = data.data.currentCategory;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 91vh;
}
.row-box {
  height: 91vh;
  .div-row {
    display: flex;
    min-height: 100%;
    .div-col-left {
      background-color: #f7f8fa;
      min-height: 100%;
    }
    .div-col-right {
      background-color: #fff;
      min-height: 100%;
    }
  }
}
.sidebar {
  background-color: #f7f8fa;
}
.img-box {
  position: relative;
  img {
    border-radius: 5px;
    margin: 0 0.07rem;
    box-shadow: 0 0 6px #000;
    filter: brightness(0.5);
  }
  .img-title {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.title {
  width: 100%;
  height: 0.5rem;
  background: #fff;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.18rem;
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
</style>