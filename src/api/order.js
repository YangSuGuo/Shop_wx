import http from '../http/http.js'

//查询所有分类
export const getCateListApi = () => {
    return http.get('/api/v1/goods/getCateList')
}

//提交交易
export const replaceOrderApi = (parm) => {
    return http.post('/api/v1/goodsOrder/replaceOrder', parm)
}

//查询我的出售订单
export const getSellOrderApi = (parm) => {
    return http.get('/api/v1/goodsOrder/getSellOrder', parm)
}

//查询我的求购订单
export const getMyOrderApi= (parm) => {
    return http.get('/api/v1/goodsOrder/getMyOrder', parm)
}

// todo 我的收藏
export const getApi = (parm) => {
    return http.post('/api/v1/', parm)
}

//删除订单
export const deleteOrderApi = (parm) => {
    return http.post('/api/v1/goodsOrder/deleteOrder', parm)
}
