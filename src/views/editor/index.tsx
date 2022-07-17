import {
  defineComponent,
  computed,
  h,
  resolveComponent,
  defineAsyncComponent
  // reactive
} from 'vue';
import { useStore } from 'vuex';
import { ComponentItem } from '@/store/editor/types';
import ComponentsList from './left/componentsList';
import { defaultTextTemplate } from './defaultTemplates';

import './style.less';
// }

export default defineComponent({
  name: 'home',
  components: {
    LText: defineAsyncComponent(() => import('@/components/lText'))
  },
  setup() {
    const store = useStore();
    const components = computed<ComponentItem[]>(() => store.state.editor.components).value;
    const addItem = (props: any) => {
      console.log('editor: ', props);
      store.commit('editor/addComponents', props);
    };

    return () => {
      return (
        <div class="common-layout">
          <el-container>
            <el-container>
              <el-aside class="aside-left">
                <ComponentsList list={defaultTextTemplate} onItemClick={addItem} />
              </el-aside>
              <el-container>
                <el-main>
                  <div class="preview-list" id="canvas-area">
                    {components.map((item: ComponentItem) => (
                      <>{h(resolveComponent(item.name), { ...item.props })}</>
                    ))}
                  </div>
                </el-main>
              </el-container>
              <el-aside class="aside-right">Aside</el-aside>
            </el-container>
          </el-container>
        </div>
      );
    };
  }
});
