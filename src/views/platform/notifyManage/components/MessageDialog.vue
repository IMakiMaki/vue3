<template>
  <XDialog v-model="dialogVisible" width="600px" title="开发者通知消息">
    <el-form :model="formModel" label-width="80px" label-position="left">
      <el-form-item label="ID">
        {{ '10000' }}
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="开发者">
        <el-select v-model="formModel.developer" placeholder="请选择开发者">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="formModel.content" :rows="4" type="textarea" placeholder="请输入内容">
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
      </span>
    </template>
  </XDialog>
</template>

<script lang="ts" setup>
import { XDialog } from '@/components/xDialog';
import { useVModel } from '@vueuse/core';
import { defineEmit, defineProps, reactive } from 'vue';

const emit = defineEmit();
const props = defineProps<{
  modelValue: boolean;
}>();
const formModel = reactive({
  title: '',
  developer: '',
  content: '',
});

const dialogVisible = useVModel(props, 'modelValue', emit);
</script>
