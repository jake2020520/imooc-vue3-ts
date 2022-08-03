import { h } from 'vue';
import { PropsToForms } from '@/store/editor/types';

const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' }
];

const fontFamilyOptions = fontFamilyArr.map(font => {
  return {
    value: font.value,
    text: h('span', { style: { fontFamily: font.value } }, font.text),
    label: font.text
  };
});

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'el-input',
    eventName: 'Input',
    extraProps: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } }
  },
  fontSize: {
    text: '字号',
    component: 'el-input-number',
    eventName: 'Change',
    extraProps: { min: 0, max: 1003, step: 1 },
    initTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => (e ? `${e}px` : '')
  },
  lineHeight: {
    text: '行高',
    component: 'el-slider',
    eventName: 'Input',
    extraProps: { min: 0, max: 20, step: 0.1 },
    initTransform: (v: string) => parseFloat(v),
    afterTransform: (v: number) => v.toString()
  },
  textAlign: {
    component: 'el-radio-group',
    subComponent: 'el-radio-button',
    text: '对齐',
    eventName: 'Change',
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
    eventName: 'Change',
    options: [{ value: '', text: '无' }, ...fontFamilyOptions]
  },
  color: {
    component: 'ColorPicker',
    text: '字体颜色',
    eventName: 'Change'
  }
};
