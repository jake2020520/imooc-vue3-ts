import {
  defineComponent,
  computed,
  h,
  PropType
  // reactive
} from 'vue';

import './style.less';

const defaultColors = [
  '#ffffff',
  '#f5222d',
  '#fa541c',
  '#fadb14',
  '#52c41a',
  '#1890ff',
  '#722ed1',
  '#8c8c8c',
  '#000000',
  ''
];

export default defineComponent({
  name: 'color-picker',
  props: {
    modelValue: {
      type: String
    },
    colors: {
      type: Array as PropType<string[]>,
      default: defaultColors
    }
  },
  emits: ['change'],
  setup(props, context) {
    const onChange = (color: string) => {
      context.emit('change', color);
    };

    return () => {
      return (
        <div class="color-picker">
          <div class="native-color-container">
            <input
              type="color"
              value={props.modelValue}
              onInput={(e: any) => {
                onChange(e.target?.value);
              }}
            ></input>
          </div>
          <ul class="picked-color-list">
            {props.colors.map((item, index) => (
              <li key={index} class={`item-${index}`} onClick={() => onChange(item)}>
                {item.startsWith('#') ? (
                  <div style={{ backgroundColor: item }} class="color-item"></div>
                ) : (
                  <div class="color-item transparent-back"></div>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    };
  }
});
