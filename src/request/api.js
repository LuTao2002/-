import request from '@/request/request'

// 首页数据的请求
export const GetHomeList = () => request.get('/index/index')

// 获取搜索弹出款数据
export const GetSearchPopupData = () => request.get('/search/index')

// 获取实时搜索提示
export const GetSearchTipsListData = params => request({
    method: 'GET',
    url: '/search/helper',
    params
})

// 获取搜索结果
export const GetGoodsListData = params => request({
    method: 'GET',
    url: '/goods/list',
    params
})

// 清除历史记录
export const ClearHistory = () => request.post('/search/clearhistory')

// 登录请求
export const GoLogin = data => request({
    method: 'POST',
    url: '/auth/loginByWeb',
    data
})

// 获取商品详情
export const GetGoodsDetailData = params => request({
    method: 'GET',
    url: '/goods/detail',
    params
})

// 获取商品详情
export const GetGoodsDetailListData = params => request({
    method: 'GET',
    url: '/goods/related',
    params
})

// 获取商品详情
export const GetTopicData = params => request({
    method: 'GET',
    url: '/topic/list',
    params
})

// 获取分类数据
export const GetCategoryData = () => request({
    method: 'GET',
    url: '/catalog/index'
})

// 获取分类数据
export const GetCategoryCurrent = params => request({
    method: 'GET',
    url: '/catalog/current',
    params
})


// 首页点击获取分类数据
export const GetChannelDate = params => request({
    method: 'GET',
    url: '/goods/category',
    params
})

// 分类页面商品列表请求
export const GetChannelList = params => request({
    method: 'GET',
    url: '/goods/list',
    params
})

// 品牌详情
export const GetBrandData = params => request({
    method: 'GET',
    url: '/brand/detail',
    params
})

// 加入购物车
export const GetAddGoods = data => request({
    method: 'POST',
    url: '/cart/add',
    data
})

// 获取购物车数据
export const GetCartData = params => request({
    method: 'GET',
    url: '/cart/index',
    params
})

// 删除商品
export const GetDeleteCart = data => request({
    method: 'POST',
    url: '/cart/delete',
    data
})