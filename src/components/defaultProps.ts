import { mapValues, without } from 'lodash-es';

export const commonDefaultProps = {
  actionType: '',
  url: '',
  height: '',
  width: '318px',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',

  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  cursor: 'pointer',

  boxShadow: '0 0 0 #000',
  opacity: 1,
  position: 'relative',
  left: '0px',
  top: '0px',
  right: '0px'
};

export const textDefaultProps = {
  text: '正文内容',
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'left',
  color: '#000',
  backgroundColor: '',
  ...commonDefaultProps
};
// without([1,2,3,4],1,2)剔除 1,2
// mapValues 重新赋值 key 不变 value 重新赋值
export const textStylePropNames = without(Object.keys(textDefaultProps), 'action', 'url', 'text');
export const transformToComponentProps = <T extends { [key: string]: any }>(props: T) => {
  return mapValues(props, item => {
    return { type: item.constructor, default: item };
  });
};
