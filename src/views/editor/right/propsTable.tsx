import {
  defineComponent,
  PropType,
  computed,
  h,
  resolveComponent,
  reactive,
  VNode
  //   defineAsyncComponent
  // reactive
} from 'vue';
// import { useStore } from 'vuex';
import { TextComponentProps, PropsToForms, PropToForm } from '@/store/editor/types';

import { mapPropsToForms } from './propsMap';

import './style.less';
interface FormProps {
  component: string;
  subComponent?: string;
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProp?: string;
  eventName?: string;
  // eslint-disable-next-line no-unused-vars
  events: { [key: string]: (e: any) => void };
}

export default defineComponent({
  name: 'props-table',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    },
    handleChangeProps: { type: Function, required: true }
  },
  setup(props) {
    let reaData: any;

    const finalProps = computed<PropsToForms>(() => {
      const finalData: PropsToForms = {} as PropsToForms;
      for (let key in props.props) {
        const newkey = key as keyof TextComponentProps;
        const item: PropToForm = mapPropsToForms[newkey] as PropToForm;
        if (item) {
          const { valueProp = 'value', eventName = 'Input', initTransform, afterTransform } = item;
          const newKeyValue = initTransform ? initTransform(props.props[newkey]) : props.props[newkey];
          const newItem: FormProps = {
            ...item,
            value: newKeyValue,
            valueProp,
            eventName,
            events: {
              [eventName]: (e: any) => {
                console.log('发射事件:---', newkey, e);
                const value = afterTransform ? afterTransform(e) : e;
                props.handleChangeProps(newkey, value);
              }
            }
          };
          // 添加 响应式数据
          if (!reaData) {
            reaData = reactive({ [newkey]: newKeyValue });
          } else {
            reaData[newkey] = newKeyValue;
          }
          finalData[newkey] = newItem;
        }
      }
      return finalData;
    });

    const getFinalRender = () => {
      const domArr: any[] = [];
      const data = finalProps.value;
      for (let key in data) {
        const newkey = key as keyof TextComponentProps;
        const item = finalProps.value[newkey] as FormProps;
        const itemDom: any = (
          <div class="prop-item">
            {item.text ? <span class="label">{item.text}</span> : null}
            <div class="prop-component">
              {h(
                resolveComponent(item.component),
                {
                  ...item?.extraProps,
                  valueProp: item?.valueProp,
                  modelValue: reaData[newkey],
                  [`on${item.eventName}`]: (e: any) => {
                    item.events[item.eventName as string](e);
                    // 添加 响应式数据,不然，这个方法不能响应
                    reaData[newkey] = e;
                    // console.log('-render-props.uuid-', item.eventName, newkey, reaData);
                  }
                },
                {
                  default: () => {
                    if (item.options) {
                      return item.options.map((subItem: any, index: number) => {
                        return (
                          item.subComponent &&
                          h(
                            resolveComponent(item.subComponent),
                            {
                              key: index,
                              value: subItem.value,
                              label:
                                item.component === 'el-radio-group'
                                  ? subItem.value
                                  : typeof subItem.text === 'string'
                                  ? subItem.text
                                  : subItem.label
                            },
                            { default: () => subItem.text } as any
                          )
                        );
                      });
                    }
                  }
                } as any
              )}
            </div>
          </div>
        );
        domArr.push(itemDom);
      }
      return domArr;
    };

    return () => {
      return <div class="props-table">{getFinalRender()}</div>;
    };
  }
});
