<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import NoAuthView from "@/views/NoAuthView.vue";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写这
 */
const doInit = () => {
  console.log("hello world");
};

onMounted(() => {
  doInit();
});
//权限管理
// router.beforeEach((to, from, next) => {
//   if (to.meta?.access === "canAdmin") {
//     console.log(store.state.user);
//     if (store.state.user.loginUser?.role !== "admin") {
//       next("/noAuth");
//       return;
//     }
//   }
//   next();
// });
</script>
