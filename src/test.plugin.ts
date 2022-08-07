import { App } from 'vue';
import TodoItem from '@/components/TodoItem';
const plugins = {
  install: (app: App) => {
    app.config.globalProperties.$echo = () => {
      console.log('a plugin globalProperties');
    };
    app.component('hello-world', TodoItem);
    app.provide('test', { message: 'from plugin' });
  }
};

export default plugins;
