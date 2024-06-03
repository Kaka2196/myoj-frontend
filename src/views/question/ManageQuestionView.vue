<template>
  <div id="manageQuestionView">
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
    >
      <template #operate="{ record }">
        <a-space>
          <a-button status="success" @click="doUpdate(record)">修改</a-button>
          <a-popconfirm
            content="确定删除此题目?"
            type="warning"
            @ok="doDelete(record)"
          >
            <a-button status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { MyAxios } from "@/plugins/axios";
import { useRouter } from "vue-router";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  current: 1,
  pageSize: 10,
});

onMounted(() => {
  loadData();
});
/**
 * 加载数据
 */
const loadData = async () => {
  await MyAxios.post("/question/list/page", searchParams.value).then((res) => {
    if (res.data.code === 0) {
      dataList.value = res.data.data.records;
      console.log(dataList.value[2].judgeCase);
      formatData();
      console.log(dataList.value[2].judgeCase);
      total.value = res.data.data.total;
    } else {
      message.error("加载失败：" + res.data.message);
    }
  });
};
const router = useRouter();

const formatData = () => {
  for (let i = 0; i < total.value; i++) {
    if (dataList.value[i].tags) {
      dataList.value[i].tags = JSON.parse(dataList.value[i].tags as any);
    }
    if (dataList.value[i].judgeCase) {
      dataList.value[i].judgeCase = JSON.parse(
        dataList.value[i].judgeCase as any
      );
    }
    if (dataList.value[i].judgeConfig) {
      dataList.value[i].judgeConfig = JSON.parse(
        dataList.value[i].judgeConfig as any
      );
    }
  }
};
/**
 * 更新题目
 * @param record
 */
const doUpdate = (record: any) => {
  router.push({
    path: "/update/question",
    query: {
      id: record.id,
    },
  });
};

/**
 * 删除当前题目
 * @param record
 */
const doDelete = async (record: any) => {
  const deleteParams = ref({ id: record.id });
  await MyAxios.post("/question/delete", deleteParams.value).then((res) => {
    if (res.data.code === 0) {
      message.success("删除成功");
      loadData();
    } else {
      message.error("删除失败: " + res.data.message);
    }
  });
};
const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptNum",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "UserId",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    slotName: "operate",
  },
];
</script>

<style scoped>
#manageQuestionView {
}
</style>
