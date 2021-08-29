<template>
  <ElTabs v-model="data">
    <ElTabPane
      v-for="item in tabList"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    ></ElTabPane>
  </ElTabs>
</template>

<script setup lang="ts">
import { defineEmit, defineProps, reactive, ref, watch, watchEffect } from 'vue';
import { useVModel } from '@vueuse/core';
import { ElTabs, ElTabPane } from 'element-plus';

const emit = defineEmit();

const props = defineProps<{
  tabList: Array<{ name: string | number; label: string }>;
  modelValue: string | number;
}>();

// 写法等价 line 22 - 34
const data = useVModel(props, 'modelValue', emit);

// watch(
//   () => activeName.value,
//   (val) => {
//     emit("update:modelValue", val);
//   }
// );

// watch(
//   () => props.modelValue,
//   (val) => {
//     activeName.value = val;
//   }
// );
</script>
