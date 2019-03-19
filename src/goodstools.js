//https://www.cnblogs.com/st-leslie/p/5617130.html
//localstorage  get->获取   set->设置
let obj = {};

//获取商品
obj.getGoodsLsit = function () {
  return JSON.parse(window.localStorage.getItem('goodslist')||'{}');
};

//保存商品
obj.saveGoodsList = function (goodslist) {
  window.localStorage.setItem('goodslist',JSON.stringify(goodslist));
};

//新增商品
obj.addGoodsList = function (goods) {
  let goodslist = this.getGoodsLsit();
  if(goodslist[goods.id]){
    //之前有这个值就追加
    goodslist[goods.id] += goods.num;
  }else{
    //没有就直接赋值
    goodslist[goods.id] = goods.num;
  }
  //保存
  this.saveGoodsList(goodslist);
};

// 获取购物车的总数
obj.getTotalCount = function () {
  let goodslist = this.getGoodsLsit();
  //https://www.jianshu.com/p/02d940bee54c
  let arr = Object.values(goodslist);
  let sum = 0;
  arr.forEach(item => sum+=item);
  return sum;
};

export default obj;
