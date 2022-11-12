import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => {})
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      isShowTabBar: true
    },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/home/searchpopup',
        name: 'SearchPopup',
        component: () => import('@/views/SearchPopup.vue')
      }
    ]
  },
  {
    path: '/topic',
    name: 'Topic',
    meta: {
      isShowTabBar: true
    },
    component: () => import('@/views/Topic.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta: {
      isShowTabBar: true
    },
    component: () => import('@/views/Category.vue'),
    children: [
      {
        path: '/category/searchpopup',
        name: 'SearchPopup2',
        component: () => import('@/views/SearchPopup.vue')
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {
      isShowTabBar: true
    },
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      isShowTabBar: true
    },
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      isShowTabBar: true
    },
    component: () => import('@/views/User.vue')
  },
  {
    path: '/productDetail',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue')
  },
  {
    path: '/channel',
    name: 'Channel',
    component: () => import('@/views/Channel.vue')
  },
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('@/views/Brand.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截，路由守卫
router.beforeEach((to, from, next) => {
  // console.log('to', to) // 要去的路由对象
  // console.log('from', from) // 出发的路由对象

  let token = localStorage.getItem('token')
  if (to.path === '/cart') { // 去往购物车页面
    // 判断是否登录。判断 token 是否存在
    if (token) {
      next()
    } else {
       Vue.prototype.$toast('请先登录')
       setTimeout(() => {
         next('/user') // 跳转的 user 路由
       }, 1000)
    }
  }

  next() // 可以顺利通往要去的路由，如果不写无法访问对应的路由
})

export default router
