<template>
  <div>
    <mt-header fixed title="我是头部" ref="appHeader"></mt-header>
    <transition name="routerView" mode="out-in">
      <router-view :componentName="$refs"/>
    </transition>
    <mt-tabbar fixed v-model="selected" ref="appFooter">
      <mt-tab-item id="Home" @click.native="changeTabber">
        <img slot="icon" src="./assets/home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="Member" @click.native="changeTabber">
        <img slot="icon" src="./assets/vip.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="Shopcart" @click.native="changeTabber">
        <img slot="icon" src="./assets/shopcart.png">
        购物车
        <mt-badge type="error" size="small">{{num}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="Search" @click.native="changeTabber">
        <img slot="icon" src="./assets/search.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>

export default {
  data () {
    return {
      selected:document.cookie.split(";")[1].split("=")[1], //获取cookie
      // selected:'Home',
    };
  },
  computed:{
    num:function(){
      return this.$store.getters.getNum //监听vuex的改变
    }
  },
  methods:{
    changeTabber(){
      this.$router.push({
        name: this.selected
      });

      document.cookie = 'checkedId='+ this.selected;
    }
  },
  beforeCreate(){
    document.cookie = 'checkedId=Home';
  },
  created:function () {
    //添加购物车小球
  
    window.addEventListener('hashchange',()=>{  //解决url更改tabber选中bug
      let urls = location.hash.substr(2);
      this.selected = urls;
    })
  }
};
</script>
<style>
  body{
    margin :40px 0 0;
  }
  
  .routerView-enter-active, .routerView-leave-active {
      transition: opacity 0.6s;
  }
  .routerView-enter, .routerView-leave-to{
    opacity: 0;
  }
</style>
