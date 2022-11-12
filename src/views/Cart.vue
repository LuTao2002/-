<template>
  <div>
    <tips />
    <van-empty v-if="isShow" description="购物车为空" />
    <van-checkbox-group v-else v-model="result" ref="checkboxGroup">
      <div class="cart-box" v-for="item in cartList" :key="item.id">
        <div class="left">
          <van-checkbox :name="item.id" @click="onCheck"></van-checkbox>
        </div>
        <div class="right">
          <van-swipe-cell>
            <van-card
              :num="item.number"
              :price="item.retail_price + '.00'"
              :title="item.goods_name"
              :class="editBtn ? 'goods-card' : ''"
              :thumb="item.list_pic_url"
            />
            <van-stepper v-show="editBtn" class="stepper" v-model="item.number" />
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="onDelete(item.product_id)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </van-checkbox-group>
    <van-submit-bar :price="priceNum" button-text="提交订单" @submit="onSubmit">
      <van-checkbox :disabled="editBtn" v-model="checked" @click="checkAll">全选</van-checkbox>
      <template #tip>
        <div class="edit-btn">
          累计共0件商品，可点击
          <van-button
            :type="editBtn ? 'danger' : 'primary'"
            size="small"
            @click="onClickEditAddress"
            >{{ editBtn ? "完成编辑" : "编辑" }}</van-button
          >
          按钮进行商品数量修改
        </div>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { GetCartData, GetDeleteCart } from "@/request/api";
import Tips from "@/components/Tips.vue";
export default {
  name: 'Cart',
  components: { Tips },
  data() {
    return {
      isShow: false, // 空状态控制
      result: [], // 复选框组
      editBtn: false, // 编辑按钮状态
      checked: false, // 全选按钮
      cartList: [], //购物车数据
      priceNum: 0, // 总金额
    };
  },
  created() {
    this.GetCartDataList();
  },
  methods: {
    async GetCartDataList() {
      try {
        this.$toast.loading("加载中...");
        const { data } = await GetCartData();
        this.cartList = data.data.cartList
        this.isShow = false
        console.log(data);
        this.price()
        console.log(typeof this.cartList[0].retail_price);
      } catch (err) {
        this.isShow = true
        this.$toast.fail("暂无加购商品");
      }
    },
    onClickEditAddress() {
      this.editBtn = !this.editBtn;
    },
    price() { // 金额
      let num = 0
      this.cartList.forEach(res => {
        num += res.market_price * res.number
      })
      this.priceNum = num * 100
      console.log(num)
    },
    async onDelete(id) { // 删除加购
      try {
        GetDeleteCart({
          productIds: id.toString()
        })
        this.$toast.success('删除成功')
      } catch (err) {
        this.$toast.fail('删除失败！')
      }
      setTimeout(() => {
        this.GetCartDataList()
      }, 500)
    },
    onCheck() {
      if (this.result.length === this.cartList.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    onSubmit() {},
    checkAll() { // 全选按钮
      if (this.editBtn) return
      if (this.result.length === this.cartList.length) {
        this.checked = false
        this.$refs.checkboxGroup.toggleAll()
      } else {
        this.checked = true
        this.$refs.checkboxGroup.toggleAll(true)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart-box {
  padding: 0.1rem 0.1rem 0.1rem 0;
  background: #fff;
  display: flex;
  .left {
    width: 9%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .right {
    width: 91%;
    position: relative;
    /deep/ .goods-card {
      padding-bottom: .4rem;
    }
    .stepper {
      position: absolute;
      bottom: .05rem;
      right: .05rem;
    }
  }
}
.van-swipe-cell__right {
  height: 100%;
  .delete-button {
    height: 100%;
  }
}
/deep/ .edit-btn {
  display: flex;
  align-items: center;
  .van-button {
    margin: 0 .05rem;
  }
}
.van-submit-bar {
  margin-bottom: .5rem;
}
</style>