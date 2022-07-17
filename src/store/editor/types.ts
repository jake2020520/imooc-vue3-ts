export interface State {
  // 中间编辑器渲染的数组
  components: ComponentItem[];
  // 当前编辑的那个元素 uuid
  currentElement: string;
}

export interface ComponentItem {
  // 元素的属性
  props: { [key: string]: any };
  // id uuid v4 生成
  id: string;
  // 业务组件名称
  name: string;
}
