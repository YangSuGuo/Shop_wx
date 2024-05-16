import http from '../common/http.js'
//发布页面商品分类
export const categoryApi = (parm)=>{
    return http.get('/api/category/getSelectList',parm)
}