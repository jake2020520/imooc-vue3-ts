import {
  defineComponent,
  PropType,
  computed,
  h,
  resolveComponent
  //   defineAsyncComponent
  // reactive
} from 'vue';
// import { useStore } from 'vuex';
import { TextComponentProps, PropsToForms, PropToForm } from '@/store/editor/types';

import { mapPropsToForms } from './propsMap';

import './style.less';
// }

export default defineComponent({
  name: 'componentsList',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    },
    onItemClick: { type: Function }
  },
  setup(props) {
    const finalProps = computed<PropsToForms>(() => {
      const finalData: PropsToForms = {} as PropsToForms;
      for (let key in props.props) {
        const newkey = key as keyof TextComponentProps;
        const item: PropToForm = mapPropsToForms[newkey] as PropToForm;
        if (item) {
          item.value = item.initTransform ? item.initTransform(props.props[newkey]) : (props.props[newkey] as string);
          item.valueProp = item.valueProp ? item.valueProp : 'value';
          finalData[newkey] = item;
        }
      }
      return finalData;
    });

    const getFinalRender = () => {
      const domArr: any[] = [];
      const data = finalProps.value;
      for (let key in data) {
        const newkey = key as keyof TextComponentProps;
        const item = finalProps.value[newkey] as PropToForm;
        const itemDom: any = (
          <div class="prop-item">
            {item.text ? <span class="label">{item.text}</span> : null}
            <div class="prop-component">
              {h(
                resolveComponent(item.component),
                { value: item.value, ...item?.extraProps, valueProp: item?.valueProp },
                () => {
                  if (item.options) {
                    return item.options.map((subItem: any) => {
                      return (
                        item.subComponent &&
                        h(resolveComponent(item.subComponent), { value: subItem.value }, subItem.text)
                      );
                    });
                  }
                }
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
