import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App';
import router from './router';
import store from './store';
import testPlugin from './test.plugin';
import { instance } from 'rollup-vue3-xu';
import 'rollup-vue3-xu/dist/style.css';
import './reset.css';
import 'element-plus/dist/index.css';
import './common.css';

createApp(App).use(store).use(instance).use(router).use(ElementPlus).use(testPlugin).mount('#app');
