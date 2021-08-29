<template>
  <el-dialog v-model="visible" v-bind="$attrs" destroy-on-close center>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { defineEmit, defineProps } from 'vue';

const emit = defineEmit();

const props = defineProps<{
  modelValue: boolean;
}>();

const visible = useVModel(props, 'modelValue', emit);
</script>

<style scoped lang="scss"></style>
