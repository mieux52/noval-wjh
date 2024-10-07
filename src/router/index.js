import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },


  {
    // 阅读记录
    path: '/Readrecord',
    name: 'Readrecord',
    component: () => import('../views/ReadrecordView.vue')
  },
  {
    // 分类
    path: '/classify',
    name: 'classify',
    component: () => import('../views/classifyView.vue')
  },
  {
    // 排行
    path: '/Ranking',
    name: 'Ranking',
    component: () => import('../views/RankingView.vue')
  },
  {
    //内容
    path: '/Boy_topic_detail',
    name: 'Boy_topic_detail',
    component: () => import('../views/Boy_topic_detailView.vue')
  },

  // {
  //   // 专题
  //   path: '/subject',
  //   name: 'subject',
  //   component: () => import('../views/subjectView.vue')
  // },
  {
    // 专题内容
    path: '/special',
    name: 'special',
    component: () => import('../views/specialView.vue')
  },
  {
    // 登录logon
    path: '/logon',
    name: 'logon',
    component: () => import('../views/logonView.vue')
  },
  {
    // 用户中心
    path: '/user',
    name: 'user',
    component: () => import('../views/userView.vue'),
    // 独享路由守卫 
    beforeEnter:(to, from, next)=>{
      // 获取登录信息 判断是否登录
      let cookie = window.localStorage.getItem("userdata");
      if(cookie){
        next();
      }else{
        next("/logon")
        return;
      }
    },
  },
  {
    // 搜索页
    path: '/search',
    name: 'search',
    component: () => import('../views/searchView.vue')
  },
  {
    // 我的书架
    path: '/mybook',
    name: 'mybook',
    component: () => import('../views/mybookView.vue')
  },
  {
    // 详情页
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detailView.vue')
  },
  {
    // 详情页s
    path: '/details',
    name: 'details',
    component: () => import('../views/detailsView.vue')
  },
  {
    // 详情->章节目录
    path: '/catalogue',
    name: 'catalogue',
    component: () => import('../views/catalogueView.vue')
  },
  {
    // 阅读页
    path: '/read',
    name: 'read',
    component: () => import('../views/readView.vue')
  },
  {
    // 阅读页s
    path: '/reads',
    name: 'reads',
    component: () => import('../views/readsView.vue')
  },
  {
    // 评论
    path: '/comment',
    name: 'comment',
    component: () => import('../views/commentView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
