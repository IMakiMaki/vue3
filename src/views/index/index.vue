<template>
  <div class="index basic-content">欢迎页</div>
</template>

<script lang="ts">
import { reactive, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  components: {},
  setup() {
    const router = useRouter();

    const toPage = (info: unknown): void => {
      router.push('/');
    };

    // 登录
    const onLogin = async () => {};

    const refreshVerify = (): void => {};

    onBeforeMount(() => {});

    return {
      onLogin,
      router,
      toPage,
      refreshVerify,
    };
  },
};
</script>
