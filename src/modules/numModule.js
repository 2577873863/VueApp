import GoodsTools from '../goodstools';
export default {
	state:{
		num: GoodsTools.getTotalCount(),
	},
	getters:{
		getNum(state){
			return state.num;
		}
	},
	mutations: {
		addNum(state,plyLoad){
			state.num += plyLoad;
		},
		reduceNum(state,plyLoad){
			state.num -= plyLoad;
		}
	}
}