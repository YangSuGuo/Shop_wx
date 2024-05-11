<template>
	<!-- 	轮播图 -->
	<view class="u-wrap">
		<swiper class="swipper-container" circular :indicator-dots="indicatorDots" :indicator-color="indicatorColor"
			:autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in swipperList">
				<image class="imgs" :src="item.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- 搜索框 -->
		<view class="tab-strickt">
			<u-search bg-color="#FFF" margin="8px" style="flex-grow: 1;" :show-action="true" action-text="搜索"
				:animation="true"></u-search>
		</view>

		<!-- 瀑布流 -->
		<view class="">
			<u-waterfall v-model="flowList" ref="uWaterFall1">
				<template v-slot:left="{leftList}">
					<view class="demo-warter-left" v-for="(item, index) in leftList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
						<view class="demo-shop">
							{{item.shop}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
							@click="remove(item.id)"></u-icon>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter-right" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{item.title}}
						</view>
						<view class="demo-price">
							{{item.price}}元
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								自营
							</view>
							<view class="demo-tag-text">
								放心购
							</view>
						</view>
						<view class="demo-shop">
							{{item.shop}}
						</view>
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close"
							@click="remove(item.id)"></u-icon>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script setup>
	// 1.引入vue3中的ref模版
	import {
		ref
	} from 'vue'

	// 2.响应式数据
	const indicatorDots = ref(true) //有小圆点
	const indicatorColor = ref("#FFF") //小圆点背景色
	const autoplay = ref(true) //自动播放
	const interval = ref(2000) //间隔时间
	const duration = ref(500) //播放时间
	//轮播图数据
	const swipperList = ref([{
			image: '/static/33.jpeg'
		},
		{
			image: '/static/44.jpg'
		},
		{
			image: '/static/66.jpeg'
		},
	])

	// 瀑布流
	const flowList = ref([{
			price: 75,
			title: '手机',
			image: '/static/11.jpg',
		},
		{
			price: 385,
			title: '笔记本电脑',
			image: '/static/22.jpeg',
		},
		{
			price: 784,
			title: '耳机',
			image: '/static/33.jpeg'
		},
		{
			price: 7891,
			title: '手表',
			image: '/static/44.jpg'
		},
		{
			price: 2341,
			title: '养生壶',
			image: '/static/66.jpeg'
		},
		{
			price: 2342,
			title: '手表',
			image: '/static/55.jpg'
		},
		{
			price: 2341,
			title: '手机',
			image: '/static/11.jpg'
		},
		{
			price: 2342,
			title: '电脑',
			image: '/static/22.jpeg'
		},
	])
</script>

<style lang="scss">
	.swipper-container {
		height: 220px;

		.item {
			height: 220px;
		}
	}

	.imgs {
		height: 220px;
		width: 100%;
	}

	// 搜索框--向下滑动页面时，将其固定在最上方
	.tab-strickt {
		position: sticky;
		z-index: 99;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		background-color: #f2f2f2;
	}

	// 瀑布流
	.demo-warter-left {
		border-radius: 8px;
		margin: 5px 0px 5px 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.demo-warter-right {
		border-radius: 8px;
		margin: 5px 5px 5px 0px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>