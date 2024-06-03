<template>
  <div class="home">
    <MDEditor :value="MDValue" :handle-change="MDOnChange" />
    <CodeEditor :value="CodeValue" :handle-change="CodeOnChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MDEditor from "@/components/MDEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const MDValue = ref("");
const CodeValue = ref("");
const MDOnChange = (v: string) => {
  MDValue.value = v;
  console.log(v);
};
const CodeOnChange = (v: string) => {
  CodeValue.value = v;
  console.log(v);
};
</script>
