<template>
  <view class="u-wrap u-p-1-20 u-p-r-20">
    <view class="content">
      <image class="imgBanner"
             src="https://img.picui.cn/free/2024/06/21/6675809ef1f73.png"/>
      <view style="padding: 20rpx">
        <u-form ref="form1" :model="addModel">
          <u-form-item label-width="150rpx" prop="name">
            <u-subsection v-model="addModel.type" :list="list" />
          </u-form-item>
          <u-form-item prop="goodsName">
            <u-input v-model="addModel.goodsName" clearable placeholder="请输入名称" prefixIconStyle="font-size: 22px;color: #909399"
                     trim/>
          </u-form-item>

          <u-form-item prop="categoryName">
            <u-input v-model="addModel.categoryName"  placeholder="请选择分类"  @click="openSelect"/>
            <u-select @confirm="selectConfirm" v-model="show" :list="selectList"></u-select>

          </u-form-item>
          <u-form-item prop="goodsDesc">
            <u-input v-model="addModel.goodsDesc" clearable placeholder="请输入简介" prefixIconStyle="font-size: 22px;color: #909399"
                     trim/>
          </u-form-item>
          <u-form-item prop="goodsPrice">
            <u-input v-model="addModel.goodsPrice" clearable maxlength=8 placeholder="请输入价格" prefixIconStyle="font-size: 22px;color: #909399"
                     trim/>
          </u-form-item>
          <u-form-item label-width="auto" prop="userName">
            <u-input v-model="addModel.userName" clearable placeholder="请输入联系人" prefixIconStyle="font-size: 22px;color: #909399"
                     trim/>
          </u-form-item>
          <u-form-item label-width="auto" prop="phone">
            <u-input v-model="addModel.phone" clearable maxlength=11 placeholder="请输入联系电话" prefixIconStyle="font-size: 22px;color: #909399"
                     trim/>
          </u-form-item>
          <u-form-item label-width="auto" prop="wxNum">
            <u-input v-model="addModel.wxNum" clearable placeholder="请输入微信号" prefixIconStyle="font-size: 22px;color: #909399"
                     trim/>
          </u-form-item>
          <u-form-item label-width="auto" prop="address">
            <u-input v-model="addModel.address" clearable placeholder="请输入联系地址" prefixIconStyle="font-size: 22px;color: #909399"
                     trim/>
          </u-form-item>
          <u-form-item prop="image"/>
          <u-upload ref="imgRef" :action="action" @on-remove="onRemove" @on-change="onchange"/>
        </u-form>
        <u-button :custom-style="customStyle" @click="commit">发布</u-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import {reactive, ref} from 'vue';
import UFormItem from "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.vue";
import UInput from "../../uni_modules/vk-uview-ui/components/u-input/u-input.vue";
import {categoryApi, releaseApi} from "../../api/goods.js";
import {onReady} from "@dcloudio/uni-app";
import http from '../../http/http.js'
import USelect from "../../uni_modules/vk-uview-ui/components/u-select/u-select.vue";

// 表单数据
const addModel = reactive({
  userId: uni.getStorageSync('userId'),
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

// 创建一个函数来清空addModel中的数据
function clearAddModel() {
  addModel.type = '';
  addModel.goodsName = '';
  addModel.categoryId = '';
  addModel.categoryName = '';
  addModel.goodsDesc = '';
  addModel.goodsPrice = '';
  addModel.userName = '';
  addModel.phone = '';
  addModel.wxNum = '';
  addModel.image = '';
  addModel.address = '';
}

// 发布类型
const list = [
  {
    value: '0',
    name: '闲置'
  },
  {
    value: '1',
    name: '求购'
  }
]

//图片上传路径
const action = ref(http.baseUrl + "/api/v1/upload/uploadImage")

//存储图片路径
const imgUrl = ref([])

// 发布按钮
const customStyle = reactive({
  background: '#00cc33',
  color: '#FFF',
  marginTop: '15px',
  width: '100%'
})

//下拉菜单显示
const show = ref(false)
const openSelect = () => {
  console.log(1)
  show.value = true;
}

//分类数据
const selectList = ref([])
const getSelectList = async () => {
  let res = await categoryApi()
  if (res && res.code === 200) {
    console.log(res)
    selectList.value = res.data;
  }
}

function selectConfirm  (e)  {
  console.log(e)
  addModel.categoryName = e[0].label;
  addModel.categoryId = e[0].value;
}

//生命周期函数
onReady(() => {
  //获取分类数据
  getSelectList()
})

//图片上传
const onchange = (res, index, lists, name) => {
  console.log(res.data)
  let result = JSON.parse(res.data)
  imgUrl.value.push(http.baseUrl + result.data)
  console.log(imgUrl.value)
  let url = ''
  for (let k = 0; k < imgUrl.value.length; k++) {
    url = url + imgUrl.value[k] + ','
  }
  console.log(url)
  addModel.image = url.substring(0, url.lastIndexOf(','))
}

//删除图片
const onRemove = (index) => {
  imgUrl.value.splice(index, 1)
  let url = ''
  for (let k = 0; k < imgUrl.value.length; k++) {
    url = url + imgUrl.value[k] + ','
  }
  addModel.image = url.substring(0, url.lastIndexOf(','))
}

//获取表单
const form1 = ref()
const imgRef = ref()

//表单验证规则
const rules = reactive({
  name: [{
    required: true,
    message: "请选择类型",
    trigger: ['change', 'blur']
  }],
  goodsName: [{
    required: true,
    message: "请填写名称",
    trigger: ['change', 'blur']
  }],
  goodsDesc: [{
    required: true,
    message: "请填写描述",
    trigger: ['change', 'blur']
  }],
  goodsPrice: [{
    required: true,
    message: "请选择价格",
    trigger: ['change', 'blur']
  }],
  userName: [{
    required: true,
    message: "请选择姓名",
    trigger: ['change', 'blur']
  }],
  phone: [{
    required: true,
    message: "请选择电话",
    trigger: ['change', 'blur']
  }],
  wxNum: [{
    required: true,
    message: "请填写微信号",
    trigger: ['change', 'blur']
  }],
  address: [{
    required: true,
    message: "请填写发布/求购地址",
    trigger: ['change', 'blur']
  }],
})

//提交表单
const commit = () => {
  form1.value.validate(async (valid) => {
    if (valid) {
      let res = await releaseApi(addModel)
      if (res && res.code === 200) {
        uni.showToast({
          title: '发布成功',
          duration: 2000,
        })
        //如果发布的是闲置商品，发布成功后跳转到闲置页面
        if (addModel.type == '0') {
          uni.switchTab({
            url: '../unused/unused'
          })
        } else {
          //如果发布的是求购商品。发布成功后跳转到求购页面
          uni.switchTab({
            url: '../buy/buy'
          })
        }

        // 清空数据
        clearAddModel();
        imgUrl.value = [];
        addModel.image = '';
        imgRef.value.clear();

      }
    }
  })

//生命周期函数
  onReady(() => {
    //设置表单验证规则
    form1.value.setRules(rules);
    //获取分类数据
    getSelectList()
  })
}
</script>

<style scoped>
.content {
  padding: 40rpx;
}

.imgBanner {
  width: 100%;
  height: 250rpx;
  border-radius: 20rpx;
  background: #FFF;
}
</style>
