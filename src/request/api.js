import request from '@/request/request'

// 首页数据的请求
export const GetHomeList = () => request.get('/index/index')