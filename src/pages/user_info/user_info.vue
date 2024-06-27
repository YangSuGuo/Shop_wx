<template>
  <view class="Login">
    <view class="container">
      <image class="imgBanner"
             src="https://img.picui.cn/free/2024/06/22/6676780da7a10.png"/>

      <view class="registerFrom">
        <u-form ref="form1" :error-type="['border-bottom']" :model="addModel" class="form">
          <u-form-item class="input" prop="nickName">
            <u-input v-model="addModel.nickName" clearable placeholder="昵称"
                     prefixIconStyle="font-size: 22px;color: #909399"/>
          </u-form-item>
          <u-form-item class="input" prop="name">
            <u-input v-model="addModel.name" clearable placeholder="姓名"
                     prefixIconStyle="font-size: 22px;color: #909399"/>
          </u-form-item>
          <u-form-item class="input" prop="phone">
            <u-input v-model="addModel.phone" clearable placeholder="电话" prefixIconStyle="font-size: 22px;color: #909399"/>
          </u-form-item>
          <u-form-item label="头像:" class="input" prop="picture"/>
          <u-upload ref="imgRef" :action="action"
                    :file-list="fileList" max-count="1" @on-remove="onRemove"
                    @on-change="onChange"/>

          <view style="margin-top: 40rpx"/>
          <u-button style="width: 90%" type="primary" @click="commit">确认修改</u-button>
        </u-form>
      </view>
    </view>
  </view>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {onLoad, onReady} from '@dcloudio/uni-app';
import {editInfoApi} from '../../api/user.js'

import http from '../../http/http.js'

const addModel = reactive({
  userId: uni.getStorageSync("userId"),
  nickName: '',
  name: '',
  phone: '',
  picture: ''
})

//图片上传触发
const imgRef = ref()
const fileList = ref([])
const imgUrl = ref([])
const action = ref(http.baseUrl + "/api/upload/uploadImage")
const onChange = (res, index, lists, name) => {
  console.log(res.data)
  let result = JSON.parse(res.data)
  imgUrl.value.push(http.baseUrl + result.data)
  let url = ''
  for (let k = 0; k < imgUrl.value.length; k++) {
    url = url + imgUrl.value[k] + ','
  }
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

//表单提交
const form1 = ref('')
const rules = reactive({
  nickName: [{
    required: true,
    message: "请输入昵称",
    trigger: ['change']
  }],
  name: [{
    required: true,
    message: "请填写名称",
    trigger: ['change']
  }],
  phone: [{
    required: true,
    message: "请填写电话",
    trigger: ['change']
  }]
})
const commit = () => {
  form1.value.validate(async (valid) => {
    if (valid) {
      let res = await editInfoApi(addModel)
      if (ref && res.code == 200) {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  })
}

onReady(() => {
  form1.value.setRules(rules);
  imgRef.value.lists = fileList.value
})

onLoad((options) => {
  console.log("-------")
  console.log(options)
  const userInfo = JSON.parse(options.userInfo)
  addModel.name = userInfo.username;
  addModel.nickName = userInfo.nickName
  addModel.PHONE = userInfo.phone
  addModel.picture = userInfo.picture
  //头像回显
  if (userInfo.picture) {
    let imgs = userInfo.picture.solit(",");
    for (let g = 0; g < imgs.length; g++) {
      imgUrl.value.push(imgs[g]);
      let obj = {
        url: ''
      }
      obj.url = imgs[g]
      fileList.value.push(obj)
    }
  }
})

</script>

<style scoped>
.Login {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

.container {
  width: 95%;
  margin-top: 80rpx;
  background: #FFF;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.imgBanner {
  width: 100%;
  height: 250rpx;
  border-radius: 20rpx;
  background: #FFF;
}

.registerFrom {
  padding: 40rpx;
}

.form {
  width: 100%;
  background-color: #FFF;
}

.input {
  width: 100%;
  padding: 20rpx 0;
}
</style>
