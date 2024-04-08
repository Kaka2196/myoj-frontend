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

const router = useRouter();
const store = useStore();

router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    console.log(store.state.user);
    if (store.state.user.loginUser?.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>
