import {
  defineComponent
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
    const route = useRoute();
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
