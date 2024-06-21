<template>
	<view>
		<view class="u-flex user-box u-p-30" @click="toUserInfo">
			<view class="u-m-r-10">
				<!-- 未设置头像，则显示默认图片 -->
				<u-avatar v-if="picture" :src="picture" size="100"></u-avatar>
				<u-avatar v-else src="/static/user.jpg" size="100"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20" v-if="nickName">{{nickName}}</view>
				<view class="u-font-18 u-p-b-20" v-else>{{nickName}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="我的闲置" @click="toMyUnused"></u-cell-item>
				<u-cell-item icon="photo" title="我的求购" @click="toMyBuy"></u-cell-item>
				<u-cell-item icon="heart" title="我的收藏" @click="toMyCollect"></u-cell-item>
				<u-cell-item icon="red-packet" title="购买订单" @click="toMyOrder"></u-cell-item>
				<u-cell-item icon="order" title="出售订单" @click="toMySellOrder"></u-cell-item>
				<u-cell-item icon="edit-pen" title="修改密码" @click="toUpdatePass"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="退出账号" @click="logout"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>


<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		getInfoApi
	} from '../../api/user.js';
	
	
	//我的闲置
	const toMyUnused = ()=>{
		uni.navigateTo({
			url:"../my_unused/my_unused"
		})
	}
	//我的求购
	const toMyBuy = ()=>{
		uni.navigateTo({
			url:"../my_buy/my_buy"
		})
	}
	//我的收藏
	const toMyCollect = ()=>{
		uni.navigateTo({
			url:"../my_collect/my_coollect"
		})
	}
	//购买订单
	const toMyOrder = ()=>{
		uni.navigateTo({
			url:"../my_order/my_order"
		})
	}
	//出售订单
	const toMySellOrder = ()=>{
		uni.navigateTo({
			url:"../my_sell_order/my_sell_order"
		})
	}
	//修改密码
	const toUpdatePass = ()=>{
		uni.navigateTo({
			url:"../update_password/update_password"
		})
	}
	//退出登录
	const logout =()=>{
		uni.navigateTo({
			url:'../login/login'
		})
		//清除登录用户的本地缓存信息
		uni.clearStorageSync("userId");
	}
	
	const toUserInfo =() =>{
		uni.navigateTo({
			url:"../user_info/user_info?userInfo="+JSON.stringify(userInfo)
		})
	}
	
	
	//昵称
	const nickName =ref('用户昵称')
	//头像
	const picture = ref('')
	//用户信息
	let userInfo = null;
	//获取个人信息
	const getInfo = async () => {
		let res = await getInfoApi({
			userId: uni.getStorageSync("userId")
		})
		if(res && res.code == 200) {
			console.log(res)
			nickName.value = res.data.nickName
			picture.value = res.data.picture
			userInfo = res.data;
		}
	}
	onShow(()=>{
		getInfo()
	})
	
	
	
	
	
	
</script>
<style lang="scss">
	page {
		background-color: #ededed;
	}
	
	.camera {
		width: 54px;
		height: 44px;
		
		&:active {
			background-color: #ededed;
		}
	}
	
	.user-box {
		background-color: #fff;
	}
</style>

