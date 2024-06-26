import http from '../http/http.js'
//注册
export const registerApi = (parm) => {
    return http.post('/api/v1/wxUser/register', parm)
}
//登录
export const loginApi = (parm) => {
    return http.post('/api/v1/wxUser/login', parm)
}
//修改个人信息
export const editInfoApi = (parm) => {
    return http.post('/api/v1/wxUser/editInfo', parm)
}
//查询个人信息
export const getInfoApi = (parm) => {
    return http.get('/api/v1/wxUser/getInfo', parm)
}
//修改密码
export const getWxUpdatePasswordApi = (parm) => {
    return http.post('/api/v1/wxUser/wxUpdatePassword', parm)
}
