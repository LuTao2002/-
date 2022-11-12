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
      @input="onInput"
    />
    <!-- /搜索框 -->

    <!-- 历史记录，热门搜索 -->
    <hisotory-hot
      :hisotoryListData="hisotoryListData"
      :hotKeywordListData="hotKeywordListData"
      v-if="blockShow === 1"
      @tagClick="tagClick"
    />
    <!-- /历史记录，热门搜索 -->

    <!-- 搜索提示 -->
    <search-tips-list
      :searchTipsListDate="searchTipsListDate"
      v-if="blockShow === 2"
      @cellClick="tagClick"
    />
    <!-- /搜索提示 -->

    <!-- 商品展示 -->
    <search-products
      :filterCategory="filterCategory"
      :goodsList="goodsList"
      v-if="blockShow === 3"
      @categoryChange="categoryChange"
      @priceChange="priceChange"
    />
    <!-- /商品展示 -->
  </div>
</template>

<script>
import HisotoryHot from '@/components/HisotoryHot.vue'
import { GetSearchPopupData, GetSearchTipsListData, GetGoodsListData } from '@/request/api'
import SearchTipsList from '@/components/SearchTipsList.vue'
import SearchProducts from '@/components/SearchProducts.vue'
export default {
  components: { HisotoryHot, SearchTipsList, SearchProducts },
  data() {
    return {
      searchValue: '', // 搜索框内容
      placeholderVal: '', // 搜索框提示内容
      blockShow: 1, // 下发区域展示 1：展示历史记录，热门搜索；2：展示搜索提示；3：展示搜索结果
      hisotoryListData: [], // 历史搜索记录列表
      hotKeywordListData: [], // 热门搜索列表
      searchTipsListDate: [], // 搜索提示列表
      filterCategory: [], // 搜索产品内容的分类数据
      goodsList: [], // 搜索产品的数据列表
      order: 'desc', // 价格排序
      categoryId: 0, // 分类id
      sort: 'id', // 默认排序方式，价格或者id
    }
  },
  created() {
    GetSearchPopupData().then(res => {
      if (res.data.errno === 0) {
        this.placeholderVal = res.data.data.defaultKeyword.keyword
        this.hisotoryListData = res.data.data.historyKeywordList
        this.hotKeywordListData = res.data.data.hotKeywordList
      }
    })
  },
  methods: {
    tagClick(val) { // 热门搜索和历史记录的搜索
      this.searchValue = val
      this.onSearch(this.searchValue)
    },
    priceChange(value) { // 排序
      this.order = value
      this.sort = 'price'
      // 发送商品请求
      this.onSearch(this.searchValue)
    },
    categoryChange(value) { // 分类
      this.categoryId = value
      // 发送商品请求
      this.onSearch(this.searchValue)
    },
    onSearch(val) { // 用户回车搜索时执行
      this.blockShow = 3
      GetGoodsListData({
        keyword: val,
        order: this.order,
        categoryId: this.categoryId,
        sort: this.sort
      }).then(res => {
        if (res.data.errno === 0) {
          let { filterCategory, goodsList } = res.data.data
          this.goodsList = goodsList
          // 处理数据
          let newArr = []
          filterCategory.forEach(item => {
            let obj = {}
            obj.text = item.name
            obj.value = item.id
            obj.checked = item.checked
            newArr.push(obj)
          });
          this.filterCategory = newArr
        }
      })
    },
    onCancel() {
      this.$router.back()
    },
    onInput(val) {
      this.blockShow = 2
      // 发送请求，获取实时的文本搜索提示列表
      GetSearchTipsListData({
        keyword: val
      }).then(res => {
        if (res.data.errno === 0) {
          this.searchTipsListDate = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.aearch-popup {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100%;
  background: #efefef;
}
</style>