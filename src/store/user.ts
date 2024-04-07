import { StoreOptions } from "vuex";
// state 存储的用户信息(如用户信息)
// getters
// mutations 定义了对变量进行增删改查的方法
// actions 执行异步操作，并且触发mutation的更改

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      // todo 改为从远程请求获取登录信息
      commit("updateUser", { userName: payload.userName });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
