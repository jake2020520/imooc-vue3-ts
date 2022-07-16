import {
  defineComponent,
  computed
  // reactive
} from 'vue';
// import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { UserProps } from '@/store/common/types';
import { ElMessage } from 'element-plus';
// import './app.less';
// interface Config {
//   name: string;
// }

export default defineComponent({
  name: 'App-tsx',
  setup() {
    // const state = reactive({ name: 'jake_1' });
    // const data: Config = { name: 'aa' };
    const store = useStore();
    const user = computed<UserProps>(() => store.state.common.user);
    // const route = useRoute();
    const handleCommand = (command: string | number | object) => {
      console.log('--', command);
      store.commit('common/setLogout');

      ElMessage(`click on item ${command}`);
    };
    return () => {
      return (
        <div class="user-login">
          {!user.value.isLogin ? (
            <el-button>登录</el-button>
          ) : (
            <el-dropdown
              trigger="click"
              onCommand={handleCommand}
              v-slots={{
                dropdown: () => (
                  <el-dropdown-menu>
                    <el-dropdown-item command="a" icon="Plus">
                      登出
                    </el-dropdown-item>
                  </el-dropdown-menu>
                )
              }}
            >
              <span class="el-dropdown-link">{user.value.userName}</span>
            </el-dropdown>
          )}
        </div>
      );
    };
  }
});
