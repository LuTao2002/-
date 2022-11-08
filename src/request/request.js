import axios from 'axios'

const instance  = axios.create({
    baseURL: 'http://kumanxuan1.f3322.net:8001',
    timeout: 5000
})

// 拦截器
instance.interceptors.request.use(config => { // config 本次请求信息
    // 什么时候执行？   发起请求前执行
    // 可以判断用户是否登录，如果没有登录，直接 return ，请求就不会发出去
    console.log('config', config) // 本次请求的一些信息
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(res => {
    // 什么时候执行？   在接收响应前，在执行then前
    console.log('res', res) // 本次服务器响应的一些信息
    return res // 返回的这个 res 被 then 方法的 res 形参接受了
}, err => {
    return Promise.reject(err)
})

export default instance