<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
    >
      <van-cell @click="cellClick(item)" v-for="(item, index) in searchTipsListDate" :key="index" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      finished: true
    }
  },
  props: {
    searchTipsListDate: {
      type: Array,
      required: true
    }
  },
  methods: {
    cellClick(val) {
      this.$emit('cellClick', val)
    }
  }
}
</script>

<style>
</style>