<template>
  <div class="switch-table">
    <XTabs
      v-model="activeName"
      :tab-list="[
        { label: '待审批游戏', name: 'unapproved' },
        { label: '审批完成游戏', name: 'approved' },
        { label: '游戏参数配置', name: 'config' },
      ]"
    />
    <UnApprovedTable v-if="activeName === 'unapproved'" :data="props.unapprovedTableData" />
    <ConfigTable v-if="activeName === 'config'" :data="props.configInfoTableData" />
    <ApprovedTable v-if="activeName === 'approved'" :data="props.approvedInfoTableData" />
  </div>
</template>
<script setup lang="ts">
import { XTabs } from '@/components/xTabs';
import { useVModel } from '@vueuse/core';
import { defineEmit, defineProps } from 'vue';
import type { UnApprovedInfo } from './UnApprovedTable.vue';
import UnApprovedTable from './UnApprovedTable.vue';
import type { ApprovedInfo } from './ApprovedTable.vue';
import ApprovedTable from './ApprovedTable.vue';
import type { ConfigInfo } from './ConfigTable.vue';
import ConfigTable from './ConfigTable.vue';

export type SelectTabsType = 'unapproved' | 'approved' | 'config';

const props = defineProps<{
  selectTab: SelectTabsType;
  unapprovedTableData: UnApprovedInfo[];
  configInfoTableData: ConfigInfo[];
  approvedInfoTableData: ApprovedInfo[];
}>();

const emit = defineEmit();

const activeName = useVModel(props, 'selectTab', emit);
</script>
