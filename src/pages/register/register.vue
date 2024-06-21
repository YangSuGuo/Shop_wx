<template>
  <view class="Login">
    <view class="container">
      <image class="imgBanner"
             src="https://img.picui.cn/free/2024/06/21/6675809ef1f73.png"/>

      <view class="registerFrom">
        <u-form class="form" :model="loginModel" ref="form1" :error-type="['border-bottom']">
          <u-form-item prop="phone" class="input">
            <u-input v-model="loginModel.phone" clearable placeholder="请输入电话"
                     prefixIconStyle="font-size: 22px;color: #909399"/>
          </u-form-item>
          <u-form-item prop="username" class="input">
            <u-input v-model="loginModel.username" clearable placeholder="请输入账户"
                     prefixIconStyle="font-size: 22px;color: #909399"/>
          </u-form-item>
          <u-form-item prop="password" class="input">
            <u-input v-model="loginModel.password" clearable placeholder="请输入密码" type="password"
                     prefixIconStyle="font-size: 22px;color: #909399"/>
          </u-form-item>
          <u-form-item prop="passwordConfirm" class="input">
            <u-input v-model="loginModel.passwordConfirm" clearable placeholder="请输入确定密码" type="password"
                     prefixIconStyle="font-size: 22px;color: #909399"/>
          </u-form-item>
          <view style="margin-top: 40rpx"/>
          <u-button style="width: 90%" type="primary" @click="commit">注册</u-button>
          <view class="register">
            <text>已有账号？</text>
            <text class="link-text" @click="toLogin">去登录</text>
          </view>
        </u-form>
      </view>
    </view>
  </view>
</template>


<script setup>
import {reactive, ref} from 'vue';
import {onReady} from '@dcloudio/uni-app'
import {registerApi} from '../../api/user.js'

const form1 = ref()

// 注册表单数据模型
const loginModel = reactive({
  phone: '',
  username: '',
  password: '',
  passwordConfirm: ''
});

// 去登录
const toLogin = () => {
  uni.navigateTo({
    url: '../login/login'
  })
};

//表单验证规则
const rules = reactive({
  phone: [{
    required: true,
    message: '请输入电话',
    trigger: ['change', 'blur'],
  }],
  username: [{
    required: true,
    message: '请输入账号',
    trigger: ['change', 'blur'],
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: ['change', 'blur'],
  }],
  passwordConfirm: [{
    required: true,
    message: '请输入确定密码',
    trigger: ['change', 'blur'],
  }],
})

//提交注册表单
const commit = () => {
  form1.value.validate(async (valid) => {
    if (valid) {
      if (loginModel.passwordConfirm != loginModel.password) {
        uni.showToast({
          title: '两次密码不一致',
          icon: 'none',
          duration: 2000
        })
      }

      let res = await registerApi(loginModel)
      if (res && res.code == 200) {
        uni.navigateTo({
          url: '../login/login'
        })
      }

    }
  })
}

//生命周期函数：页面初次渲染时完成
onReady(() => {
  form1.value.setRules(rules);
})
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

.registerFrom {
  padding: 40rpx;
}

.form {
  width: 100%;
  background-color: #FFF;
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

.commit {
  margin-top: 40rpx;
  width: 90%;
}
</style>
