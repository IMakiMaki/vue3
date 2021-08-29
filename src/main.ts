import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { useDirectives } from './directives';
import router from './router/index';
import './styles/index.scss';
import { registerElementPlus } from './useElement';

const app = useDirectives(createApp(App));
app.use(createPinia()).use(registerElementPlus).use(router).mount('#app');
