<template>
    <div>
      <div class="top">
        <span class="goback" @click="goback"> < </span>
        <span class="title">图文详情</span>
      </div>
      <div class="content">
        <h2>{{details.title}}</h2>
        <div class="info">
          <span>发表时间：{{details.ptime | convertTime('YYYY-MM-DD')}}</span>
          <span>来源：{{details.source}}</span>
        </div>
        <vue-preview :slides="previews"></vue-preview>
        <!--类似于v-html后面的模板在组件中的局部样式中无效，需要在全局配置-->


        <!--由于api原因评论页面不完善，有时间要完善一下，暂时只是做出来了功能-->
        <comment />
      </div>
    </div>
</template>

<script>
    //bug ----- 在头条点详情点击返回会的typeid会变成推荐……
    //解决：重写nav-bar返回的时候把当前的分类传过去(组件没有复用……)
    export default {
      data(){
        return {
          details:{},
          previews: []
        }
      },
      created(){
        let typeId = this.$route.params.typeId;
        let id = this.$route.params.id;
        this.$axios.get('https://www.apiopen.top/journalismApi').then(res=>{
          this.details = res.data.data[typeId][id];
          this.previews.push({
            src : this.details.picInfo[0] && this.details.picInfo[0].url,
            msrc :this.details.picInfo[0] && this.details.picInfo[0].url,
            w: 500,
            h: 300
          })
        }).catch(err=>console.log('图文详情页面异常',err.message));
      },
      methods:{
        goback(){
          let type = this.$route.params.typeId;
          this.$router.push({
            name:'PhotoList',
            params:{typeId:type}
          });
        }
      }
    };
</script>

<style scoped>
  .content{
    padding-top:50px;
    max-width: 100%;
  }
  .info{
    display: flex;
    justify-content: space-around;
  }
  .imgs{
    width:100%;
  }
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
    top:10px;
    left:5px;
  }
</style>
