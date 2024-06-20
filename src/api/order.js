import http from '../common/http.js'

export const getUsedListApi = (parm) => {
    return http.post('/api/v1/goods/getUsedList', parm)
}

export const getBuyListApi = (parm) => {
    return http.post('/api/v1/goods/getBuyList', parm)
}
//查询所有分类
export const getCateListApi = () => {
    return http.get('/api/v1/goods/getCateList')
}
//提交交易
export const replaceOrderApi = (parm) => {
    return http.post('/api/v1/goods/replaceOrder')
}
//查询我的求购订单
export const getMyOrderApi = (parm) => {
    return http.post('/api/v1/goods/replaceOrder')
}
//查询我的出售订单
export const getSellOrderApi = (parm) => {
    return http.post('/api/v1/goods/replaceOrder')
}
//删除
export const deleteOrderApi = (parm) => {
    return http.post('/api/v1/goods/deleteOrder')
}
