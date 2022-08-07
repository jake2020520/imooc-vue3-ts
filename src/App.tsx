import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  h
  // reactive
} from 'vue';
import { useRoute } from 'vue-router';
import UserProfile from '@/components/userProfile';
import './app.less';

// interface Config {
//   name: string;
// }

export default defineComponent({
  name: 'App-tsx',
  setup() {
    // const state = reactive({ name: 'jake_1' });
    // const data: Config = { name: 'aa' };

    onMounted(() => {
      getCurrentInstance()?.appContext.config.globalProperties.$echo();
    });

    const route = useRoute();
    const mook = { text: '大标题', fontSize: '30px', fontWeight: 'bold', tag: 'h2' };

    return () => {
      return (
        <div class="common-layout">
          <el-container>
            {!route.meta.isHiddenHeader && (
              <el-header class="header">
                <router-link to="/" class="header-title">
                  慕课乐高
                </router-link>
                <div>
                  {/* <el-button>登录</el-button> */}
                  <UserProfile />
                </div>
              </el-header>
            )}
            <el-main class="home-layout">
              <mook-text text="Welcome">d</mook-text>
              <mook-color-picker modelValue="#f5222d" text="字体颜色1" eventName="Change"></mook-color-picker>
              <router-view></router-view>
            </el-main>
            {!route.meta.isHiddenFooter && (
              <el-footer class="footer">
                <div>@慕课网（imooc.com）版权所有 | 陕注册备注2020000号</div>
              </el-footer>
            )}
          </el-container>
        </div>
      );
    };
  }
});
