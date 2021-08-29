<template>
  <XTable empty-text="暂无联系人信息数据" :data="props.data" :columns="columnsInfo">
    <template #methods>
      <el-button size="mini" type="primary">表单下载</el-button>
    </template>
  </XTable>
</template>

<script lang="ts" setup>
import { XTable } from '@/components/xTable';
import type { Columns } from '@/components/xTable/interface';
import { defineProps } from 'vue';

export interface ConfigInfo {
  id: string;
  gameName: string;
  api: string;
  key: string;
  wechatAppId: string;
  appSecret: string;
  xmlogAppId: string;
  channelId: string;
}

const props = defineProps<{
  data: ConfigInfo[];
}>();

const columnsInfo: Columns<ConfigInfo> = [
  {
    prop: 'id',
    label: '游戏Id',
  },
  {
    prop: 'gameName',
    label: '游戏名称',
  },
  {
    prop: 'api',
    label: 'Api',
  },
  {
    prop: 'key',
    label: 'Key',
  },
  {
    prop: 'wechatAppId',
    label: '微信AppId',
  },
  {
    prop: 'appSecret',
    label: 'AppSecret',
  },
  {
    prop: 'xmlogAppId',
    label: 'XMlogAppId',
  },
  {
    prop: 'channelId',
    label: 'ChannelId',
  },
  {
    extraCol: true,
    id: 'methods',
    label: '操作',
  },
];
</script>
