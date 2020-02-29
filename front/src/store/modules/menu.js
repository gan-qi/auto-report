const state = {
  home: true,
  uploads: false,
  mailconfig: false
};

const mutations = {
  changeActive(state, activeName = "nothing") {
    state.active = {
      home: false,
      uploads: false,
      mailconfig: false
    };
    if (activeName !== "nothing") state.active[activeName] = true;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
