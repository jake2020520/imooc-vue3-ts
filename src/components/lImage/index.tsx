import { defineComponent, h } from 'vue';
// import { pick } from 'lodash-es';
import useComponentCommon from '../../hooks/useComponentCommon';
import { transformToComponentProps, imageComponentProps, imageStylePropNames } from '../defaultProps';
const defaultProps = transformToComponentProps(imageComponentProps);

export default defineComponent({
  name: 'LImage',
  props: {
    ...defaultProps
  },
  setup(props) {
    // pick({key:1,name:'text'},['key']) 取出 后面数组 对应属性
    // const styleProps = computed(() => pick(props, textStylePropNames));
    console.log('-image-props--', props);
    const { styleProps, handleClick } = useComponentCommon(props, imageStylePropNames);

    return () => {
      return (
        <img
          style={{
            ...styleProps.value,
            width: styleProps.value.width ? styleProps.value.width : '100px',
            height: styleProps.value.height ? styleProps.value.height : '100px'
          }}
          class="l-image-component"
          onClick={handleClick}
          src={props.src}
        ></img>
      );
    };
  }
});
