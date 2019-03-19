<template>
    <div>
      <nav-bar title="图文分享"></nav-bar>
      <div class="content">
        <ul class="typeTabs">
          <li v-for="(tItem,index) in PhotoTypes" :key="index">
            <router-link class="typeTab" :to="{name:'PhotoList',params:{typeId:tItem.typeId}}">{{tItem.title}}</router-link>
          </li>
        </ul>
        <ul class="detailUl">
          <li v-for="(item, index) in PhotoLists" :key="index" @click="nextTo(index)">
              <img class="bgImg" v-if='item.picInfo[0]&&item.picInfo[0].url' v-lazy="item.picInfo[0].url" alt="">
              <h2 class="title">{{item.title}}</h2>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      PhotoLists: [],
      PhotoTypes:[
        {title:'推荐',typeId:'auto'},
        {title:'头条',typeId:'toutiao'}
      ]
    }
  },
  created() {
    let typeId = this.$route.params.typeId;
    this.loadImgs(typeId);
    //获取类别列表----无后台暂时四数据
    // this.$axios.get('getImgLists').then( res=>{
    //    console.log(res.data);
    // }).catch( err=>console.log('分类请求异常',err));
  },
  //https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#全局守卫
  beforeRouteUpdate (to, from, next) {
    // 路由重用，只有参数变化（params||query），重新渲染组件是使用次函数
    this.loadImgs(to.params.typeId);
    next();
  },
  methods:{
    loadImgs(typeId){
      this.$axios.get('https://www.apiopen.top/journalismApi').then( res=>{
        this.PhotoLists = res.data.data[typeId];
        //检测图片
        this.PhotoLists.map(item=>{
          if(!(item.picInfo[0]&&item.picInfo[0].url)){
            this.$toast({
              message:'部分图片丢失，程序员正在加班更改……',
              duration:2500
            });
          }
        })
      }).catch( err=> console.log('图文请求错误',err.message));
    },
    nextTo(index){
      this.$router.push({
        name:'PhotoDetail',
        params:{typeId:this.$route.params.typeId, id:index}
      })
    }
  }
};
</script>

<style scoped>
  ul{
    margin:0;
    padding:0;
    list-style: none;
  }
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .content{
    padding-top:50px;
  }
  .title{
    color:white;
    text-shadow:black 0px 0px 20px;
  }
  .detailUl{
    margin: 0 0 55px;
  }
  .detailUl li{
    width:100%;
    height:200px;
    margin-bottom:5px;
  }
  .bgImg{
    z-index: -1;
    width:100%;
    height:200px;
    position: absolute;
  }
  .typeTabs{
    display: flex;
    justify-content: center;
  }
  .typeTabs li{
    padding:5px 10px;
    border-radius: 4%;
    background:#e6e6e6;
    margin:0 40px -10px;
  }
  .typeTab{
    color:black;
    text-decoration: none;
  }
</style>
