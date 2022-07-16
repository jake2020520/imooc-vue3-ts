import {
  defineComponent
  // reactive
} from 'vue';

import './style.less';
// interface Config {
//   name: string;
// }

export default defineComponent({
  name: 'home',
  setup() {
    // const state = reactive({ name: 'jake_1' });
    // const data: Config = { name: 'aa' };
    return () => {
      return (
        <div class="common-layout">
          <el-container>
            {/* <el-header class="header">
              <div>慕课乐高</div>
              <div>
                <el-button>登录</el-button>
              </div>
            </el-header> */}

            <el-container>
              <el-aside class="aside-left">Aside</el-aside>
              <el-container>
                <el-main>Main</el-main>
              </el-container>
              <el-aside class="aside-right">Aside</el-aside>
            </el-container>
          </el-container>
        </div>
      );
    };
  }
});
