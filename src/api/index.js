import http from '../http/http.js'

//推荐到首页商品查询
export const getIndexListApi = (parm) => {
    return http.get('/api/v1/goods/getIndexList', parm)
}


