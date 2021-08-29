<template>
  <!-- <div /> is replaced by <el-col /> : avoid the warning https://github.com/vuejs/vue-next/issues/2027 -->
  <el-col :class="{ 'nav-title': true, collapse: isCollapse }" @click="handleClickTitle">
    {{ isCollapse ? '' : '游戏发行管理' }}
  </el-col>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const main = useMainStore();
const isCollapse = computed(() => main.navCollapse);

const handleClickTitle = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped>
.nav-title {
  position: absolute;
  width: 100%;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: #545c64;
}
</style>
