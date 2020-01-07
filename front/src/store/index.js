import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    home: true,
    uploads: false,
    mailconfig: false
  },
  mutations: {
    changeActive(state, activeName = "nothing") {
      state.active = {
        home: false,
        uploads: false,
        mailconfig: false
      };
      if (activeName != "nothing") state.active[activeName] = true;
      console.log(state.active);
    }
  },
  actions: {},
  modules: {}
});
