<template>
    <div class="tpm1">
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
      <mt-button @click="loadMore(pageid)" size="large" plain type="danger">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          comVal:'',
          mesgs : [],
          pageid : 1
        }
      },
      created(){
        this.loadMore(this.pageid);
      },
      methods:{
        loadMore(pageid){
          this.$axios.get(`getcomments/37?pageindex=${this.pageid}`).then(res=>{
            if(pageid){  //如果传值就拼接不传值就替换
              this.mesgs = this.mesgs.concat(res.data.message);
            }else{
              this.mesgs = res.data.message;
            }
            this.pageid++;
          }).catch(err=>console.log('评论获取失败',err));
        },
        sendComment(){
          if(this.comVal.trim() === ''){
            return this.$toast('评论不能为空');
          }
          this.$axios.post('postcomment/37','content='+this.comVal).then(res=>{
            this.comVal = '';
            this.pageid = 1;
            this.loadMore();
          }).catch(err=>console.log('发表评论失败',err))
        }
      }
    };
</script>

<style scoped>
  .tpm1{
    margin-bottom:55px;
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
