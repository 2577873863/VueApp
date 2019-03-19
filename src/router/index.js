import Vue from 'vue';
import Router from 'vue-router';  
//路由懒加载写法
const Home =()=>import('@/components/Home/Home.vue');
const Member =()=>import('@/components/Member/Member.vue');
const Search =()=>import('@/components/Search/Search.vue');
const Shopcart =()=>import('@/components/Shopcart/Shopcart.vue');
const NewsList =()=>import('@/components/News/NewsList');
const NewsDetail =()=>import('@/components/News/NewsDetail');
const PhotoList =()=>import('@/components/Photo/PhotoList');
const PhotoDetail =()=>import('@/components/Photo/PhotoDetail');
const GoodsList =()=>import('@/components/Goods/GoodsList');
const GoodsDetail =()=>import('@/components/Goods/GoodsDetail');
const GoodsPhotoInfo =()=>import('@/components/Goods/GoodsPhotoInfo');
const GoodsComment =()=>import('@/components/Goods/GoodsComment');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Home'
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Shopcart',
      name: 'Shopcart',
      component: Shopcart
    },
    {
      path: '/News/List',
      name: 'NewsList',
      component:NewsList
    },
    {
      path:'/News/Detail',
      name:'NewsDetail',
      component:NewsDetail
    },
    {
      path:'/Photo/List/:typeId',
      name:'PhotoList',
      component:PhotoList
    },
    {
      path:'/Photo/Detail/:typeId/:id',
      name:'PhotoDetail',
      component:PhotoDetail
    },
    {
      path:'/Goods/List',
      name:'GoodsList',
      component:GoodsList
    },
    {
      path:'/Goods/Detail/:id',
      name:'GoodsDetail',
      component:GoodsDetail
    },
    {
      path:'/Goods/Photo/Info',
      name:'GoodsPhotoInfo',
      //可以复用NewsDetail组件
      component:GoodsPhotoInfo
      // component:NewsDetail
    },
    {
      path:'/Goods/Comment/:id',
      name:'GoodsComment',
      component:GoodsComment
    }
  ]
})
