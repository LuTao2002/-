<template>
  <div>
    <!-- 顶部 -->
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled/>
      <van-dropdown-item title="价格" @change="priceChange" v-model="priceVal" :options="option" />
      <van-dropdown-item title="分类" @change="categoryChange" v-model="categoryVal" :options="filterCategory" />
    </van-dropdown-menu>
    <!-- /顶部 -->

    <!-- 商品列表 -->
    <products :goodsList="goodsList"/>
    <!-- /商品列表 -->
  </div>
</template>

<script>
import Products from './Products.vue';
export default {
  components: { Products },
  props: {
    filterCategory: {
      type: Array,
      required: true
    },
    goodsList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      priceVal: '',
      categoryVal: 0,
      option: [
        { text: "价格从高到低", value: "desc" },
        { text: "价格从低到高", value: "asc" },
      ]
    }
  },
  beforeUpdate() {
    // 数据挂载完毕，遍历数组看哪一项的 check 为 true 遇到为 true
    // 时就把他的 value 值赋值给 categoryVal
    let newArr =  this.filterCategory.filter(item => {
      return item.checked === true
    })
    this.categoryVal = newArr[0].value
  },
  methods: {
    categoryChange(value) {
      this.$emit('categoryChange', value)
    },
    priceChange(value) {
      this.$emit('priceChange', value)
    }
  }
};
</script>

<style>
</style>