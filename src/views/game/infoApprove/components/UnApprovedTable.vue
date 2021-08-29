<template>
  <XTable empty-text="暂无待审批游戏" :data="props.data" :columns="columnsInfo">
    <template #methods>
      <el-button size="mini" type="primary">通过</el-button>
      <el-button size="mini" type="danger">拒绝</el-button>
    </template>
  </XTable>
</template>

<script lang="ts" setup>
import { XTable } from '@/components/xTable';
import type { Columns } from '@/components/xTable/interface';
import { defineProps } from 'vue';

export interface UnApprovedInfo {
  gameId: string;
  system: string;
  from: string;
  time: string;
  result: string;
  formDownload: string;
  apkDownload: string;
}

const props = defineProps<{
  data: UnApprovedInfo[];
}>();

const columnsInfo: Columns<UnApprovedInfo> = [
  {
    prop: 'gameId',
    label: '游戏ID',
  },
  {
    prop: 'system',
    label: '系统',
  },
  {
    prop: 'from',
    label: '来源',
  },
  {
    prop: 'time',
    label: '提交时间',
  },
  {
    prop: 'result',
    label: '审核结果',
  },
  {
    prop: 'formDownload',
    label: '表单下载',
  },
  {
    prop: 'apkDownload',
    label: 'APK下载',
  },
  {
    extraCol: true,
    id: 'methods',
    label: '操作',
  },
];
</script>
