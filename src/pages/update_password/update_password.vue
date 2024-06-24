<template>
  <view class="Login">
    <view class="container">
      <image class="imgBanner"
             src="https://img.picui.cn/free/2024/06/21/6675809ef1f73.png"/>
      <view ref="form1" :model="loginModel" class="form">
        <view class="input">
          <u-input v-model="loginModel.oldPassword" clearable placeholder="请输入旧密码"
                   prefixIconStyle="font-size: 22px;color: #909399" type="password"/>
        </view>
        <view class="input">
          <u-input v-model="loginModel.password" clearable placeholder="请输入新密码"
                   prefixIconStyle="font-size: 22px;color: #909399" type="password"/>
        </view>
        <view class="input">
          <u-input v-model="loginModel.confirm" clearable placeholder="请输入确认密码"
                   prefixIconStyle="font-size: 22px;color: #909399" type="password"/>
        </view>
        <u-button style="margin-top: 40rpx;width: 90%" type="primary" @click="toCommit">登录</u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import {reactive} from 'vue';
import {getWxUpdatePasswordApi} from "../../api/user";

// 表单数据
const loginModel = reactive({
  userId: uni.getStorageSync("userId"),
  password: '',
  confirm: '',
  oldPassword: ''
})

//提交
const toCommit = async () => {
  if (!loginModel.password !== !loginModel.confirm) {
    uni.showToast({
      title: '密码不一致',
      icon: 'none',
      duration: 2000
    })
    return;
  }

  let res = await getWxUpdatePasswordApi(loginModel)
  if (res && res.code == 200) {
    uni.clearStorageSync("userId");
    uni.navigateTo({
      url: '../login/login'
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

</style>
