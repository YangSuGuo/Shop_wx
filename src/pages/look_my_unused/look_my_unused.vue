<template>
  <view class="u-wrap u-p-1-20 u-p-r-20">
    <u-form ref="form1" :model="addModel">
      <u-form-item label="类型:" prop="name" >
		  <span>闲置</span>
      </u-form-item>
      <u-form-item label="名称" prop="goodsName">
        <u-input v-model="addModel.goodsName" disabled placeholder="请输入名称"/>
      </u-form-item>
      <u-form-item label="简介" prop="goodsDesc">
        <u-input v-model="addModel.goodsDesc" disabled placeholder="请输入简介"/>
      </u-form-item>
      <u-form-item label="价格" prop="goodsPrice">
        <u-input v-model="addModel.goodsPrice" disabled placeholder="请输入价格"/>
      </u-form-item>
      <u-form-item label="联系人" label-width="auto" prop="userName">
        <u-input v-model="addModel.userName" disabled placeholder="请输入联系人"/>
      </u-form-item>
      <u-form-item label="联系电话" label-width="auto" prop="phone">
        <u-input v-model="addModel.phone" disabled placeholder="请输入联系电话"/>
      </u-form-item>
      <u-form-item label="微信号:" label-width="auto" prop="wxNum">
        <u-input v-model="addModel.wxNum" disabled placeholder="请输入微信号"></u-input>
      </u-form-item>
      <u-form-item label="联系地址:" label-width="auto" prop="address">
        <u-input disabled v-model="addModel.address"></u-input>
      </u-form-item>
      <!-- <u-form-item label="图片:" prop="image"></u-form-item> -->
      <u-upload ref="imgRef" :file-list="fileList" :deletable="false"></u-upload>
    </u-form>
  </view>
</template>

<script setup>
// import {reactive, ref} from 'vue';
import {getMyGoodsListApi, upanddownpi,deleteApi} from '../../api/goods.js';
import UFormItem from "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue";
import UInput from "../../uni_modules/vk-uview-ui/components/u-input/u-input.vue";
//引入后端api
import {categoryApi, releaseApi} from "../../api/goods.js";
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


//存储图片路径
const imgUrl = ref([])

// 发布按钮
const value = ref('')
const fileList = ref([])
const customStyle = reactive({
  background: '#00cc33',
  color: '#FFF',
  marginTop: '15px',
  width: '100%'
})

//分类数据
const cageId = ref('')
const selectList = ref([])
const getSelectList = async () => {
	let res = await categoryApi()
	if(res && res.code == 200){
		console.log(res)
		selectList.value = res.data;
		//设置分类
		if(cageId.value){
			for(let k=0;k<selectList.value.length;k++){
				if(selectList.value[k].value == cageId.value){
					addModel.categoryName = selectList.VALUE[K].label;
				}
			}
		}
	}
}


//生命周期函数
  onReady(() => {
    //设置表单验证规则
    imagef.value.lists = fileList.value
    //获取分类数据
    getSelectList()
  })


onLoad((options) => {
	imaUrl.value = [];
	fileList.value = [];
  const goods = JSON.parse(options.goods)
  cageId.value = goods.categoryId;
  //回显数据
 addModel.goodsId = goods.goodsId;
 addModel.categoryId = goods.categoryId;
 addModel.image = goods.image;
 //图片回显
  if (goods.image) {
    let imgs = goods.image.split(",")
	for(let g=0;g<imgs.length;g++){
		imgUrl.value.push(imgs[g]);
		let obj = {url:''}
		obj.url = imgs[g]
		fileList.value.push(obj)
	}
  }
  addModel.goodsName = goods.goodsName;
  addModel.goodsDesc = goods.goodsDesc;
  addModel.address = goods.address;
  addModel.goodsPrice = goods.goodsPrice;
  addModel.userName = goods.userName;
  addModel.phone = goods.phone;
  addModel.type = goods.type;
  addModel.wxNum = goods.wxNum;
  })
  //上下架
  const upanddownBtn = async (item) =>{
	  console.log(item)
	  let ret = await upannddownpi({
		  goodsId: item.goodsId,
		  status: item.status == '1' ?' 0' : '1'
	  })
	  if (res && res.code == 200){
		  list.value = []
		  parm.currentPage = 1;
		  getMyUnusedList()
	  }
  }
</script>

<style>

</style>
