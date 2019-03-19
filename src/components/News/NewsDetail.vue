<template>
  <div>
    <nav-bar title="新闻详情"></nav-bar>
    <p></p>
    <div class="content">
      <h2>{{detailData.title}}</h2>
      <div class="timeSource">
        <span>{{detailData.ptime}} &nbsp;&nbsp;&nbsp; {{detailData.source}}</span>
      </div>
      <img v-lazy="detailData.picInfo && detailData.picInfo[0].url" alt="">
      <p>{{detailData.digest}}</p>
    </div>
  </div>
</template>

<script>
    export default {
       data(){
         return {
            detailData:{}
         }
       },
      created(){
        let idx = this.$route.params.id;
        if(idx === undefined){
          return false;
        }
        this.$axios.get('https://www.apiopen.top/journalismApi').then( res=>{
          this.detailData = res.data.data.war[idx];
        }).catch( err=> console.log('请求失败'+err));
      }
    };
</script>

<style scoped>
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  p{
    margin-bottom: 0;
  }
  .content{
    padding-top:40px;
  }
  .content h3 {
    color:#404040;
  }
  .timeSource{
    font-size: 14px;
    color:#888888;
  }
  img{
    margin-top:10px;
    width: 100%;
  }
</style>
