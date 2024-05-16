<template>
  <view class="u-wrap u-p-1-20 u-p-r-20">
    <u-form :model="addModel" ref="form1">
      <u-form-item prop="name" label="类型:">
        <u-radio-group v-model="addModel.name">
          <u-radio activeColor="#00cc33" v-for="(item, index) in list" :key="index" :name="item.name"
                   :disabled="item.disabled">
            {{ item.name }}
          </u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item prop="goodsName" label="名称">
        <u-input placeholder="请输入名称" v-model="addModel.title"/>
      </u-form-item>
      <u-form-item prop="goodsDesc" label="简介">
        <u-input placeholder="请输入简介" v-model="addModel.introduce"/>
      </u-form-item>
      <u-form-item prop="goodsPrice" label="价格">
        <u-input placeholder="请输入价格" v-model="addModel.price"/>
      </u-form-item>
      <u-form-item prop="userName" label-width="auto" label="联系人">
        <u-input placeholder="请输入联系人" v-model="addModel.userName"/>
      </u-form-item>
      <u-form-item prop="phone" label-width="auto" label="联系电话">
        <u-input placeholder="请输入联系电话" v-model="addModel.phone"/>
      </u-form-item>
      <!--      微信号联系地址-->
      <u-form-item prop="wxNum" label-width="auto" label="微信号:">
        <u-form-item placeholder="请输入微信号" v-model="addModel.wxNum"></u-form-item>
      </u-form-item>
      <u-form-item prop="address" label-width="auto" label="联系地址:">
        <u-input v-model="addModel.address"></u-input>
      </u-form-item>
      <u-form-item prop="image" label="图片:"></u-form-item>
      <u-upload @on-remove="onRemove" @on-change="onchange" :action="action"></u-upload>
    </u-form>
    <u-button @click="commit" :custom-style="customStyle">发布</u-button>
  </view>
</template>

<script setup>
import {reactive, ref} from 'vue';
import UFormItem from "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue";
import UInput from "../../uni_modules/vk-uview-ui/components/u-input/u-input.vue";
//引入后端api
import {categoryApi} from "../../api/goods.js";
//引入onReady生命周期函数 页面渲染时读后端数据
import {onReady} from "@dcloudio/uni-app";
//引入http请求文件
import http from '../../common/http.js'

// 表单数据
const addModel = reactive({
  userId: uni.getStorageSync('userId'),
  name: '',
  type: '',
  goodsName: '',
  categoryId: '',
  categoryName: '',
  goodsDesc: '',
  goodsPrice: '',
  userName: '',
  phone: '',
  wxNum: '',
  image: '',
  address: '',
})

// 物品发布类型
const list = [
  {
    name: '闲置',
    disabled: false
  },
  {
    name: '求购',
    disabled: false
  }
]

//图片上传路径
const action = ref(http.baseUrl + "/api/v1/upload/uploadImage")

//存储图片路径
const imgUrl = ref([])

// 图片上传
//const value = ref('')
//const action = ref('')
//const fileList = ref([])

// 发布按钮
const customStyle = reactive({
  background: '#00cc33',
  color: '#FFF',
  marginTop: '15px',
  width: '100%'
})

//下拉菜单显示
const show = ref(false)

//打开分类菜单
const openSelect = () => {
  show.value = true;
}

//分类数据
const selectList = ref([])

//读取后端分类数据
const getSelectList = async () => {
  let res = await categoryApi()
  if (res && res.code == 200) {
    console.log(res)
    selectList.value = res.data;
  }
}

//生命周期函数
onReady(() => {
  //获取分类数据
  getSelectList()
})

//选择分类
const selectConfirm = (e) => {
  console.log(e)
  addModel.categoryName = e[0].label;
  addModel.categoryId = e[0].label;
}

//图片上传触发
const onchange = (res, index, lists, name) => {
  console.log(res.data)
  let result = JSON.parse(res.data)

//把返回的图片放在imgurl
  imgUrl.value.push(http.baseUrl + result.data)
  console.log(imgUrl.value)
//把数组里的图片转化为逗号分隔的字符串的一行数据
  let url = ''
  for (let k = 0; k < imgUrl.value.length; k++) {
    url = url + imgUrl.value[k] + ','
  }
  console.log(url)
//去掉末尾逗号
  addModel.image = url.substring(0, url.lastIndexOf(','))
}

//删除图片
const onRemove = (index) => {
  //删除图片
  imgUrl.value.splice(index, 1)
  let url = ''
  for (let k = 0; k < imgUrl.value.length; k++) {
    url = url + imgUrl.value[k] + ','
  }
  //去除末尾逗号
  addModel.image = url.substring(0, url.lastIndexOf(','))
}
</script>

<style>

</style>
