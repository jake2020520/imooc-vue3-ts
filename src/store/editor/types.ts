import { VNode } from 'vue';
export interface State {
  // 中间编辑器渲染的数组
  components: ComponentItem[];
  // 当前编辑的那个元素 uuid
  currentElement: string;
}

export interface ComponentItem {
  // 元素的属性
  props: Partial<TextComponentProps & ImageComponentProps>;
  // id uuid v4 生成
  id: string;
  // 业务组件名称
  name: string;
}

export interface CommonDefaultProps {
  actionType: string;
  url: string;
  height: string | number;
  width: string | number;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;

  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  cursor: string;

  boxShadow: string;
  opacity: string;
  position: string;
  left: string;
  top: string;
  right: string;
}

export interface TextComponentProps extends CommonDefaultProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}
export interface ImageComponentProps extends CommonDefaultProps {
  textAlign: string;
  src: string;
}

export interface PropToForm {
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  value?: string;
  options?: { text: string | VNode; value: any }[];
  // eslint-disable-next-line no-unused-vars
  initTransform?: (v: any) => any;
  // eslint-disable-next-line no-unused-vars
  afterTransform?: (v: any) => any;
  valueProp?: string;
  eventName?: string;
}

export type PropsToForms = {
  // eslint-disable-next-line no-unused-vars
  [P in keyof TextComponentProps]?: PropToForm;
};
