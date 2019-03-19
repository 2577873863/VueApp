<template>
    <div>
      <nav-bar style="z-index: 2;" title="商品详情"></nav-bar>
      <div class="tmp1">
        <mt-swipe class="swiper1" :auto="4000">
          <mt-swipe-item v-for="item in imgs" :key="item.id">
            <img class="swiper-img" :src="item.url" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <div class="info-div">
          <span class="title">{{info.title}}</span>
          <hr>
          <div class="price">
            市场价：<span class="market-price">￥{{info.market_price}}</span>
            销售价：<span class="sell-price">￥{{info.sell_price}}</span>
          </div>
          <div>购买数量:
            <span class="buyNum">
              <span class="removeNum" @click="subtract">-</span>
              <span class="Num">{{num}}</span>
              <span class="addNum" @click="add">+</span>
            </span>
          </div>
          <div class="buyBtn">
            <mt-button size="small" type="primary">立即购买</mt-button>

            <transition name="ball" @after-enter="afterEnter">
              <div class="ball" v-if="isExist"></div>
            </transition>

            <mt-button size="small" @click="insertBall" type="danger">加入购物车</mt-button>
          </div>
          <hr>
          <span class="shopArg">商品参数：{{info.id}}</span>
          <span class="shopArg">商品货号：{{info.goods_no}}</span>
          <span class="shopArg">库存清空：{{info.stock_quantity}} 件</span>
          <span class="shopArg">上架时间：{{info.add_time | convertTime('YYYY-MM-DD')}}</span>
          <hr>
          <mt-button class="infoBtns" @click="goPhotoInfo" plain type="primary">图文介绍</mt-button>
          <mt-button class="infoBtns" plain type="danger" @click="goComment">商品评论</mt-button>
        </div>
      </div>
    </div>
</template>

<script>
    import GoodsTools from '../../goodstools';

    export default {
      data(){
        return {
          id:'',
          info:{},
          num:1,
          isExist:false,
          imgs:[
            {id:1,
            url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3145917429,2614409654&fm=26&gp=0.jpg'
            },
            {
              id:2,
              url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3850508610,3930590534&fm=26&gp=0.jpg'
            },
            {
              id:3,
              url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=257959490,3924490417&fm=26&gp=0.jpg'
            }
          ]
        }
      },
      methods:{
        goPhotoInfo(){
          this.$router.push({
            name:'GoodsPhotoInfo',
            query:{ id:this.info.id }
          })
        },
        goComment(){
          this.$router.push({
            name:'GoodsComment',
            params:{ id:this.info.id }
          })
        },
        subtract(){
          if(this.num <= 1) return;
          this.num--;
        },
        add(){
          if(this.num >= this.info.stock_quantity) return;
          this.num++;
        },
        insertBall(){
          this.isExist = true;
        },
        afterEnter(){
          this.isExist = false;
          this.$store.commit('addNum',this.num);  //通知app.vue改变->更改vuex的状态

          //添加本地缓存
          GoodsTools.addGoodsList({
            id:this.info.id,
            num:this.num
          });
        }
      },
      created(){
        this.id = this.$route.params.id;
        this.$axios.get('getthumimages/' + this.id).then(res=>{  //请求轮播图
          //console.log(res.data.message); //图片404先用死数据
          // this.imgs = res.data.message;
        }).catch(err=>console.log('商品详情轮播异常',err));
        this.$axios.get('goods/getinfo/' + this.id).then(res=>{ //请求详情信息
          this.info = res.data.message[0];
        }).catch(err=>console.log('商品详情信息异常',err));
      }
    };
</script>

<style scoped>
  .tmp1{
    padding-top:50px;
    margin-bottom: 55px;
  }
  .swiper1{
    width:100%;
    height:200px;
  }
  .swiper-img{
    width:100%;
    height:200px;
  }
  .info-div{
    padding:0px 5px;
  }
  .title{
    display: block;
    margin:5px 0;
    color:#1e1abe;
    font-size: 20px;
    font-weight: 800;
  }
  .price{
    margin:5px 0;
  }
  .market-price{
    text-decoration:line-through;
    margin-right: 20px;
  }
  .sell-price{
    color:red;
    font-size:20px;
    font-weight:bold;
  }
  .buyNum{
    text-align: center;
  }
  .addNum,.removeNum{
    padding:0 5px;
    border:1px solid black;
  }
  .Num{
    padding:0 10px;
    border:1px solid black;
  }
  .buyBtn{
    margin-top:7px;
    position: relative;
  }
  .shopArg{
    display: block;
    margin:5px 0;
  }
  .infoBtns{
    width:100%;
  }
  .ball{
    position: absolute;
    z-index: 1000;
    top:-15px;
    left: 100px;
    background: #f44336;
    width:20px;
    height:20px;
    border-radius: 50%;
  }
  /*小球动画*/
  .ball-enter-active{
    animation: bounce-in 1s linear;
  }
  .ball-leave{
    /*不加这一行会闪一下，因为这个时间点的透明度默认是1*/
    opacity: 0;
  }
  @keyframes bounce-in {
    /*后期改*/
    0% {
      transform: translate3d(0,0,0);
    }
    50% {
      transform: translate3d(140px,-30px,0px);
    }
    75% {
      transform: translate3d(160px,10px,0);
    }
    100% {
      transform: translate3d(140px,300px,0);
    }
  }
</style>
