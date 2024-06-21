<template>
	<view class="u-wrap u-p-l-20 u-p-r-20">
		<u-form label-width="auto" :model="addModel" ref="form1">
			<u-form-item label="昵称:" prop="nickName">
				<u-input v-model="addModel.nickName"></u-input>
			</u-form-item>
			<u-form-item label="姓名:" prop="name">
				<u-input v-model="addModel.name"></u-input>
			</u-form-item>
			<u-form-item label="电话:" prop="phone">
				<u-input v-model="addModel.phone"></u-input>
			</u-form-item>
			<u-form-item label="图片:" prop="picture"></u-form-item>
				<u-upload max-count="1" @on-remove="onRemove" @on-change="onChange" ref="imgRef" :file-list="fileList" :action="action"></u-upload>
		</u-form>
		<u-button @click="commit" type="success">确认修改</u-button>
	</view>
</template>

<script>
	import {
		ref,
		reactive
	} from 'vue';
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';
	import {
		editInfoApi
	} from '../../api/user.js'
	
	import http from '../../common/http.js'
	
	
	const imgRef = ref()
	const addModel = reactive({
		userId: uni.getStorageSync("userId"),
		nickName:'',
		name:'',
		phone:'',
		picture:''
	})
	
	const fileList = ref([])
	//存储图片路径
	const imgUrl = ref([])
	const action = ref(http.baseUrl + "/api/upload/uploadImage")
	//图片上传触发
	const onchange = (res, index, lists, name) => {
	  console.log(res.data)
	  let result = JSON.parse(res.data)
	
	//把返回的图片放在imgurl
	  imgUrl.value.push(http.baseUrl + result.data)
	//把数组里的图片转化为逗号分隔的字符串的一行数据
	  let url = ''
	  for (let k = 0; k < imgUrl.value.length; k++) {
	    url = url + imgUrl.value[k] + ','
	  }

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
	
	//表单对象
	const form1 = ref('')
	//表单验证
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
	  }],
	  picture: [{
	    required: true,
	    message: "请上传头像",
	    trigger: ['change'],
		type: 'number',
	  }]
	})
	//表单提交
	const commit =() =>{
		form1.value.validate(async (valid) =>{
			if (valid) {
				let res = await editInfoApi(addModel)
				if( ref && res.code == 200) {
					关闭网页
					uni.navigateBack({
						delta:1
					})
				}
			}
		})
	}
	
	
	
	
	
	onReady(()=>{
		form1.value.setRules(rules);
		imgRef.value.lists = fileList.value
	})
	onLoad((options)=>{
		console.log("-------")
		console.log(options)
		const userInfo = JSON.parse(options.userInfo)
		addModel.name = userInfo.username;
		addModel.nickName = userInfo.nickName
		addModel.PHONE = userInfo.phone
		addModel.picture = userInfo.picture
		//头像回显
		if(userInfo.picture) {
			let imgs = userInfo.picture.solit(",");
			for (let g = 0; g < imgs.length; g++){
				imgUrl.value.push(imgs[g]);
				let obj ={
					url: ''
				}
				obj.url = imgs[g]
				fileList.value.push(obj)
			}
		}
	})
</script>

<style>

</style>
