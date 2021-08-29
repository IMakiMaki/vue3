<template>
  <el-menu
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="active.value"
    :collapse-transition="false"
    :collapse="isCollapse"
    :router="true"
  >
    <SubNav v-for="item in renderRoutes" :key="item.path" :route-item="item" />
  </el-menu>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main';
import { computed, defineProps, onMounted, reactive, watch } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { useRoute } from 'vue-router';
import SubNav from './SubNav.vue';

const props = defineProps<{
  routeList: RouteRecordRaw[];
}>();

const active = reactive({ value: '' });
const route = useRoute();
const main = useMainStore();
const renderRoutes = props.routeList.filter((route) => route.meta?.showNav !== false);
const isCollapse = computed(() => main.navCollapse);

watch(
  () => route.path,
  (val) => {
    active.value = val;
  },
  { immediate: true }
);

onMounted(() => {
  // console.log(route.path);
});
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
  height: calc(100vh - 70px);
}
</style>
