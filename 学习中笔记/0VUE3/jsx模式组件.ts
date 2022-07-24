import { defineComponent } from 'vue';

const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true
    }
  },
  render() {
    return this.vNode;
  }
});

export default RenderVnode;

/*
 * 是用方法是 放到 组件 的com
 *  import RenderVnode from './renderVnode'
 *  添加到 components:{RenderVnode}
 *  模板里面用： <render-vnode :vNode="option.text"></render-vnode>
 *
 * vue3 对template 进行了很多优化 所以 官方建议：
 * 正常情况下用 template 不能实用的地方，用 jsx写法
 *
 *
 *
 */
