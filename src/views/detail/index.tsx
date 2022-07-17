import {
  defineComponent,
  computed
  // reactive
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { TemplateProps } from '@/store/common/types';

import './style.less';
// interface Config {
//   name: string;
// }

export default defineComponent({
  name: 'home',
  setup() {
    const route = useRoute();
    const store = useStore();
    const itemData = computed<TemplateProps>(() => store.getters['common/getterTemplatesById'](route.params.id));

    return () => {
      return (
        <div class="content-detail">
          <img src={itemData.value.coverImg} />
          <div class="meta-description">
            <div class="description-detail">
              <div class="title">{itemData.value.title}</div>
              <div class="desc">{itemData.value.desc}</div>
              <div class="username">{itemData.value?.user?.username}</div>
              <div class="">扫一扫，手机预览</div>
              <div class="buttons">
                <router-link to="/editor" class="left">
                  <el-button type="primary">使用模板</el-button>
                </router-link>
                <el-button type="primary">下载图片海报</el-button>
              </div>
            </div>
          </div>
        </div>
      );
    };
  }
});
