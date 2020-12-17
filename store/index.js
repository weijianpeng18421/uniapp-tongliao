import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import getters from './getters.js'
import patrol from "./modules/patrol";
Vue.use(Vuex)
const store  = new Vuex.Store({
	modules:{
		user,
		patrol
	},
	state: {},
	mutations: {},
	actions: {},
	getters
})
export default store
