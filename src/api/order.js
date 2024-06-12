import http from '../common/http.js'

export const getUsedListApi = (parm)=>{
	return http.post('/api/v1/goods/getUsedList',parm)
}

export const getBuyListApi = (parm)=>{
	return http.post('/api/v1/goods/getBuyList',parm)
}