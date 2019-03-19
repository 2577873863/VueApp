<template>
    <div>
      <nav-bar style="z-index:10;" title="商品列表"></nav-bar>
      <div class="tmp1" :style="{ height : boxHeight + 'px' }"> <!--注意px-->
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" id="1" ref="loadmore1" :bottom-all-loaded="isLoaded">
          <ul>
            <li class="lis" v-for="item in goods" :key="item.id">
              <router-link :to="{name:'GoodsDetail',params:{id:item.id}}">
              <div class="goods">
                <!--接口图片地址失效-->
                <!-- <img class="bgImg" :src="item.img_url" alt=""> -->
                <img class="bgImg" src="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=ee323c6c71cf3bc7e855c5eae1309699/3801213fb80e7becdddcc3802e2eb9389b506b49.jpg" alt="">
                <span> {{item.title | convertStr(25) }} </span>
              </div>
              <div class="info">
                <span class="sell-price">￥{{item.sell_price}}</span>
                <span class="market-price">￥{{item.market_price}}</span>
                <div class="info2">
                  <span>热卖中</span>
                  <span>剩{{item.stock_quantity}}件</span>
                </div>
              </div>
              </router-link>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
</template>

<script>
    export default {
      props:['componentName'],
      data(){
        return {
          goods:[],
          pageNum: 1,
          isLoaded:false, //数据是否全部加载完
          boxHeight:0,
        }
      },
      beforeRouteUpdate(to,from,next){
        this.pageNum = to.query.id;
        this.firstLoad();
        next();
      },
      methods:{
        loadTop(){
          console.log('loadTap触发');
          this.$refs.loadmore1.onTopLoaded();
        },
        loadBottom(){
          this.$axios.get('getgoods?pageindex='+this.pageNum).then(res=>{
            if(res.data.message.length === 0){
              this.$toast('没有更多数据了……');
              this.isLoaded = true;
            }
            this.goods = this.goods.concat(res.data.message);
            this.pageNum++;
          }).catch(err=>console.log('加载失败',err));
          this.$refs.loadmore1.onBottomLoaded();
        },
        firstLoad(){
          this.$axios.get('getgoods?pageindex='+this.pageNum).then(res=>{
            this.goods = res.data.message;
            this.pageNum++;
          }).catch(err=>console.log('商品列表错误',err));
        }
      },
      created(){
        this.pageNum = this.$route.query.id;
        this.firstLoad();
      },
      mounted(){
        //this.componentName.appHeader是组件，需要加$el
        // console.log(document.body.clientHeight);  //无效
        // console.log(document.documentElement.clientHeight);
        // let windowHeight = document.documentElement.clientHeight;
        let headerHeight = this.componentName.appHeader.$el.offsetHeight;
        let footerHeight = this.componentName.appFooter.$el.offsetHeight;
        this.boxHeight = document.documentElement.clientHeight - headerHeight - footerHeight - 50;
      }
    };
</script>
<style scoped>
  a{
    color:black;
    text-decoration: none;
  }
  .tmp1{
    padding-top:50px;
    margin-bottom: 55px;
    overflow-y: scroll;
  }
  .goods{
    position: relative;
  }
  .bgImg{
    width:100%;
    height: 200px;
  }
  .lis{
    display: inline-block;
    width:49%;
    height:100px;
    margin:0px 1px;
  }
  .info{
    background:lightgray;
  }
  .sell-price{
    color:red;
    font-size: 17px;
  }
  .market-price{
    text-decoration:line-through;   /*删除线*/
  }
  .info2{
    display: flex;
    justify-content: space-between;
  }
</style>
