<template>
  <view>
    <view class="u-flex user-box u-p-30" @click="toUserInfo">
      <view class="u-m-r-10">
        <u-avatar v-if="picture" :src="picture" size="100"/>
        <u-avatar v-else size="100" src="/static/Login/user.png"/>
      </view>
      <view class="u-flex-1">
        <view v-if="nickName" class="u-font-18 u-p-b-20">{{ nickName }}</view>
        <view v-else class="u-font-18 u-p-b-20">{{ nickName }}</view>
      </view>
      <view class="u-m-l-10 u-p-10">
        <u-icon color="#969799" name="arrow-right" size="28"></u-icon>
      </view>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="star" title="我的闲置" @click="toMyUnused"/>
        <u-cell-item icon="photo" title="我的求购" @click="toMyBuy"/>
        <u-cell-item icon="heart" title="我的收藏" @click="toMyCollect"/>
        <u-cell-item icon="red-packet" title="购买订单" @click="toMyOrder"/>
        <u-cell-item icon="order" title="出售订单" @click="toMySellOrder"/>
        <u-cell-item icon="edit-pen" title="修改密码" @click="toUpdatePass"/>
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
import {ref} from 'vue';
import {onShow} from '@dcloudio/uni-app';
import {getInfoApi} from '../../api/user.js';

//我的闲置
const toMyUnused = () => {
  uni.navigateTo({
    url: "../my_unused/my_unused"
  })
}
//我的求购
const toMyBuy = () => {
  uni.navigateTo({
    url: "../my_buy/my_buy"
  })
}
//我的收藏
const toMyCollect = () => {
  uni.navigateTo({
    url: "../my_collect/my_coollect"
  })
}
//购买订单
const toMyOrder = () => {
  uni.navigateTo({
    url: "../my_order/my_order"
  })
}
//出售订单
const toMySellOrder = () => {
  uni.navigateTo({
    url: "../my_sell_order/my_sell_order"
  })
}
//修改密码
const toUpdatePass = () => {
  uni.navigateTo({
    url: "../update_password/update_password"
  })
}
//退出登录
const logout = () => {
  uni.navigateTo({
    url: '../login/login'
  })
  //清除登录用户的本地缓存信息
  uni.clearStorageSync("userId");
}
//修改个人信息
const toUserInfo = () => {
  uni.navigateTo({
    url: "../user_info/user_info?userInfo=" + JSON.stringify(userInfo)
  })
}

//获取个人信息
const nickName = ref('用户昵称')
const picture = ref('')
let userInfo = null;
const getInfo = async () => {
  let res = await getInfoApi({
    userId: uni.getStorageSync("userId")
  })
  if (res && res.code == 200) {
    console.log(res)
    nickName.value = res.data.nickName == null ? res.data.username : res.data.nickName
    picture.value = res.data.picture
    userInfo = res.data;
  }
}

onShow(() => {
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

