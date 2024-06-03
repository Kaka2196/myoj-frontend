<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 30px">用户登录</h2>
    <a-form
      :model="form"
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" style="width: 100px" type="primary"
          >登录
        </a-button>
        <a-button
          style="width: 100px; margin-left: 20px"
          @click="registerSubmit"
          >注册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    // alert("登陆成功" + JSON.stringify(res.data));
    await store.dispatch("user/getLoginUser");
    message.success("登录成功!");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败" + res.message);
  }
  // alert(JSON.stringify(form));
};
const registerSubmit = () => {
  router.push({
    path: "./register",
  });
};
</script>
