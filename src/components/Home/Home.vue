<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(img,index) in imgs" :key="index">
        <img :src="img.img" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <my-ul>
      <my-li v-for="(item,index) in grid" :key="index">
        <router-link :to="item.routerName">
          <div :class="item.className"></div>
          <span>{{item.title}}</span>
        </router-link>
      </my-li>
    </my-ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: [ //轮播图
        {img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4118807252,2248836744&fm=26&gp=0.jpg'},
        {img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=16168286,2862246106&fm=26&gp=0.jpg'},
        {img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1173877709,255036325&fm=26&gp=0.jpg'}
      ],
      grid:[ //九宫格
        {title: '新闻资讯', className: 'news', routerName:{name:'NewsList'}},
        {title: '图文分享', className: 'shop' , routerName:{name:'PhotoList',params:{typeId:'auto'}}},
        {title: '商品展示', className: 'message', routerName:{name:'GoodsList', query:{id:1}}},
        {title: '留言反馈', className: 'photo' ,routerName:{name:'NewsList'}},
        {title: '搜索资讯', className: 'seek', routerName:{name:'NewsList'}},
        {title: '联系我们', className: 'contact', routerName:{name:'NewsList'}}
      ]
    }
  },
  // 请求轮播图
  // created(){
  //   this.$axios.get('http://localhost:3000',{
  //     header:{'Content-Type':'text/html;charset=UTF-8'},
  //     params:{name:'zzh',url:'www.baidu.com'}
  //   }).then(res=>{
  //     console.log(res);
  //     alert('请求成功');
  //   }).catch(err=>{
  //     alert('请求失败');
  //     console.log(err.message);
  //   })
  // }
};
</script>

<style scoped>
  .mint-swipe{
    height:200px;
  }
  img{
    width:100%;
  }
  /*九宫格样式*/
  a{
    color:black;
    text-decoration: none;
  }
  a div{
    width:40px;
    height:40px;
    margin:0 auto 3px;
  }
  .news{
    background:url("../../assets/news.png") round;
  }
  .message{
    background:url("../../assets/message.png") round;
  }
  .shop{
    background:url("../../assets/shop.png") round;
  }
  .seek{
    background:url("../../assets/seek.png") round;
  }
  .photo{
    background:url("../../assets/photo.png") round;
  }
  .contact{
    background:url("../../assets/contact.png") round;
  }
</style>
