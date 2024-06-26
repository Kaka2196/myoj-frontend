import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

//权限管理
router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息:", store.state.user.loginUser);
  const loginUser = store.state.user.loginUser;
  // 如果没登录，自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 需要跳转的页面必须登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没登录，跳转登录页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //登陆后权限不足，跳转无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
