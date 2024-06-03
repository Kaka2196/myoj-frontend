<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        theme="light"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/acm.png" alt="MYOJ logo" />
            <div class="title">MYOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px" @click="loginSubmit" style="margin-right: 40px">
      <a-dropdown trigger="hover">
        <a-button>{{ my }}</a-button>
        <template #content>
          <a-doption>个人主页</a-doption>
          <a-doption @click="loginOut">注销</a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const route = useRoute();
const selectedKeys = ref(["/"]);
const store = useStore();
const my = ref(store.state.user?.loginUser?.userName);

// console.log(store.state);
//过滤后展示的路由菜单
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hide) {
      return false;
    }
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

router.afterEach((to) => {
  my.value = store.state.user?.loginUser?.userName;
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
  // console.log(key);
};
const loginSubmit = () => {
  if (my.value === "点击登录") {
    router.push({
      path: "./user/login",
    });
  } else {
    //todo 跳转个人主页
  }
};
const loginOut = () => {
  if (my.value !== "点击登录") {
    UserControllerService.userLogoutUsingPost();
    message.success("注销成功！");
  }
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 12px;
  font-family: Papyrus, fantasy;
}

.logo {
  height: 48px;
}
</style>
