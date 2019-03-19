<template>
    <div>
      <nav-bar title="新闻列表"></nav-bar>
      <ul>
        <li v-for="(item,index) in newsList" :key="index" @click="newsDetail(index)">
          <div class="img">
            <img v-lazy="item.picInfo[0].url" alt="">
          </div>
          <div class="content">
            <span class="title">{{item.title}}</span>
            <div class="info">
              <span class="source">来源：{{item.source}}</span>
              <span class="addTime">发表时间：{{item.ptime | convertTime('YYYY-MM-DD')}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          newsList:[],
        }
      },
      created:function () {
          this.$axios.get('https://www.apiopen.top/journalismApi').then( res=>{
          this.newsList = res.data.data.war;
        }).catch( err=>{
          alert('请求失败');
          console.log(err.message);
        })
      },
      methods:{
        newsDetail(idx){
          this.$router.push({
            name:'NewsDetail',
            params:{ id: idx }
          })
        }
      }
    };
</script>

<style scoped>
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  ul{
    list-style: none;
    padding:55px 0 0;
    margin-bottom:55px;
  }
  li{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  li img{
    width:70px;
    height: 70px;
  }
  .content{
    margin-left:3px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .info{
    display: flex;
    margin-top:20px;
    justify-content: space-around;
  }
  .source, .addTime {
    font-size:14px;
  }
</style>
