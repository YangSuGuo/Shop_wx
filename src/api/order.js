import http from '../common/http.js'

//查询所有分类
export const getCateListApi = () => {
    return http.get('/api/v1/goods/getCateList')
}

//提交交易
export const replaceOrderApi = (parm) => {
    return http.post('/api/v1/goodsOrder/replaceOrder',parm)
}

//查询我的出售订单
export const getSellOrderApi = (parm) => {
    return http.post('/api/v1/goodsOrder/getSellOrder',parm)
}

//查询我的订单
// /getMyGoodsList
// parm 商品类型：0闲置 1求购
export const getMyOrderApi = (parm) => {
    return http.post('/api/v1/goodsOrder/replaceOrder',parm)
}

//删除
export const deleteOrderApi = (parm) => {
    return http.post('/api/v1/goodsOrder/deleteOrder',parm)
}
