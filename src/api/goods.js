import http from '../common/http.js'
//发布页面商品分类
export const categoryApi = (parm)=>{
    return http.get('/api/v1/category/getSelectList',parm)
}
//发布页面发布商品
export  const releaseApi = (parm)=>{
    return http.post('/api/v1/goods/release',parm)
}
//查询所有分类
export const getCateListApi =()=>{
	return http.get('/api/v1/goods/getCateList')
}
//查询闲置商品列表
export const getUsedListApi = (parm)=>{
	return http.get('/api/v1/goods/getUsedList',parm)
}
//查询求购商品列表
export const getBuyListApi = (parm)=>{
	return http.get('/api/goods/getBuyList',parm)
}