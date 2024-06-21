<template>
	<view class="page-box">
		<view class="order" v-for="(item, index) in list" :key="item.goodsId">
			<view class="top">
				<view class="left">
					<u-icon name="home" :size="30" color="rgb(94,94,94)">
					</u-icon>
					<view class="store">{{ item.goodsName }}</view>
					<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<image :src="item.image.split(',')[0]" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view class="title u-line-2">{{ item.goodsDesc }}</view>
					<view class="type">{{ item.address }}</view>
					<view class="delivery-time">发货时间 {{ item.createTime}}</view>
				</view>
				<view class="right">
					<view class="price">
						￥{{ item.goodsPrice }}元
					</view>
					<view class="number">x1</view>
				</view>
			</view>
			<view class="bottom">
				<view class="logistics btn" @click="lookBtn(item)">查看</view>
				<view class="exchange btn">下架</view>
				<view class="evaluate btn" @click="editBtn(item)">编辑</view>
				<view class="evaluate btn" @click="deleteBtn(item)">删除</view>
			</view>
		</view>
		<u-loadmore bgColor="#f2f2f2" :status="loadstatus"></u-loadmore>
		<!-- 删除弹窗 -->
		<u-popup :mask-close-able="false" border-radius="15" width="70%" height="120px" v-model="show" mode="center">
		<view style="padding: 20px 15px 20px 65px;">
			确定删除该商品？
		</view>
		<view style="display: flex;justify-content: center;align-items: center;height: 50px;">
			<u-button @click="cancel" style="margin-right: 15px;" type="info"></u-button>
			<u-button @click="confirm" style="margin-left: 15px;" :custom-style="custonStyle" type="error">确认</u-button>
		</view>

		</u-popup>
	</view>
</template>
<script setup>
	//引入相关函数
	import {
		onReady,
		onReachBottom
	} from '@dcloudio/uni-app';

	// const list = ref([{
	// 		goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81 ae4b2f7f3bb7.jpg ',
	// 		title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风 ',
	// 		type: '灰色;M',
	// 		deliveryTime: '付款后30天内发货',
	// 		price: '348.58',
	// 		number: 2,
	// 		goodsId: '1',
	// 		goodsName: '2020冬装新款小清新宽松软糯毛衣外套'
	// 	},
	// 	{
	// 		goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg ',
	// 		title: '【葡萄藤】现货小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020 新款 ',
	// 		type: '45cm;S',
	// 		deliveryTime: '付款后30天内发货',
	// 		price: '135.00',
	// 		number: 1,
	// 		goodsId: '2',
	// 		goodsName: '【葡萄藤】现货小清新学院风制服格裙百褶裙'
	// 	}
	// ])
	//总页数
	const pages = ref(0)
	//获取列表数据
	const getMyUnusedList = async () =>{
		let res = await getMyUnusedListApi(parm)
		if (res && res.code == 200) {
			pages.value = res.data.pages;
			list.value = list.value.concat(res.data.records)//商品数据
		}
	}


	//加载状态
	const loadstatus = ref('loadmore')
	//触底加载
	onReachBottom(() =>{
		if(parm.currentPage >=pages.value){
			loadstatus.value = "nomore"
			return;
    }
			loadstatus.value = "loading"
			parm.currentPage = ++parm.currentPage;
			getMyUnusedList()

	})

	//跳转到编辑商品页面
	const editBtn = (item) => {
		uni.navigateTo({
			url:"../unused_edit/unused_edit?goods="+JSON.stringify(item)
		})
	}
	//跳转查看闲置页面
	const lookBtn = (item) => {
		uni.navigateTo({
			url:"../look_my_unused/look_my_unused?goods="+JSON.stringify(item)
		})
	}
	//删除
	const deleteId = ref('')
	const show = ref(false)
	const deleteBtn= (item) =>{
		deleteId.value = item.goodsId;
		show.value = true;
		console.log(deleteId.value)

	}
	const cancel = () =>{
		show.value =false;

	}

	const confirm = async () => {
		let res =await deleteApi({
			goodsId: deleteId.value
		})
		if(res && res.code == 200){
			list.value = []
			parm.currentPage = 1;
			getMyUnusedList()//重新获取商品列表
			show.value=false;
			//1306
		}
	}
	onReady(() =>{
		getMyUnusedList()
		//工单1302
	})
</script>
<style lang="scss">
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}

			.right {
				color: $u-type-warning-dark;
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}

				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}

				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}

				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;

			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
				margin-right: 10px;
			}

			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
		}
	}
</style>
