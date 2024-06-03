import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import store from "@/store/index";
// state 存储的用户信息(如用户信息)
// getters
// mutations 定义了对变量进行增删改查的方法
// actions 执行异步操作，并且触发mutation的更改

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "点击登录",
    },
  }),
  actions: {
    //获取用户信息
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
        // console.log("res.data", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
