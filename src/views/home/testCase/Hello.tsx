import { defineComponent, computed, h } from 'vue';

export default defineComponent({
  name: 'hello',
  props: {
    msg: {
      type: String
    }
  },
  setup(props) {
    return () => {
      return <div>msg_{props.msg}</div>;
    };
  }
});
