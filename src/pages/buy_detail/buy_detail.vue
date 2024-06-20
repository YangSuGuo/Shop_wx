<template>
  <view style="overflow-y: auto;">
    <!-- 轮播图 -->
    <u-swiper name="image" border-radius='1' :duration='duration' :interval='interval' :height="height"
              :list="swipperList"/>

    <!-- 标题 -->
    <view class="header">
      <view class="title">{{ goodsName }}</view>
      <view class="price">￥{{ goodsPrice }}</view>
    </view>

    <!-- 商品简介 -->
    <view class="info-fa">
      <view class="info-left"/>
      <view class="goodsInfo">物品简介</view>
    </view>
    <view class="info">
      <view class="title-desc">{{ goodsDesc }}</view>
    </view>

    <view class="info-fa">
      <view class="info-left"/>
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
      <u-steps active-color="#FF7660" style="width: 100%;" mode="number" :list="numlist" :current="4"/>
    </view>

    <view class="info-fa">
      <view class="fa-left"/>
      <view class="goodsInfo">交易方式</view>
    </view>

    <view class="info">
      <view class="title-desc">自提|送货上门</view>
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

    <view class="useinfo">
      <view class="title-desc">电话:{{ phone }}</view>
      <view class="title-desc">微信:{{ wxNum }}</view>
    </view>

  </view>

  <!-- 底部菜单 -->
  <view class="navigation">
    <view class="left">

      <view class="item">
        <u-icon name="home" :size="40"/>
        <view class="text u-line-1" @click="toIndex">首页</view>
      </view>

      <view class="item">
        <u-icon name="star" :size="40"/>
        <view class="text u-line-1"> 收藏</view>
      </view>

      <view class="item car" @click="toRepory">
        <u-icon name="info-circle" :size="40"/>
        <view class="text u-line-1"> 举报</view>
      </view>

    </view>

    <view class="right">
      <view class="cart btn u-line-1" @click="callPhone">电话咨询</view>
      <view class="buy btn u-line-1" @click="toBuy">立即交易</view>
    </view>

  </view>

  <!-- 立刻交易 -->
  <u-popup :mask-close-able="false" border-radius="15"  width="85%" height="200px" v-model="show" mode="center">
	 <view style="padding: 50px 15px 30px 15px;">
		 <u-form label-width="auto" :model="addModel" ref="form1">
			 <u-form-item label="请输入金额" prop="price"></u-form-item>
			 <u-input></u-input>
		 </u-form>
	 </view> 
	 <view class="conBtn">
	<u-button @click="cancel" style="margin-right: 15px;" type="info">取消交易</u-button>
	<u-button @click="confirm" style="margin-left: 15px;" :custom-style="customStyle" type="error">确认交易</u-button>
	 </view>
  </u-popup>
  
   <u-popup :mask-close-able="false" border-radius="15" width="85%" height="200px" v-model="reportShow" mode="center">
  		  <view style="padding: 50px 15px 30px 15px;">
  			  <u-form label-width="auto" :model="reportModel" ref="form1">
  				  <u-form-item label="请输入举报原因" prop="reason">
  					  <u-input v-model="addModel.reason"></u-input>
  				  </u-form-item>
  			  </u-form>
  		  </view>
  		  <view class="conBtn">
  		  			  <u-button @click="reportCancel" style="margin-right: 15px;" type="info">取消举报</u-button>
  		  			  <u-button @click="reportConfirm" style="margin-left: 15px;" :custom-style="customStyle" type="error">确认举报	</u-button>
  		  </view>
  	  </u-popup>




</template>

<script setup>
//轮播图
import {ref, reactive,} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
//轮播图高度
const height = ref('350')
const indicatorDots = ref(true)
const autoplay = ref(2000)
const interval = ref(2000)
const duration = ref(500)
const swipperList = ref([])
// 	image: '/static/user.jpg'
// },{
// 	image: '/static/222.jpeg'
// },{
// 	image:'/static/11.jpg'

//交易流程步骤条
const numlist = ref([{
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
price: ""
})
 const toBuy = () => {
	 show.value = true;
 }
const cancel = () => {
  show.value = false;
}

const confirm = () => {
  show.value = false;
}


const reportShow = ref(false)
const toRepory = () => {
	reportShow.value = true;
}
const reportModel = reactive({
	reason:""
})
const reportCancel = () => {
	reportShow.value = false;
}
const reportConfirm = () => {
	reportShow.value= false;
}


</script>

<style lang="scss">
.header {
  display: flex;
}

.title {
  color: #303133;
  font-weight: bold;
  font-size: 30rpx;
  padding: 20rpx;
}

.price {
  color: #FF7670;
  font-size: 30rpx;
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
  margin-bottom: 25px;
  padding: 0px 25px;
  background-color: #FFF;
}

.useinfo {
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
  padding: 16rpx 0;
  position: fixed;
  width: 100%;
  bottom: 0;

  .left {
    display: flex;
    font-size: 20rpx;

    .item {
      margin: 0 30rpx;

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
