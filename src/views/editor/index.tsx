import {
  defineComponent,
  computed,
  h,
  resolveComponent,
  defineAsyncComponent
  // reactive
} from 'vue';
import { useStore } from 'vuex';
import { ComponentItem, TextComponentProps } from '@/store/editor/types';
import EditWrapper from '@/components/editWrapper';
import ComponentsList from './left/componentsList';
import PropsTable from './right/propsTable';

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
    const currentElement = computed<ComponentItem | null>(() => store.getters['editor/getterCurrentElement']);

    const addItem = (props: any) => {
      console.log('editor: ', props);
      store.commit('editor/addComponents', props);
    };
    const setActive = (id: string) => {
      store.commit('editor/setActive', id);
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
                      <EditWrapper
                        key={item.id}
                        id={item.id}
                        setActive={() => setActive(item.id)}
                        active={item.id == (currentElement && currentElement.value?.id)}
                      >
                        <>{h(resolveComponent(item.name), { ...item.props })}</>
                      </EditWrapper>
                    ))}
                  </div>
                </el-main>
              </el-container>
              <el-aside class="aside-right">
                <PropsTable props={currentElement.value?.props as TextComponentProps}></PropsTable>
              </el-aside>
            </el-container>
          </el-container>
        </div>
      );
    };
  }
});
