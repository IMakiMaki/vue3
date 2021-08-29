<template>
  <el-menu-item v-if="onlyOneChild" :index="props.routeItem.redirect">
    <i :class="props.routeItem.meta?.icon"></i>
    <template #title>{{ props.routeItem.meta?.title }}</template>
  </el-menu-item>
  <el-submenu v-else :index="props.routeItem.path">
    <template #title>
      <i :class="props.routeItem.meta?.icon"></i>
      <span>{{ props.routeItem.meta?.title }}</span>
    </template>
    <el-menu-item v-for="item in props.routeItem.children" :key="item.path" :index="item.path">{{
      item.meta?.title
    }}</el-menu-item>
  </el-submenu>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main';
import { computed, defineProps, toRefs } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

const props = defineProps<{
  routeItem: RouteRecordRaw;
}>();

const { routeItem } = toRefs(props);
const main = useMainStore();

const onlyOneChild = computed<boolean>(() => {
  if (routeItem.value.meta?.showMenu !== true && routeItem.value.children?.length === 1) {
    return true;
  } else {
    return false;
  }
});
</script>

<style lang="scss" scoped></style>
