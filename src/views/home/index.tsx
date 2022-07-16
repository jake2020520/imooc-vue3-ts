import {
  defineComponent,
  computed
  // reactive
} from 'vue';
import { useStore } from 'vuex';
import TemplateList from '@/components/templateList';
// import { TemplateProps } from '@/store/common/types';
import './style.less';

export default defineComponent({
  name: 'home',
  setup() {
    const store = useStore();
    const templates = computed(() => store.state.common.templates);
    // const templates = computed(() => store.state['common/templates']);
    // console.log('store.templates ', store.state.common.templates, templates.value);
    const getData = async () => {
      await store.dispatch('common/getTemplateData', 11);
      store.state.common.templates || [];
    };
    getData();

    return () => {
      return (
        <div class="common-layout">
          <TemplateList templates={templates.value}></TemplateList>
        </div>
      );
    };
  }
});
