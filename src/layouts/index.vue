<template>
  <div class="layout">
    <AsideEle />
    <div class="layout-row" :class="navCollapse ? 'collapse' : ''">
      <HeaderEle />
      <el-main>
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderEle from './components/HeaderEle.vue';
import AsideEle from './components/AsideEle.vue';
import { useMainStore } from '@/store/main';

const { navCollapse } = useMainStore();
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100vh;
  .layout-row {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    width: calc(100vw - 230px);
    &.collapse {
      width: calc(100vw - 64px);
    }
    .el-main {
      background-color: rgb(243, 243, 243);
    }
  }
}
</style>
