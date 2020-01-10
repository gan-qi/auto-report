import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  state: {
    home: true,
    uploads: false,
    mailconfig: false
  },
  getters,
  mutations: {
    changeActive(state, activeName = "nothing") {
      state.active = {
        home: false,
        uploads: false,
        mailconfig: false
      };
      if (activeName != "nothing") state.active[activeName] = true;
    }
  }
});

export default store;
