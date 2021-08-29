<template>
  <div class="bread-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in matchedRoutes" :key="item">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const matchedRoutes = computed(() => {
  return route.matched.map((item) => item.meta.title as string);
});
</script>
