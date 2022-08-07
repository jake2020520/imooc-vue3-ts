import { defineComponent, PropType, h } from 'vue';
// import { useRouter } from 'vue-router';
import { TemplateProps } from '@/store/common/types';
import './style.less';

export default defineComponent({
  name: 'template-list',
  props: {
    templates: {
      type: Array as PropType<TemplateProps[]>, // 为这个添加 泛型的方式
      required: true
    }
  },
  setup(props) {
    return () => {
      return (
        <div>
          <el-row gutter={20}>
            {props.templates.map((item: TemplateProps) => (
              <el-col span={6}>
                <div class="grid-content ep-bg-purple">
                  <div class="card-cover">
                    <img src={item.coverImg} />
                    <div class="hover-item">
                      <router-link to={`/detail/${item.id}`}>
                        <el-button type="primary" class="ant-btn ant-btn-primary ant-btn-lg">
                          <span>使用该模版创建</span>
                        </el-button>
                      </router-link>
                    </div>
                  </div>

                  <div class="card-meta-detail">
                    <div class="card-meta-title">{item.title}</div>
                    <el-divider />
                    <div class="card-meta-description">
                      <div class="description-detail">
                        <span>作者：{item.nickName}</span>
                        <span class="user-number">{item.copiedCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            ))}
          </el-row>
        </div>
      );
    };
  }
});
