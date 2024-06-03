<template>
  <div id="addQuestionView">
    <h2 v-if="updatePage">修改题目</h2>
    <h2 v-else>创建题目</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="题目标题">
        <a-input
          style="max-width: 480px"
          v-model="form.title"
          placeholder="请输入题目标题"
        />
      </a-form-item>
      <a-form-item field="tags" label="题目标签">
        <a-input-tag
          v-model="form.tags"
          style="max-width: 480px"
          placeholder="请输入标签(回车确认)"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item label="内存限制">
            <a-input-number
              mode="button"
              min="0"
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制(kb)"
            />
          </a-form-item>
          <a-form-item label="时间限制">
            <a-input-number
              min="0"
              mode="button"
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制(ms)"
            />
          </a-form-item>
          <a-form-item label="堆栈限制">
            <a-input-number
              min="0"
              mode="button"
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制(kb)"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        v-for="(judgeCase, index) of form.judgeCase"
        :field="`judgeCase[${index}]`"
        :label="`用例 ${index + 1}`"
        :key="index"
      >
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item label="用例输入">
            <a-input v-model="judgeCase.input" placeholder="输入" />
          </a-form-item>
          <a-form-item label="用例输出">
            <a-input v-model="judgeCase.output" placeholder="输出" />
          </a-form-item>
        </a-space>

        <a-button
          status="danger"
          @click="handleDelete(index)"
          :style="{ marginLeft: '10px' }"
          >删除
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button status="success" @click="handleAdd()">添加用例</a-button>
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MDEditor :value="form.content" @change="handleContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="标准答案">
        <MDEditor :value="form.answer" @change="handleAnswerChange" />
      </a-form-item>

      <a-form-item>
        <a-button @click="handleSubmit" type="primary" html-type="submit"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import MDEditor from "@/components/MDEditor.vue";
import { ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { MyAxios } from "@/plugins/axios";
import { useRoute } from "vue-router";

const form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: "",
    stackLimit: "",
    timeLimit: "",
  },
  tags: [],
  title: "",
});

const route = useRoute();
//如果地址包含update，视为更新页面
const updatePage = route.path.includes("update");

const loadData = () => {
  MyAxios.get("/question/get?id=" + route.query.id).then((res) => {
    if (res.data.code === 0) {
      form.value = res.data.data;
      if (form.value.tags) {
        form.value.tags = JSON.parse(form.value.tags as any);
      }
      if (!form.value.judgeCase) {
        form.value.judgeCase = [
          {
            input: "",
            output: "",
          },
        ];
      } else {
        form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
      }
      if (!form.value.judgeConfig) {
        form.value.judgeConfig = {
          memoryLimit: "",
          timeLimit: "",
          stackLimit: "",
        };
      } else {
        form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
      }
    } else {
      message.error("加载失败:" + res.data.message);
    }
  });
};
if (updatePage) {
  loadData();
}
/**
 * 修改题目
 */
const updateQuestion = () => {
  MyAxios.post("/question/update", form.value).then((res) => {
    if (res.data.code === 0) {
      message.success("修改题目成功！");
    } else {
      message.error("修改题目失败," + res.data.message);
    }
  });
};
/**
 * 创建题目
 */
const addQuestion = () => {
  // const res = QuestionControllerService.addQuestionUsingPost(data.values);
  MyAxios.post("/question/add", form.value).then((res) => {
    if (res.data.code === 0) {
      message.success("创建题目成功！");
    } else {
      message.error("创建题目失败," + res.data.message);
    }
  });
};
/**
 * 提交
 */
const handleSubmit = () => {
  if (updatePage) {
    updateQuestion();
  } else {
    addQuestion();
  }
};
const handleDelete = (index: any) => {
  form.value.judgeCase.splice(index, 1);
};
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleAnswerChange = (v: string) => {
  form.value.answer = v;
};
const handleContentChange = (v: string) => {
  form.value.content = v;
};
</script>

<style scoped>
#addQuestionView {
  padding-top: 32px;
  padding-left: 120px;
}
</style>
