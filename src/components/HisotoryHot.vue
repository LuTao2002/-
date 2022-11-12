<template>
  <div>
    <van-cell title="历史记录" v-show="isShowHistory">
      <template #right-icon>
        <van-icon @click="clearHistory" name="delete-o" />
      </template>
      <template #label>
        <van-tag
          v-for="(item, index) in hisotoryListData"
          :key="index"
          plain
          color="gray"
          @click="tagClick(item)"
        >{{ item }}</van-tag>
      </template>
    </van-cell>
    <van-cell title="热门搜索">
      <template #label>
        <van-tag
          v-for="(item, index) in hotKeywordListData"
          :key="index"
          plain
          :color="item.is_hot ? 'red' : 'gray'"
          @click="tagClick(item.keyword)"
        >{{ item.keyword }}</van-tag>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { ClearHistory } from '@/request/api'
export default {
  data() {
    return {
      isShowHistory: true // 历史记录的显示状态
    }
  },
  props: {
    hisotoryListData: {
      type: Array,
      required: true
    },
    hotKeywordListData: {
      type: Array,
      required: true
    }
  },
  methods: {
    tagClick(val) {
      this.$emit('tagClick', val)
    },
    clearHistory() {
      ClearHistory().then(res => {
        console.log(res);
        if (res.data.errno === 0) {
          this.$toast.success('删除成功')
          this.isShowHistory = false
        } else {
          this.$toast.fail('删除失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  margin-bottom: .1rem;
  /deep/ .van-cell__title {
    font-size: .18rem;
  }
  /deep/ .van-icon,
  .van-icon-delete-o {
    font-size: .2rem;
  }
  /deep/ .van-tag,
  .van-tag--plain,
  .van-tag--default {
    margin-right: 0.05rem;
    margin-bottom: 0.05rem;
    padding: .03rem .05rem;
  }
}
</style>