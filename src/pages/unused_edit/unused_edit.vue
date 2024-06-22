<template>
  <view class="u-wrap u-p-1-20 u-p-r-20">
    <u-form ref="form1" :model="addModel">
      <u-form-item label="类型:" label-width="
150rpx" prop="name">
        <u-radio-group v-model="addModel.name">
          <u-radio v-for="(item, index) in list" :key="index" :disabled="item.disabled" :name="item.name"
                   activeColor="#00cc33"
                   @change="radioChange">
            {{ item.name }}
          </u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item label="名称" prop="goodsName">
        <u-input v-model="addModel.goodsName" placeholder="请输入名称"/>
      </u-form-item>
      <u-form-item label="简介" prop="goodsDesc">
        <u-input v-model="addModel.introduce" placeholder="请输入简介"/>
      </u-form-item>
      <u-form-item label="价格" prop="goodsPrice">
        <u-input v-model="addModel.price" placeholder="请输入价格"/>
      </u-form-item>
      <u-form-item label="联系人" label-width="auto" prop="userName">
        <u-input v-model="addModel.userName" placeholder="请输入联系人"/>
      </u-form-item>
      <u-form-item label="联系电话" label-width="auto" prop="phone">
        <u-input v-model="addModel.phone" placeholder="请输入联系电话"/>
      </u-form-item>
      <u-form-item label="微信号:" label-width="auto" prop="wxNum">
        <u-input v-model="addModel.wxNum" placeholder="请输入微信号"></u-input>
      </u-form-item>
      <u-form-item label="联系地址:" label-width="auto" prop="address">
        <u-input v-model="addModel.address"></u-input>
      </u-form-item>
      <u-form-item label="图片:" prop="image"></u-form-item>
      <u-upload ref="imgRef" :action="action" @on-remove="onRemove" @on-change="onchange"></u-upload>
    </u-form>
    <u-button :custom-style="customStyle" @click="commit">确认修改</u-button>
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
    value: '0',
    name: '闲置',
    disabled: false
  },
  {
    value: '1',
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
//分类

//分类数据
const cageId = ref('')
const selectList = ref([])
const getSelectList = async () => {
  let res = await categoryApi()
  if (res && res.code == 200) {
    console.log(res)
    selectList.value = res.data;
    //设置分类
    if (cageId.value) {
      for (let k = 0; k < selectList.value.length; k++) {
        if (selectList.value[k].value == cageId.value) {
          addModel.categoryName = selectList.VALUE[K].label;
        }
      }
    }
  }
}


//读取后端分类数据
// const getSelectList = async () => {
//   let res = await categoryApi()
//   if (res && res.code == 200) {
//     console.log(res)
//     selectList.value = res.data;
//   }
// }

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

//闲置 求购类型选择
const radioChange = (e) => {
  console.log(e)
  for (let i = 0; i < list.length; i++) {
    if (list[i].name == e) {
      addModel.type = list[i].value;
    }
  }
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
    trigger: ['change', 'blur'],
    type: 'number',
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
    console.log(addModel)
    if (valid) {
      let res = await editApi(addModel)
      if (res && res.code == 200) {
        console.log(res)
        uni.navigateTo({
          url: '../my_unused/my_unused'
        })

        //清空数据
        form1.value.resetField();
        imgUrl.value = [];
        addModel.image = '';
        fileList.value = []
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
    for (let g = 0; g < imgs.length; g++) {
      imgUrl.value.push(imgs[g]);
      let obj = {url: ''}
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
//回显商品类型
  for (let i = 0; i < list.length; i++) {
    if (list[i].value == goods.type) {
      addModel.name = list[i].name;
    }
  }
})

</script>

<style>

</style>
