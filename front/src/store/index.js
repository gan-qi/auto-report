import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: true,
    uploads: false,
    settings: false
  },
  mutations: {
    changeActive(state, activeName = "nothing") {
      state.active = {
        home: false,
        uploads: false,
        settings: false
      };
      if (activeName != "nothing") state.active[activeName] = true;
    }
  },
  actions: {},
  modules: {}
});