<template>
  <!-- 	轮播图 -->
  <view class="u-wrap">
    <swiper :autoplay="autoplay" :duration="duration" :indicator-dots="indicatorDots"
            :interval="interval" circular class="swipper-container">
      <swiper-item v-for="(item) in swipperList">
        <image :src="item.image" class="imgs" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <!-- 搜索框 -->
    <view class="tab-strickt">
      <u-search v-model="keywords" :animation="true" :show-action="true" action-text="搜索" bg-color="#f2f2f2"
                margin="8px" style="flex-grow: 1;" @change="searchList"/>
    </view>

    <!-- 瀑布流 -->
    <view class="">
      <u-waterfall v-if="flowList.length > 0" ref="uWaterFall1" v-model="flowList">
        <template v-slot:left="{leftList}">
          <view v-for="(item, index) in leftList" :key="index" class="demo-warter-left">
            <u-lazy-load :image="item.image" :index="index" border-radius="10" threshold="-450"/>

            <view class="demo-title">
              {{ item.goodsName }}
            </view>

            <view class="demo-price">
              {{ item.goodsPrice }}元
            </view>

            <view class="demo-tag">
              <view v-if="item.type =='0'" class="demo-tag-owner">
                闲置
              </view>
              <view v-else class="demo-tag-text" style="margin-left: 0;">
                求购
              </view>
            </view>


          </view>
        </template>
        <template v-slot:right="{rightList}">
          <view v-for="(item, index) in rightList" :key="index" class="demo-warter-right">
            <u-lazy-load :image="item.image" :index="index" border-radius="10" threshold="-450"/>

            <view class="demo-title">
              {{ item.goodsName }}
            </view>

            <view class="demo-price">
              {{ item.goodsPrice }}元
            </view>

            <view class="demo-tag">
              <view v-if="item.type =='0'" class="demo-tag-owner">
                闲置
              </view>
              <view v-else class="demo-tag-text" style="margin-left: 0;">
                求购
              </view>
            </view>

          </view>
        </template>
      </u-waterfall>
      <u-loadmore :status="loadStatus" bg-color="rgb(240, 240, 240)" @loadmore="addRandomData"></u-loadmore>
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue';
import {getIndexListApi} from "../../api/index";
import {onReachBottom, onReady} from "@dcloudio/uni-app";

// 2.响应式数据
const indicatorDots = ref(false) //有小圆点
const autoplay = ref(true) //自动播放
const interval = ref(2000) //间隔时间
const duration = ref(500) //播放时间

//轮播图数据
const swipperList = ref([
  {
    image: '/static/Banner/2.png'
  },
  {
    image: '/static/Banner/3.png'
  },
  {
    image: '/static/Banner/4.png'
  },
])

// 瀑布流
const flowList = ref([])

//加载更多
const loadStatus = ref('loadmore')
//点击查询参数
const currentPage = ref(1)//当前页数
const pageSize = ref(5)//每页查询条数
const pages = ref(0)//总页数
const keywords = ref('')//查询关键字
// 读取推荐到首页的商品数据
const getIndexList = async () => {
  let res = await getIndexListApi({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    keywords: keywords.value
  })
  if (res && res.code == 200) {
    pages.value = res.data.pages//没置总页数
    flowList.value = flowList.value.concat(res.data.records);
    loadStatus.value = 'loadmore';
  }
}
//瀑布流表单对象
const uWaterFall1 = ref()
//搜索功能
const searchList = () => {
  uWaterFall1.value.clear()//清至深布流
  currentPage.value = 1;//当前页面
  loadStatus.value = 'loading' //加载更多
  getIndexList()//根据关键字查询瀑布流
}
//触底加载
onReachBottom(() => {
  console.log('触底加载更多')
  //如果当前页面大于等于总页数，状态修改为没有更多就不再继续执行代码
  if (currentPage.value >= pages.value) {
    loadStatus.value = 'nomore';
    return;
  }
  loadStatus.value = 'loading';
  currentPage.value = ++currentPage.value
  //修改页面后重新获取数据
  getIndexList()
})


onReady(() => {
  getIndexList()//读取首页数据
})


</script>

<style lang="scss">
.swipper-container {
  height: 250rpx;

  .item {
    height: 250rpx;
  }
}

.imgs {
  height: 250rpx;
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
  background: #FFF;
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
