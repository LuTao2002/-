<template>
  <div class="user">
    <van-cell class="user-top" @click="openModal">
      <template #title>
        <div class="user-box">
          <van-image
            width="50"
            height="50"
            round
            cover
            :src='avatarSrc ? avatarSrc : userImg'
          />
          <span>{{ nickName }}</span>
        </div>
      </template>
      <template #right-icon>
        <van-icon v-if="avatarSrc" name="cross" />
        <van-icon @click="onClose" v-else name="arrow" />
      </template>
    </van-cell>
    <van-grid :column-num="3">
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <!-- 弹出层 -->
    <van-popup v-model="isShowModal">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </van-popup>
    <!-- /弹出层 -->
  </div>
</template>

<script>
import { GoLogin } from '@/request/api'
export default {
  data() {
    return {
      isShowModal: false,
      username: '', // 登录框用户名
      password: '', // 登录框密码
      nickName: '用户登录', // 用户名区域状态
      userImg: require('./defaultUserImg.png'),
      avatarSrc: '', // 用户头像
    }
  },
  created() {
    let token = localStorage.getItem('token')
    if (token) {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.nickName = userInfo.nickname
      this.avatarSrc = userInfo.avatar
    } else {
      this.$toast.fail('没有登录')
    }
  },
  methods: {
    openModal() {
      let token = localStorage.getItem('token')
      if (token) {
        this.onClose()
      } else {
        this.isShowModal = !this.isShowModal
      }
    },
    onSubmit(values) {
      console.log('submit', values)
      let username = values['用户名']
      let pwd = values['密码']
      GoLogin({
        username,
        pwd
      }).then(res => {
        if (res.data.errno === 0) {
          // 提示登录成功
          this.$toast.success('登录成功')
          // 把 token 存储至本地存储
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('userInfo', JSON.stringify(res.data.data.userInfo))
          // 关闭登录窗口
          setTimeout(() => {
            this.isShowModal = !this.isShowModal
          }, 500)
          // 将用户信息存储，并呈现至页面
          this.nickName = res.data.data.userInfo.nickname
          this.avatarSrc = res.data.data.userInfo.avatar

          console.log(res.data.data)
          // 清空登录框
          this.username = '',
          this.password = ''
        }
      })
    },
    onClose() {
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      this.nickName = '用户登录'
      this.avatarSrc = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .user-top {
    background: black;
    color: #fff;
    .user-box {
      display: flex;
      align-items: center;
      span {
        margin-left: 0.1rem;
      }
    }
    .van-icon {
      display: flex;
      align-items: center;
    }
  }
  .van-popup {
    width: 90%;
  }
}
</style>