<template>
  <div class="header">
    <div class="collapse-button" @click="handleCollapseClick">
      <span :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></span>
    </div>
    <BreadEle class="bread-wrapper" />
    <el-dropdown @command="handleCommand">
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>用户名</span>
  </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/main';
import { storageUtil } from '@/utils/storage';
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import BreadEle from './BreadEle/index.vue';

const main = useMainStore();
const isCollapse = computed(() => main.navCollapse);
const router = useRouter();

const handleCollapseClick = () => {
  main.changeNavCollapse();
};

const handleCommand = (command: string) => {
  if (command === 'signOut') {
    storageUtil.removeStorage(['token', 'userInfo', 'permissions']);
    router.replace('/login');
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 0 20px 0 0;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 0px 3px #eee;
}
.collapse-button {
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  font-size: 20px;
}
.bread-wrapper {
  flex: 1;
}
</style>
