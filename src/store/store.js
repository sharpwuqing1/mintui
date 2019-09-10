import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state : {
	  count: 1
	},

	getters : {
	  count: state => state.count
	},

    actions : {
	  increment: ({ commit }) => {
	    commit('increment')
	  }
	},

    mutations : {
	  increment (state) {
	    state.count++
	  }
	} 

}) 