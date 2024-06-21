<template>
  <view class="Login">
    <view class="container">
      <image class="imgBanner"
             src="https://img.picui.cn/free/2024/06/21/6675809ef1f73.png"/>
      <view class="form" :model="loginModel" ref="form1">
        <view class="input">
          <u-input v-model="loginModel.username" clearable placeholder="请输入用户名"
                   prefixIconStyle="font-size: 22px;color: #909399"/>
        </view>
        <view class="input">
          <u-input v-model="loginModel.password" clearable placeholder="请输入密码"
                   prefixIconStyle="font-size: 22px;color: #909399" type="password"/>
        </view>
        <u-button style="margin-top: 40rpx;width: 90%" type="primary" @click="toCommit">登录</u-button>
        <view class="register">
          <text>没有账号？</text>
          <text class="link-text" @click="toRegister">去注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {reactive} from 'vue';
import {loginApi} from "../../api/user";

// 表单数据
const loginModel = reactive({
  username: '',
  password: ''
})

//去注册
const toRegister = () => {
  uni.navigateTo({
    url: '../register/register'
  })
}

//提交登录
const toCommit = async () => {
  if (!loginModel.username) {
    uni.showToast({
      title: '请输入账号',
      icon: 'none',
      duration: 2000
    })
    return;
  }

  let res = await loginApi(loginModel)
  if (res && res.code == 200) {
    //储存用户id
    uni.setStorageSync('userId', res.data.userID)
    //跳转首页
    uni.switchTab({
      url: '../index/index'
    })
  }
}
</script>

<style scoped>
.Login {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

.container {
  width: 95%;
  margin-top: 200rpx;
  background: #FFF;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.imgBanner {
  width: 100%;
  height: 250rpx;
  border-radius: 20rpx;
  background: #FFF;
}

.form {
  width: 100%;
  background-color: #FFF;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  width: 100%;
  padding: 20rpx 0;
}

.register {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20rpx;
}

.link-text {
  color: #007aff;
  margin-left: 10rpx;
}
</style>
