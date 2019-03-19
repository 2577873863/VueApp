<template>
    <div>
      <nav-bar title="商品评论"></nav-bar>
      <div class="tmp1">
        <input class="inp1" type="text" v-model="comVal">
        <mt-button size="large" @click="sendComment" type="primary">发表评论</mt-button>
        <div class="info">
          <span>评论列表</span>
          <span>44条评论</span>
        </div>
        <ul>
          <li v-for="(msg,index) in mesgs" :key="index">
            <span>{{msg.user_name}}</span>：<span>{{msg.content}}</span>
            <span class="timeContent">{{msg.add_time | relativeTime}}</span>
          </li>
        </ul>
        <mt-button @click="loadMore(id,true)" size="large" plain type="danger">加载更多</mt-button>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          id:null,
          mesgs:[],
          comVal:'',
          pageindex:1,//评论页数
        }
      },
      methods:{
        sendComment(){
          if(this.comVal.trim() === ''){
            return this.$toast('评论不能为空啊');
          }
          this.id = this.$route.params.id;
          this.$axios.post(`postcomment/${this.id}`,'content='+this.comVal).then(res=>{
            this.comVal = '';
            this.pageindex = 1;
            this.loadMore(this.id);
          }).catch(err=>console.log('发表评论失败',err));
        },
        loadMore(id,isBool){
          this.$axios.get(`getcomments/${id}?pageindex=${this.pageindex}`).then(res=>{
            if(isBool){
              if(res.data.message.length === 0){
                this.$toast('没有评论了');
                return;
              }
              this.mesgs = this.mesgs.concat(res.data.message);
            }else{
              this.mesgs = res.data.message;
            }
            this.pageindex++;
          }).catch(err=>console.log('商品评论异常',err.message));
        }
      },
      created(){
        this.id = this.$route.params.id;
        this.loadMore(this.id,false);
      }
    };
</script>

<style scoped>
  .tmp1{
    padding-top:50px;
    margin-bottom: 55px;
  }
  .inp1{
    display: block;
    box-sizing: border-box;
    padding:3px 7px;
    height:40px;
    font-size: 20px;
    width:100%;
  }
  ul{
    padding: 0;
    margin: 0;
  }
  li{
    list-style: none;
  }
  .info{
    margin:5px 0 5px;
    display: flex;
    justify-content: space-between;
    color:dodgerblue;
  }
  .timeContent{
    float: right;
  }
</style>
