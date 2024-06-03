<template>
  <div
    id="code-editor"
    ref="domRef"
    style="min-height: 400px; min-width: 400px"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from "vue";
import * as monaco from "monaco-editor";
import { defineProps, withDefaults } from "vue/dist/vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const domRef = ref();
const codeEditor = ref();
onMounted(() => {
  if (!domRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(domRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    colorDecorators: true,
  });
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
