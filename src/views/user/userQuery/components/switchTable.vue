<template>
  <div class="switch-table">
    <XTabs
      v-model="activeName"
      :tab-list="[
        { label: '企业信息', name: 'company' },
        { label: '联系人信息', name: 'contact' },
        { label: '关联游戏', name: 'game' },
      ]"
    />
    <CompanyTable v-if="activeName === 'company'" :data="props.companyTableData" />
    <ContactInfoTable v-if="activeName === 'contact'" :data="props.contactInfoTableData" />
    <ConnectGameTable v-if="activeName === 'game'" :data="props.connectGameTableData" />
  </div>
</template>
<script setup lang="ts">
import { XTabs } from '@/components/xTabs';
import { useVModel } from '@vueuse/core';
import { defineEmit, defineProps, watchEffect } from 'vue';
import type { CompanyInfo } from './CompanyTable.vue';
import CompanyTable from './CompanyTable.vue';
import type { ConnectGame } from './ConnectGameTable.vue';
import ConnectGameTable from './ConnectGameTable.vue';
import type { ContactInfo } from './ContactInfoTable.vue';
import ContactInfoTable from './ContactInfoTable.vue';

export type SelectTabsType = 'company' | 'contact' | 'game';

const props = defineProps<{
  selectTab: SelectTabsType;
  companyTableData: CompanyInfo[];
  contactInfoTableData: ContactInfo[];
  connectGameTableData: ConnectGame[];
}>();

const emit = defineEmit(['update:selectTab']);

const activeName = useVModel(props, 'selectTab', emit);
</script>
