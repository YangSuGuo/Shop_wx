import http from '../common/http.js'
//注册
export const registerApi = (parm)=>{
	return http.post('/api/v1/wxUser/register',parm)
}
//登录
export const loginApi = (parm)=>{
	return http.post('/api/v1/wxUser/login',parm)
}