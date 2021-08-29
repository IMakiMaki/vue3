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

export interface ContactInfo {
  contact: string;
  phone: string;
  email: string;
  area: string;
  addDetail: string;
  wechat: string;
  qq: string;
  officialWeb: string;
  groupDesc: string;
  registerFrom: string;
}

const props = defineProps<{
  data: ContactInfo[];
}>();

const columnsInfo: Columns<ContactInfo> = [
  {
    prop: 'contact',
    label: '联系人',
  },
  {
    prop: 'contact',
    label: '联系人手机',
  },
  {
    prop: 'email',
    label: '联系人邮箱',
  },
  {
    prop: 'area',
    label: '所在地区',
  },
  {
    prop: 'addDetail',
    label: '详细地址',
  },
  {
    prop: 'wechat',
    label: '微信',
  },
  {
    prop: 'qq',
    label: 'QQ',
  },
  {
    prop: 'officialWeb',
    label: '官网站',
  },
  {
    prop: 'groupDesc',
    label: '团队介绍',
  },
  {
    prop: 'registerFrom',
    label: '注册来源',
  },
  {
    extraCol: true,
    id: 'methods',
    label: '操作',
  },
];
</script>
