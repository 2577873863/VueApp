<template>
  <div class="top">
    <span class="goback" @click="goback"> < </span>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
    export default {
      props:['title'],
      methods:{
        goback(){
          this.$router.go(-1);
        }
      }
    };
</script>

<style scoped>
  .top{
    width: 100%;
    height:30px;
    position: fixed;
    padding:10px 5px;
    background: #fafafa;
    text-align: center;
    font-size:20px;
  }
  .goback{
    position: absolute;
    /*float: left;*/
    top:10px;
    left: 5px;
  }
</style>
