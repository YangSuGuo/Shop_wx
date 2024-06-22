<template>
  <view style="overflow-y: auto;">
    <!-- 轮播图 -->
    <u-swiper :duration='duration' :height="height" :interval='interval' :list="swipperList" border-radius='1'
              name="image"/>

    <!-- 标题 -->
    <view class="header">
      <view class="title">{{ goodsName }}</view>
      <view class="price">{{ goodsPrice }} ￥</view>
    </view>

    <view class="info-fa" style="margin-left: 20rpx; margin-bottom: 20rpx">
      <u-tag mode="light" style="margin-right: 8rpx" text="自提" type="error"/>
      <u-tag mode="light" text="送货上门" type="error"/>
    </view>

    <!-- 商品简介 -->
    <view class="info-fa">
      <view class="fa-left"></view>

      <view class="goodsInfo">物品简介</view>
    </view>
    <view class="info">
      <view class="title-desc">{{ goodsDesc }}</view>
    </view>

    <view class="info-fa">
      <view class="fa-left"></view>
      <view class="goodsInfo">物品位置</view>
    </view>

    <view class="info">
      <view class="title-desc">{{ address }}</view>
    </view>

    <view class="info-fa">
      <view class="fa-left"></view>
      <view class="goodsInfo">交易流程</view>
    </view>

    <view class="info">
      <u-steps
          :current="0"
          :list="numlist"
          active-color="#FF7660"
          mode="dot"
          style="width: 100%; margin-top: 20rpx"
          un-active-color="#606266"/>
    </view>

    <view class="info-fa">
      <view class="fa-left"/>
      <view class="goodsInfo">发布时间</view>
    </view>

    <view class="info">
      <view class="title-desc">{{ createTime }}</view>
    </view>

    <view class="info-fa">
      <view class="fa-left"/>
      <view class="goodsInfo">联系方式</view>
    </view>

    <view class="userinfo">
      <view class="title-desc" style="margin-bottom: 8rpx">电话: {{ phone }}</view>
      <view class="title-desc">微信: {{ wxNum }}</view>
    </view>

  </view>

  <!-- 底部菜单 -->
  <view class="navigation">
    <view class="left">
      <view class="item">
        <u-icon :size="40" name="home"/>
        <view class="text u-line-1" @click="toIndex">首页</view>
      </view>

      <view class="item">
        <u-icon :size="40" name="star"/>
        <view class="text u-line-1"> 收藏</view>
      </view>

      <view class="item car" @click="toRepory">
        <u-icon :size="40" name="info-circle"/>
        <view class="text u-line-1"> 举报</view>
      </view>
    </view>

    <view class="right">
      <u-button
          :ripple="true"
          shape="circle"
          size="mini"
          style="margin-right: 20rpx"
          type="warning"
          @click="callPhone"
      >
        电话咨询
      </u-button>
      <u-button
          :ripple="true"
          shape="circle"
          size="mini"
          style="margin-right: 20rpx"
          type="error"
          @click="toBuy"
      >
        立即交易
      </u-button>
    </view>

  </view>

  <!-- 立刻交易 -->
  <u-popup v-model="show" :mask-close-able="false" border-radius="15" height="200px" mode="center" width="85%">
    <view style="padding: 50px 15px 30px 15px;">
      <u-form ref="form1" :model="addModel" label-width="auto">
        <u-form-item label="请输入金额" prop="price">
          <u-input v-model="addModel.price"/>
        </u-form-item>
      </u-form>
    </view>
    <view class="conBtn">
      <u-button style="margin-right: 15px;" type="info" @click="cancel">取消交易</u-button>
      <u-button :custom-style="customStyle" style="margin-left: 15px;" type="error" @click="confirm">确认交易</u-button>
    </view>
  </u-popup>
  <!-- 举报 -->
  <u-popup v-model="reportShow" :mask-close-able="false" border-radius="15" height="200px" mode="center" width="85%">
    <view style="padding: 50px 15px 30px 15px;">
      <u-form ref="form1" :model="reportModel" label-width="auto">
        <u-form-item label="请输入举报原因" prop="reason">
          <u-input v-model="addModel.reason"></u-input>
        </u-form-item>
      </u-form>
    </view>
    <view class="conBtn">
      <u-button style="margin-right: 15px;" type="info" @click="reportCancel">取消举报</u-button>
      <u-button :custom-style="customStyle" style="margin-left: 15px;" type="error" @click="reportConfirm">确认举报
      </u-button>
    </view>
  </u-popup>
</template>

<script setup>
//轮播图
import {reactive, ref,} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {replaceOrderApi} from "../../api/order";
//轮播图高度
const height = ref('350')
const interval = ref(2000)
const duration = ref(500)
const swipperList = ref([])

//交易流程步骤条
const numlist = ref([
  {
    name: '发布信息'
  },
  {
    name: '电话/微信沟通'
  },
  {
    name: '当面交易'
  },
  {
    name: '交易完成'
  }])
const goodsId = ref('')
const goodsName = ref('')
const goodsPrice = ref('')
const goodsDesc = ref('')
const address = ref('')
const wxNum = ref('')
const phone = ref('')
const createTime = ref('')
//商品创建人id
const creatUser = ref('')
onLoad((options) => {
  const goods = JSON.parse(options.goods)
  goodsId.value = goods.goodsId;
  if (goods.image) {
    swipperList.value = goods.image.split(",");
  }
  goodsName.value = goods.goodsName;
  goodsDesc.value = goods.goodsDesc;
  address.value = goods.address;
  goodsPrice.value = goods.goodsPrice;
  createTime.value = goods.createTime;
  phone.value = goods.phone;
  wxNum.value = goods.wxNum;
  //要卖东西的用户
  creatUser.value = goods.userId;
  //商品id
  addModel.goodsId = goods.goodsId

})

const toIndex = () => {
  uni.switchTab({
    url: "../index/index"
  })
}
const callPhone = () => {
  uni.makePhoneCall({
    phoneNumber: phone.value
  })
}

const show = ref(false)
const addModel = reactive({
  price: "",
  goodsId: "",
//当前登录用户，即交易用户
  orderUser: uni.getStorageSync("userId")
})
const toBuy = () => {
  show.value = true;
}
const cancel = () => {
  show.value = false;
}
//交易确定
const confirm = async () => {
  if (!addModel.price) {
    await uni.showToast({
      title: "请填写交易金额",
      icon: "none",
      mask: true,
      duration: 3000
    })
    return;
  }
  let res = await replaceOrderApi(addModel)
  if (res && res.code == 200) {
    show.value = false;
    uni.showToast({
      title: "交易成功",
      icon: "none",
      mask: true,
      duration: 3000
    }).then(r =>
        uni.switchTab({
          url: "../unused/unused"
        })
    )
  }
}


const reportShow = ref(false)
const toRepory = () => {
  reportShow.value = true;
}
const reportModel = reactive({
  reason: ""
})
const reportCancel = () => {
  reportShow.value = false;
}
const reportConfirm = () => {
  reportShow.value = false;
}


</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
}

.title {
  color: #303133;
  flex-grow: 1;
  font-weight: bold;
  font-size: 50rpx;
  padding: 20rpx;
}

.price {
  color: #FF7670;
  font-size: 40rpx;
  margin-right: 20rpx;
  padding: 20rpx;
}

.info-fa {
  display: flex;
  align-items: center;
}

.fa-left {
  width: 1px;
  height: 12px;
  border: 3px solid #FF7670;
  margin-left: 10px;
}

.goodsInfo {
  padding: 5px;
  color: #F3AF28;
}

.info {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  margin-bottom: 25px;
  padding: 0px 25px;
  background-color: #FFF;
}

.userinfo {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 80px;
}

.navigation {
  display: flex;
  margin-top: 100rpx;
  border: 2rpx solid #f2f2f2;
  background-color: #ffffff;
  padding: 20rpx 0;
  position: fixed;
  width: 100%;
  bottom: 30rpx;

  .left {
    display: flex;
    font-size: 20rpx;
    margin-left: 30rpx;
    align-items: center;
    flex-grow: 1;

    .item {
      margin-right: 40rpx;

      &.car {
        text-align: center;
        position: relative;

        .car-num {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
        }
      }
    }
  }

  .right {
    display: flex;
    font-size: 30rpx;
    align-items: center;
    margin-right: 30rpx;

    .btn {
      line-height: 66rpx;
      padding: 0;
      border-radius: 36rpx;
      color: #ffffff;
    }

    .cart {
      background-color: #FF7670;
      margin-right: 30rpx;
    }

    .buy {
      background-color: #F3AF28;
    }
  }
}

.conBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

</style>
