<template>
  <view class="u-wrap">
    <u-search v-model="keywords" :animation="true" :show-action="true" action-text="搜索" bg-color="#FFF"
              margin="8px" style="flex-grow:1;" @change="searchLIST"></u-search>
  </view>
  <view class="tab-strickt">
    <u-tabs v-model="current" :is-scroll="true" :list="tabList" active-color="#FF7670" count="cate_count"
            font-size="30"
            inactive-color="#606266" name="categoryName" @change="change"></u-tabs>
  </view>

  <view class="">
    <u-waterfall v-if="flowList.length > 0" ref="uWaterfall1" v-model="flowList">
      <template v-slot:left="{leftList}">
        <view v-for="(item, index) in leftList" :key="index" class="demo-warter">
          <u-lazy-load :image="item.image" :index="index" border-radius="10" threshold="-450"
                       @click="toDetailPage(item)"></u-lazy-load>
          <view class="demo-title">
            {{ item.goodsName }}
          </view>
          <view class="demo-price">
            {{ item.goodsPrice }}元
          </view>
          <view class="demo-tag">
            <view v-if="item.type == '0'" class="demo-tag-owner">
              闲置
            </view>
            <view v-if="item.type == '1'" class="demo-tag-text" style="margin-left: 0;">
              求购
            </view>
          </view>
        </view>
      </template>
      <template v-slot:right="{rightList}">
        <view v-for="(item, index) in rightList" :key="index" class="demo-warter">
          <u-lazy-load :image="item.image" :index="index" border-radius="10" threshold="-450"
                       @click="toDetailPage(item)"></u-lazy-load>
          <view class="demo-title">
            {{ item.goodsName }}
          </view>
          <view class="demo-price">
            {{ item.goodsPrice }}元
          </view>
          <view class="demo-tag">
            <view v-if="item.type == '0'" class="demo-tag-owner">
              闲置
            </view>
            <view v-if="item.type == '1'" class="demo-tag-text">
              求购
            </view>
          </view>
        </view>
      </template>
    </u-waterfall>
    <u-loadmore :status="loadStatus" bg-color="rgb(240, 240, 240)" @loadmore="addRandomData"></u-loadmore>
  </view>

</template>

<script setup>
import {ref} from 'vue';
//引入相关函数
import {onReachBottom, onReady} from '@dcloudio/uni-app';
import {getCateListApi, getWantedListApi} from '../../api/goods.js'
//分类数据
const tabList = ref([])
//获取分类数据
const getCateList = async () => {
  let res = await getCateListApi()
  if (res && res.code == 200) {
    tabList.value = res.data;
    tabList.value.unshift({
      categoryId: '',
      categoryName: '全部',
      orderNum: 0
    })
  }
}
//点击分类，显示对应分类商品
const categoryId = ref('')
const change = (e) => {
  categoryId.value = tabList.value[e].categoryId
  //清空列表数据
  currentPage.value = 1;
  //清空瀑布流数据
  uWaterfall1.value.clear()
  //调用列表
  getUsedList()
}
const currentPage = ref(1)
const pageSize = ref(5)
const keywords = ref('') //搜索关键字
const pages = ref(0)
const flowList = ref([])
const uWaterfall1 = ref()

const getUsedList = async () => {
  let res = await getWantedListApi({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    categoryId: categoryId.value,
    keywords: keywords.value,
  })
  if (res && res.code == 200) {
    console.log(res)
    flowList.value = flowList.value.concat(res.data.records)
    pages.value = res.data.pages
  }
}

//搜索功能
// todo 节流防抖
const searchLIST = () => {
  //清空瀑布流数据
  uWaterfall1.value.clear()
  currentPage.value = 1;
  getUsedList()
}
const loadStatus = ref('')
//触底加载
onReachBottom(() => {
  console.log('触底加载更多')
  if (currentPage.value >= pages.value) {
    loadStatus.value = 'nomore'
    return;
  }
  loadStatus.value = 'loading'
  currentPage.value = ++currentPage.value;
  getUsedList()
})
//跳转商品详细页面
const toDetailPage = (item) => {
  uni.navigateTo({
    url: "../unused_detail/unused_detail?goods=" + JSON.stringify(item)
  })
}

onReady(() => {
  getCateList()
  getUsedList()
})
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

.tab-strickt {
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;

}

.demo-warter {
  border-radius: 8px;
  margin: 5px;
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
