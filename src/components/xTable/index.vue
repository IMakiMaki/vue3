<template>
  <ElTable
    v-loading="loading"
    :data="data"
    :height="height || DefaultProps.height"
    :max-height="maxHeight || DefaultProps.maxHeight"
    :stripe="stripe || DefaultProps.stripe"
    :border="border || DefaultProps.border"
    :size="size || DefaultProps.size"
    :show-header="showHeader || DefaultProps.showHeader"
    :highlight-current-row="highlightCurrentRow || DefaultProps.highlightCurrentRow"
    :empty-text="emptyText || DefaultProps.emptyText"
    v-bind="$attrs"
  >
    <template v-for="column in columns">
      <template v-if="column.hidden !== false">
        <ElTableColumn
          :key="calcProp(column)"
          :type="column.type || undefined"
          :prop="calcProp(column)"
          :label="column.label"
          :width="column.width"
        >
          <template #header>
            <slot v-if="column.customHeader" :name="`${calcProp(column)}-header`"></slot>
            <div v-else>{{ column.label }}</div>
          </template>
          <template #default="scope">
            <slot :name="calcProp(column)" :row="scope.row" :$index="scope.$index">
              <div v-text="formatCalc(scope, column)"></div>
            </slot>
          </template>
        </ElTableColumn>
      </template>
    </template>
  </ElTable>
  <ElPagination
    v-if="props.showPagination || DefaultProps.showPagination"
    style="margin-top: 20px"
    :page-sizes="props.paginationOptions?.pageSizes || DefaultProps.paginationOptions.pageSizes"
    :page-size="props.pageSize || DefaultProps.pageSize"
    :layout="
      props.paginationOptions?.layout?.join() || DefaultProps.paginationOptions.layout.join()
    "
    :total="props.total || DefaultProps.total"
  >
  </ElPagination>
</template>

<script setup lang="ts">
import { isFunction } from '@/utils/is';
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { computed, defineProps, ref } from 'vue';
import type { Column, Columns } from './interface';

const props = defineProps<{
  data: unknown[];
  columns: Columns<any>;
  loading?: boolean;
  showPagination?: boolean;
  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean;
  border?: boolean;
  size?: 'medium' | 'small' | 'mini';
  fit?: boolean;
  showHeader?: boolean;
  highlightCurrentRow?: boolean;
  emptyText?: string;
  paginationOptions?: {
    pageSizes?: number[];
    layout?: Array<'total' | 'sizes' | 'prev' | 'pager' | 'next' | 'jumper'>;
  };
  pageSize?: number;
  total?: number;
}>();

const DefaultProps = {
  height: undefined,
  maxHeight: undefined,
  showPagination: true,
  stripe: false,
  border: false,
  size: 'medium',
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: '暂无数据',
  paginationOptions: {
    pageSizes: [10, 20, 30, 40],
    layout: ['total', 'sizes', 'prev', 'pager', 'next', 'jumper'],
  },
  pageSize: 10,
  total: 0,
};

const calcProp = computed(() => (column: any): string => {
  if (typeof column.prop === 'string') {
    return column.prop;
  } else {
    return column.id;
  }
});

const formatCalc = (scope: any, option: any) => {
  if (isFunction(option.formatter)) {
    return option.formatter(scope.row[option.prop], scope.row, scope.$index, props.data);
  } else {
    return scope.row[option.prop];
  }
};
</script>

<style lang="scss" scoped></style>
