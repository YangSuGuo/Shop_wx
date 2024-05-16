import http from '../common/http.js'
//发布页面商品分类
export const categoryApi = (parm)=>{
    return http.get('/api/v1/category/getSelectList',parm)
}
//发布页面发布商品
export  const releaseApi = (parm)=>{
    return http.post('/api/v1/goods/release',parm)
}