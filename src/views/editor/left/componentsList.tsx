import {
  defineComponent,
  h
  //   computed,

  //   resolveComponent,
  //   defineAsyncComponent
  // reactive
} from 'vue';
// import { useStore } from 'vuex';
import { v4 as uuidV4 } from 'uuid';
import { ComponentItem } from '@/store/editor/types';
import { commonUploadCheck, getImageDimensions } from '@/utils/helper';
import LText from '@/components/lText';
import Uploader from '@/components/uploader';
import { imageComponentProps } from '@/components/defaultProps';

// import './style.less';
// }

export default defineComponent({
  name: 'componentsList',
  props: {
    list: {
      type: Array,
      required: true
    },
    onItemClick: { type: Function }
  },
  setup(props) {
    // const store = useStore();
    const onItemClick = (data: any) => {
      console.log('onItemClick---', data);
      const newComponent: ComponentItem = {
        id: uuidV4(),
        name: 'LText',
        props: data
      };
      props.onItemClick && props.onItemClick(newComponent);
    };
    const onImageUploaded = (resp: any) => {
      const src = `http://localhost:7001/imgs?id=${resp.src}`;
      const newComponent: ComponentItem = {
        id: uuidV4(),
        name: 'LImage',
        props: { ...imageComponentProps, src: src }
      };
      getImageDimensions(src).then(data => {
        console.log('--getImageDimensions--', data);
        const maxWidth = 373;
        newComponent.props.width = data.width > maxWidth ? maxWidth : data.width;
        props.onItemClick && props.onItemClick(newComponent);
      });
      console.log('onImageUploaded:  ', resp, newComponent);
    };

    return () => {
      return (
        <div class="create-component-list">
          {props.list.map((item: any, index) => (
            <div key={index} onClick={() => onItemClick(item)} class="component-item">
              <LText {...item}></LText>
            </div>
          ))}

          <Uploader
            action="http://localhost:7001/file"
            success={(uploaded: any) => {
              onImageUploaded(uploaded);
            }}
            beforeUpload={commonUploadCheck}
            v-slots={{
              default: () => <div>点击上传</div>,
              loading: () => <div>上传中</div>,
              uploaded: data => {
                return (
                  <div>
                    <img src={`http://localhost:7001/imgs?id=${data.url}`} />
                  </div>
                );
              }
            }}
          />
        </div>
      );
    };
  }
});
