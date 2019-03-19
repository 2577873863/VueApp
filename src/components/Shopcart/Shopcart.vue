<template>
  <div>
  	<nav-bar title="购物车"></nav-bar>
  	<div class="tmp1">
  		<ul>
  			<li v-for="(item,index) in msg" :key="item.id">
  				<mt-switch class="switch1" v-model="item.isSelected"></mt-switch>
  				<!-- <img class="img" :src="item.thumb_path" alt=""> -->
  				<img class="img" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3883199320,2426951732&fm=26&gp=0.jpg" alt="">
  				<div>
					<p class="title">{{item.title}}</p>
					<span>￥{{item.sell_price}}</span>
					<span class="operating-area">
						<span @click="addNum(item)">+</span>
						<span>{{item.num}}</span>
						<span @click="subtractNum(item)">-</span>
					</span>
					<span class="remove" @click="remove(index)">删除</span>
  				</div>
  			</li>
  		</ul>
  		<div class="total">
  			<span>总计(不含运费)</span><br>
  			<span>已经选择商品 {{total.totalPieces}} 件，总价￥ {{total.totalPrice}} 元。  <mt-button type="danger" size="small">去结算</mt-button></span>
  		</div>
  	</div>
  </div>
</template>

<script>
import GoodsTools from '@/goodstools.js';

export default {
  data () {
    return {
      msg:[]
    }
  },
  computed:{
  	total(){
  		let totalPieces = 0;  //总件
  		let totalPrice = 0; //总价钱
  		this.msg.forEach(val=>{
  			if(val.isSelected){
  				totalPieces += val.num;
  				totalPrice += val.num * val.sell_price;
  			}
  		})
  		return {
  			totalPieces,totalPrice
  		}
  	}
  },
  beforeRouteLeave (to, from, next) {
    if(confirm('确定要离开此页面么')){
    	let obj = {};
    	this.msg.forEach(val=>{
    		obj[val.id] = val.num;
    	})
    	GoodsTools.saveGoodsList(obj);
    	next();
    }else{
    	next(false); //取消导航行为
    }
  },
  methods:{
  	remove(index){
  		this.msg.splice(index,1);
  	},
  	addNum(goods){
  		goods.num++;
      this.$store.commit('addNum',1); //改变vuex的状态
  	},
  	subtractNum(goods){
  		if(goods.num <= 0) return;
  		goods.num--;
      this.$store.commit('reduceNum',1);//改变vuex的状态
  	}
  },
  created(){
  	//获取本地储存的购物车信息
  	let goodsList = GoodsTools.getGoodsLsit();
  	//https://www.cnblogs.com/llcdxh/p/9476347.html
  	let ids = Object.keys(goodsList).join(',');
  	if(ids.length === 0){
  		return this.$toast('暂无数据');
  	};
  	this.$axios.get('goods/getshopcarlist/' + ids).then(res=>{
  		//解决方案1
  		res.data.message.forEach(val=>{
  			if(goodsList[val.id]){
  				val.num = goodsList[val.id];
  			}
  			val.isSelected = true;
  		}) //这样可以双向绑定。。。
  		this.msg = res.data.message;  
  		//res.data.message之后私自给数据添加属性无法双向绑定
  		// this.msg.forEach(val=>{
  		// 	val.num = 1;
  		// 	val.isSelected = false;
  		// }) //这样添加属性无法双项绑定

  		//解决方案2 ---->手动通知Vue
  		//res.data.message之后私自给数据添加属性无法双向绑定
  		// this.msg.forEach(val=>{
  			// if(goodsList[val.id]){
  			// 	val.num = goodsList[val.id];
  			// }
  		// 	this.$set(val,'num',1);
  		// 	this.$set(val,'isSelected',true);
  		// });

  	}).catch(err=>console.log('购物车异常',err));
  }

};
</script>

<style scoped>
	.total{
		padding:10px 0 10px 20px;
		background: #e6e6e6;
	}
	.tmp1{
		padding-top:50px;
		margin-bottom: 55px;
	}
	.switch1{
		display: inline-block;
		vertical-align: middle;
	}
	.img{
		vertical-align: middle;
		border:1px solid black;
		width:70px;
		height: 70px;
	}
	.title{
		margin:3px;
		font-size: 18px;
		color:blue;
	}
	.operating-area{
		margin:0 30px;
	}
	.operating-area span{
		padding:3px 7px;
		border:1px solid black;
	}
	li{
		padding-bottom: 5px;
		border-bottom: 1px solid gray;
	}
	.remove{
		color:blue;
	}
</style>
