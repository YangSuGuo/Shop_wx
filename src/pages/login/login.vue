<template>
	<view class="u-p-t-40 u-p-r-60 u-p-l-60 logincontainer">
		<!-- 头像 -->
		<u-avatar size="140" src="/static/logo.png" mode="circle"></u-avatar>
		
		<!-- 表单 -->
		<u-form class="forms" :model="loginModel" ref="form1">
			
			<u-form-item left-icon="account-fill" left-icon-style="font-size:24px;color:#FF7670;">
				<u-input placeholder="请输入账户" v-model="loginModel.username" />
			</u-form-item>
			<u-form-item left-icon="lock" left-icon-style="font-size:24px;color:#FF7670;">
				<u-input placeholder="请输入密码" v-model="loginModel.password" />
			</u-form-item>
			<view class="passtext">
				忘记密码
			</view>
			<!-- 按钮 -->
			<u-button :custom-style="customStyle1" @click="toCommit">登录</u-button>
			<u-button type="success" :custom-style="customStyle2" @click="toRegister">注册</u-button>
		</u-form>
		
	</view>
</template>

<script setup>
	
	import {
		reactive
	} from 'vue';
  import {loginApi} from "../../api/user";
	
	// 表单数据
	const loginModel = reactive({
		username: '',
		password: ''
	})
	// 登录按钮
	const customStyle1 = reactive({
		marginTop: '40px',
		background: '#FF7670',
		color: '#FFF',
		width: '100%'
	})
	//注册按钮
	const customStyle2 = reactive({
		marginTop: '35px',
		color: '#FFF',
		width: '100%'
	})
	//去注册
	const toRegister = () => {
		uni.navigateTo({
			url:'../register/register'
		})
	}
	//提交登录
	const toCommit = async () => {
		if(!loginModel.username) {
			uni.showToast({
				title:'请输入账号',
				icon:'none',
				duration: 2000
			})
			return;
		}

		let res = await loginApi(loginModel)
		if (res && res.code ==200) {
			//储存用户id
			uni.setStorageSync('userId', res.data.userID)
			//跳转首页
			uni.switchTab({
				url:'../index/index'
			})
		}
	}
</script>

<style lang="scss">
	.logincontainer {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		
		// 表单
		.forms {
			width: 100%;
			margin-top: 30px;
		}
	}
	
	// 忘记密码
	.passtext {
		display: flex;
		justify-content: flex-end;
		color: #FF7670;
		margin-top: 15px;
	}
</style>
