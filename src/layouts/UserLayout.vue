<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"> MYOJ</a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/Kaka2196" style="color: black">Github</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#userLayout {
  text-align: center;
}

#userLayout .header {
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 28px;
}

#userLayout .content {
  //background-image: url("../assets/jianyue.png");
  background-attachment: fixed;
  background-size: cover;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

#userLayout .footer {
  //background-color: #b9b9b9;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
