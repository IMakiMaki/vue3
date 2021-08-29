<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="title">test</div>
      <el-form ref="ruleForm" :model="form" :rules="formRules" :label-position="'left'">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input v-model="form.verifyCode" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElForm } from '@/hooks/useElForm';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const formRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入手机号或邮箱' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
};

const ruleForm = useElForm();
const router = useRouter();

const form = reactive({
  username: '',
  password: '',
  verifyCode: '',
});

const handleLogin = () => {
  ruleForm.value?.validate((valid) => {
    if (valid) {
      router.push('/');
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #2d3a4b;
  .login-wrapper {
    color: white;
    margin-top: 120px;
    .el-form-item {
      width: 300px;
    }
    .title {
      margin-bottom: 20px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
</style>
