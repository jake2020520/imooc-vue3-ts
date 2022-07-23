import {
  defineComponent
  //   computed,
  //   h,
  //   resolveComponent,
  //   defineAsyncComponent
  // reactive
} from 'vue';
// import { useStore } from 'vuex';
// import { ComponentItem } from '@/store/editor/types';
import LText from '@/components/lText';

// import './style.less';
// }

export default defineComponent({
  name: 'componentsList',
  props: {
    list: {
      type: Array,
      required: true
    },
    onItemClick: { type: Function }
  },
  setup(props) {
    // const store = useStore();
    const onItemClick = (data: any) => {
      console.log('onItemClick', data);
      props.onItemClick && props.onItemClick(data);
    };

    return () => {
      return (
        <div class="create-component-list">
          {props.list.map((item: any, index) => (
            <div key={index} onClick={() => onItemClick(item)} class="component-item">
              <LText {...item}></LText>
            </div>
          ))}
        </div>
      );
    };
  }
});
