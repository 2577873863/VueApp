<template>
    <div>
      <nav-bar title="商品图文介绍"></nav-bar>
      <div class="tmp">
        <h2 class="title">{{info.title}}</h2>
        <div class="timeSource">
          <span>点击数：{{info.click}}</span>
          <span>时间：{{info.add_time|convertTime('YYYY-MM-DD')}}</span>
        </div>
        <div class="content">
          <span v-html="info.content"></span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          info:{},
        }
      },
      created(){
        let id = this.$route.query.id;
        console.log(id);
        this.$axios.get('getnew/' + id).then(res=>{
          // console.log(res.data);
          this.info = res.data.message[0];
        }).catch(err=>console.log('商品图文详情异常',err));
      }
    };
</script>

<style scoped>
  .tmp{
    padding:50px 5px 0;
    margin-bottom:55px;
  }
  .title{
    color:#1e1abe;
  }
  .timeSource{
    display: flex;
    justify-content: space-between;
  }
  .content{
    width:100%;
    overflow: hidden;
  }
</style>
