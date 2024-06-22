<template>
  <view class="page-box">
    <view v-for="(item, index) in list" :key="item.goodsId" class="order">
      <view class="top">
        <view class="left">
          <u-icon :size="30" color="rgb(94,94,94)" name="home"/>
          <view class="store">{{ item.goodsName }}</view>
          <u-icon :size="26" color="rgb(203,203,203)" name="arrow-right"/>
        </view>
      </view>

      <view class="item">

        <view class="left">
          <image :src="item.image.split(',')[0]" mode="aspectFill"></image>
        </view>

        <view class="content">
          <view class="title u-line-2">{{ item.goodsDesc }}</view>
          <view class="type">{{ item.address }}</view>
          <view class="delivery-time">发货时间 {{ item.createTime }}</view>
        </view>

        <view class="right">
          <view class="price">
            ￥{{ item.goodsPrice }} 元
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

    <u-loadmore :status="loadstatus" bgColor="#f2f2f2"/>
    <!-- 删除弹窗 -->
    <u-popup v-model="show" :mask-close-able="false" border-radius="15" height="120px" mode="center" width="70%">
      <view style="padding: 20px 15px 20px 65px;">
        确定删除该商品？
      </view>
      <view style="display: flex;justify-content: center;align-items: center;height: 50px;">
        <u-button style="margin-right: 15px;" type="info" @click="cancel">取消</u-button>
        <u-button :custom-style="custonStyle"
                  style="margin-left: 15px;"
                  type="error" @click="confirm">确认
        </u-button>
      </view>
    </u-popup>
  </view>
</template>

<script setup>
//引入相关函数
import {ref} from 'vue';
import {onReachBottom, onReady} from '@dcloudio/uni-app';
import {deleteApi, getMyGoodsListApi} from "../../api/goods";

const list = ref([])
//总页数
const pages = ref(0)

const currentPage = ref(1)
const pageSize = ref(5)
const parm = {
  userId: uni.getStorageSync("userId"),
  type: 0,
  currentPage: currentPage.value,
  pageSize: pageSize.value,
}

//获取列表数据
const getMyUnusedList = async () => {
  let res = await getMyGoodsListApi(parm)
  if (res && res.code == 200) {
    console.log(res)
    pages.value = res.data.pages;
    list.value = list.value.concat(res.data.records)//商品数据
  }
}

//加载状态
const loadstatus = ref('loadmore')
//触底加载
onReachBottom(() => {
  if (parm.currentPage >= pages.value) {
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
    url: "../unused_edit/unused_edit?goods=" + JSON.stringify(item)
  })
}
//跳转查看闲置页面
const lookBtn = (item) => {
  uni.navigateTo({
    url: "../unused_detail/unused_detail?goods=" + JSON.stringify(item)
  })
}

//删除
const deleteId = ref('')
const show = ref(false)
const deleteBtn = (item) => {
  deleteId.value = item.goodsId;
  show.value = true;
  console.log(deleteId.value)
}

const cancel = () => {
  show.value = false;
}

const confirm = async () => {
  let res = await deleteApi({
    goodsId: deleteId.value
  })
  if (res && res.code == 200) {
    list.value = []
    parm.currentPage = 1;
    getMyUnusedList()
    show.value = false;
    //1306
  }
}
onReady(() => {
  getMyUnusedList()
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
      flex-grow: 1;

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

      .price {
        width: 150rpx;
        color: #D85283;
        text-wrap: none;
      }

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
    width: 100%;
    display: flex;
    margin-top: 40rpx;

    justify-content: space-between;
    align-content: space-between;

    .btn {
      line-height: 52rpx;
      width: 160rpx;
      border-radius: 26rpx;
      border: 2rpx solid $u-border-color;
      font-size: 26rpx;
      text-align: center;
      color: $u-type-info-dark;
    }

    .evaluate {
      color: $u-type-warning-dark;
      border-color: $u-type-warning-dark;
    }
  }
}
</style>
