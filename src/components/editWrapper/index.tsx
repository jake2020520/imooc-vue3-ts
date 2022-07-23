import { defineComponent } from 'vue';
// import { useRouter } from 'vue-router';

import './style.less';

export default defineComponent({
  name: 'edit-wrapper',
  props: {
    id: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    },
    setActive: {
      type: Function
    }
  },
  setup(props, context) {
    const onItemClick = (id: string) => {
      props.setActive && props.setActive(id);
    };
    return () => {
      return (
        <div onClick={() => onItemClick(props.id)} class={{ 'edit-wrapper': true, active: props.active }}>
          {context.slots.default?.()}
        </div>
      );
    };
  }
});
