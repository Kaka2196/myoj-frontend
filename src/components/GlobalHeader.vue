<template>
  <a-row id="globalHeader" align="center" style="margin-bottom: 16px">
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
        <a-menu-item v-for="item in routes" :key="item.path">
          <span v-if="item.name !== '无权限'">{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const selectedKeys = ref(["/"]);

router.afterEach((to) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
  console.log(key);
};

const store = useStore();
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "mememesdads",
    role: "admin",
  });
}, 3000);
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
