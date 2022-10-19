import Vue from 'vue'
import Vuex from 'vuex'
import ListsModule from "@/store/Modules/ListsModule";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    lists: ListsModule,
  }
})
