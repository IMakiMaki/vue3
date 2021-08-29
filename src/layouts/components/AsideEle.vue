<template>
  <div class="aside" :class="isCollapse ? 'collapse' : ''">
    <NavTitleEle />
    <div class="menu-wrapper">
      <NavEle :route-list="routeList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import NavEle from './NavEle/index.vue';
import NavTitleEle from './NavTitleEle.vue';

const main = useMainStore();
const isCollapse = computed(() => main.navCollapse);
const router = useRouter();
const routeList = router.options.routes;
</script>

<style lang="scss" scoped>
.aside {
  position: relative;
  flex: 0 230px;
  height: 100vh;
  overflow: hidden;
  &.collapse {
    flex: 0 1 auto;
  }
}
.menu-wrapper {
  margin-top: 70px;
  height: calc(100vh - 70px);
  overflow-y: overlay;
}
</style>
