import { computed } from 'vue';
import { pick } from 'lodash-es';
import { TextComponentProps } from '@/store/editor/types';

const useComponentCommon = <T extends Partial<TextComponentProps>>(props: T, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks));

  const handleClick = () => {
    console.log('handleClick');
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handleClick
  };
};

export default useComponentCommon;
