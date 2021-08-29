<template>
  <XTable empty-text="暂无关联游戏数据" :data="props.data" :columns="columnsInfo">
    <template #methods>
      <el-button size="mini" type="primary">表单下载</el-button>
    </template>
  </XTable>
</template>

<script lang="ts" setup>
import { XTable } from '@/components/xTable';
import type { Columns } from '@/components/xTable/interface';
import { defineProps } from 'vue';

export interface ConnectGame {
  phone: string;
  company: string;
  game1: string;
  game1Android: string;
  game1IOS: string;
  game2: string;
  game2Android: string;
  game2IOS: string;
}

const props = defineProps<{
  data: ConnectGame[];
}>();

const columnsInfo: Columns<ConnectGame> = [
  {
    prop: 'phone',
    label: '手机号',
  },
  {
    prop: 'company',
    label: '企业名称',
  },
  {
    prop: 'game1',
    label: '游戏名称1',
  },
  {
    prop: 'game1Android',
    label: '游戏名称1安卓',
  },
  {
    prop: 'game1IOS',
    label: '游戏名称1苹果',
  },
  {
    prop: 'game2',
    label: '游戏名称2',
  },
  {
    prop: 'game2Android',
    label: '游戏名称2安卓',
  },
  {
    prop: 'game2IOS',
    label: '游戏名称2苹果',
  },
  {
    extraCol: true,
    label: '操作',
    id: 'methods',
  },
];
</script>
