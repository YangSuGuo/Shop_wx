import http from '../common/http.js'

//发布页面商品分类
export const categoryApi = (parm) => {
    return http.get('/api/v1/category/getSelectList', parm)
}
//发布页面发布商品
export const releaseApi = (parm) => {
    return http.post('/api/v1/goods/release', parm)
}
//查询所有分类
export const getCateListApi = () => {
    return http.get('/api/v1/goods/getCateList')
}
//查询闲置商品列表
export const getUsedListApi = (parm) => {
    return http.get('/api/v1/goods/getUsedList', parm)
}
//查询求购商品列表
export const getBuyListApi = (parm) => {
    return http.get('/api/v1/goods/getBuyList', parm)
}
//查询求购商品
export const getWantedListApi = (parm) => {
    return http.get('/api/v1/goods/wanted/list', parm)
}
//我的商品列表
export const getMyGoodsListApi = (parm) => {
    return http.get('/api/v1/goods/getMyGoodsList', parm)
}
//修改发布后的商品信息
export const editApi = (parm) => {
    return http.get('/api/v1/goods/edit', parm)
}
