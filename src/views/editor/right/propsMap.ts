import { PropsToForms } from '@/store/editor/types';

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'el-input',
    extraProps: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } }
  },
  fontSize: {
    text: '字号',
    component: 'el-input-number',
    initTransform: (v: string) => parseInt(v)
  },
  lineHeight: {
    text: '行高',
    component: 'el-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initTransform: (v: string) => parseFloat(v)
  },
  textAlign: {
    component: 'el-radio-group',
    subComponent: 'el-radio-button',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' }
    ]
  },
  fontFamily: {
    component: 'el-select',
    subComponent: 'el-option',
    text: '字体',
    options: [
      { value: '', text: '无' },
      { text: '宋体', value: '"SimSun","STSong"' },
      { text: '黑体', value: '"SimHei","STHeiti"' },
      { text: '楷体', value: '"KaiTi","STKaiti"' },
      { text: '仿宋', value: '"FangSong","STFangsong"' }
    ]
  }
};
