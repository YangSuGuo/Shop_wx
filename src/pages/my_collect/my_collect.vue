<template>
  <view class="page-box">
    <view v-for="(item, index) in list" :key="item.goodsId" class="order">
      <view class="top">
        <view class="left">

          <view class="store">{{ item.goodsName }}</view>
          <!-- <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image :src="item.goodsUrl" mode="aspectFill"></image>
        </view>
        <view class="content">
          <view class="title u-line-2">{{ item.title }}</view>
          <view class="type">{{ item.type }}</view>
          <view class="delivery-time">发货时间 {{
              item.deliveryTime
            }}
          </view>
        </view>
        <view class="right">
          <view class="price">
            ￥{{ item.price }}
          </view>
          <view class="number">x1</view>
        </view>
      </view>
      <view class="bottom">
        <view class="logistics btn" @click="toLook(item)">查看</view>
        <view class="evaluate btn" @click="deleteOrder(item)">删除订单</view>
      </view>
    </view>
    <u-loadmore :status="status" bgColor="#f2f2f2" @loadmore="loadmore"></u-loadmore>
    <!-- 删除订单 -->
    <u-popup v-model="show" :mask-close-able="false" border-radius="15" height="120px" mode="center" width="70%">
      <view style="padding: 20px 15px 20px 15px;">
        确认删除订单吗？
      </view>
      <view class="conBtn" style="display: flex;justify-content: center;align-items: center;height: 50px;">
        <u-button style="margin-right: 15px;" type="info" @click="cancel">取消</u-button>
        <u-button style="margin-left: 15px;" type="error" @click="confirm">确认</u-button>
      </view>
    </u-popup>

  </view>
</template>
<script setup>
import {onReachBottom} from '@dcloudio/uni-app';
import {reactive, ref} from 'vue';
import {deleteOrderApi, getMyOrderApi} from '../../api/order.js'

const show = ref(false)
const list = ref([])
//列表参数
const parm = reactive({
  userId: uni.getStorageSync("userId"),
  currentPage: 1,
  pageSize: 5
})
const status = ref('loadmore')
//总页数
const pages = ref(0)
//获取订单列表数据
const getMyOrder = async () => {
  let res = await getMyOrderApi(parm)
  if (res && res.code == 200) {
    console.log(res)
    if (res.data.records.length == 0) {
      status.value = "nomore"
    }
    pages.value = res.data.pages;
    list.value = list.value.concat(res.data.records)
  }
}
//触底加载
onReachBottom(() => {

  console.log('触底加载')
  if (parm.currentPage >= pages.value) {
    status.value = "nomoer";
    return;
  }
  status.value = "loading"
  parm.currentPage = ++parm.currentPage;
  getMycollect()
})
//删除订单按钮
const orderId = ref('')
const deleteOrder = (item) => {
  orderId.value = item.orderIdshow.value = true;
}
//确定删除
const confirm = async () => {
  console.log(orderId.value)
  let res = await deleteOrderApi({
    orderId: orderId.value
  })
  if (res && res.code == 200) {
    parm.currentPage = 1;
    list.value = []
    getMyOrder()
    show.value = false;
  }
}
//取消
const cancel = () => {
  show.value = false;
}


//查看
const toLook = (item) => {
  if (item.type == '0') {
    uni.navigateTo({
      url: "../look_my_unused/look_my_unused?goods=" + JSON.stringify(item)
    })
  } else {
    uni.navigateTo({
      url: "../look_my_buy/look_my_buy?goods=" + JSON.stringify(item)
    })
  }
}

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
    justify-content: flex-end;
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
