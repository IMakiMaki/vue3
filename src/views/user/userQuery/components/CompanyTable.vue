<template>
  <XTable empty-text="暂无企业信息" :data="props.data" :columns="columnsInfo">
    <template #phone-header>phone-header</template>
    <template #phone="scope">
      <div>
        <el-input :placeholder="scope.row.phone" />
      </div>
    </template>

    <template #methods>
      <el-button size="mini" type="primary">表单下载</el-button>
    </template>
  </XTable>
</template>

<script lang="ts" setup>
import { XTable } from '@/components/xTable';
import type { Columns } from '@/components/xTable/interface';
import { defineProps } from 'vue';

export interface CompanyInfo {
  phone: string;
  companyName: string;
  businessLicense: string;
  socialNumber: string;
  expiredTime: string;
  person: string;
  address: string;
  payAdd: string;
}

const props = defineProps<{
  data: CompanyInfo[];
}>();

const columnsInfo: Columns<CompanyInfo> = [
  {
    prop: 'phone',
    label: '手机号',
    customHeader: true,
  },
  {
    prop: 'companyName',
    label: '企业名称',
  },
  {
    prop: 'businessLicense',
    label: '营业执照',
  },
  {
    prop: 'socialNumber',
    label: '统一社会信用',
  },
  {
    prop: 'expiredTime',
    label: '证件有效期',
  },
  {
    prop: 'person',
    label: '企业法人',
  },
  {
    prop: 'address',
    label: '注册地',
  },
  {
    prop: 'address',
    label: '账单地址',
  },
  {
    prop: 'companyName',
    label: '账单地址',
    formatter: (data) => {
      return data;
    },
  },
  {
    extraCol: true,
    id: 'methods',
    label: '操作',
  },
];
</script>
