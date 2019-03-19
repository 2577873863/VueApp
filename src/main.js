// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //路由
import VuePreview from 'vue-preview';//图片查看器
Vue.use(VuePreview);

import Axios from 'axios' //axos
Vue.prototype.$axios = Axios;
//配置拦截器和响应器 loading图标
Axios.interceptors.request.use(config=>{
  MentUI.Indicator.open({
    text:'玩儿命加载中……',
    spinnerType:'fading-circle'
  });
  return config;
});
Axios.interceptors.response.use(response=>{
  MentUI.Indicator.close();
  return response;
});
import numModule from '@/modules/numModule'; //引入vuex文件
//vuex
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  modules:{
    numModule:numModule
  }
})

import './assets/css/global.css'; //全局样式
//引入mint-ui
import MentUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//安装插件干两件事
// 1.注册全局组件
// 2.挂载到Vue的属性上面
Vue.use(MentUI);
//引入组件
import MyUl from './components/Common/MyUl';
import MyLi from './components/Common/MyLi';
import NavBar from './components/Common/NavBar';
import Comment from './components/Common/Comment';
Vue.component('my-ul',MyUl);
Vue.component('my-li',MyLi);
Vue.component('nav-bar',NavBar);
Vue.component('comment',Comment);

Vue.config.productionTip = false;
/* 配置公共的URL */
Axios.defaults.baseURL = 'http://www.sinya.online/api/'

import Moent from 'moment';
Moent.locale('zh-cn'); //时间

//全局过滤器 convertTime
Vue.filter('convertTime',function (data,formatStr) {
  return Moent(data).format(formatStr);
});
//全局过滤波器---转化行对时间
Vue.filter('relativeTime',function (data) {
  return Moent(data).fromNow();
});
//字符串长度
Vue.filter('convertStr',function (data,count) {
  return data.substr(0,count) + '...';
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
