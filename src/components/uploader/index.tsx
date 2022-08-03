import { defineComponent, ref, reactive, computed, h, PropType } from 'vue';
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import { Close, Loading, FolderAdd } from '@element-plus/icons-vue';
import { last } from 'lodash-es';
import './style.less';

// 3.3

type UploaderStatus = 'ready' | 'loading' | 'success' | 'error';
type CheckUpload = (file: File) => boolean | Promise<File>;
type FileListType = 'picture' | 'text';

export interface UploaderFile {
  uid: string;
  size: number;
  name: string;
  status: UploaderStatus;
  raw: File;
  resp?: any;
  url?: string;
}

export default defineComponent({
  name: 'file',
  props: {
    action: {
      type: String,
      required: true,
      default: 'http://localhost:7001/file'
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>
    },
    success: {
      type: Function
    },
    drag: {
      type: Boolean,
      default: true
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String as PropType<FileListType>,
      default: 'text'
    }
  },
  setup(props, { slots }) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const filesList = ref<UploaderFile[]>([]);
    const isDragOver = ref<boolean>(false);
    const isUploading = computed(() => {
      return filesList.value.some(file => {
        return file.status === 'loading';
      });
    });
    const lastFileData = computed(() => {
      const lastFile = last(filesList.value);
      if (lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        };
      }
      return false;
    });

    const removeFile = (id: string) => {
      filesList.value = filesList.value.filter(file => file.uid !== id);
    };

    const postFile = (readyFile: UploaderFile) => {
      const formData = new FormData();
      formData.append(readyFile.name, readyFile.raw);
      readyFile.status = 'loading';
      axios
        .post(props.action, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(resp => {
          console.log('请求成功', resp);
          // fileStatus.value = 'success';
          readyFile.resp = resp.data;
          readyFile.status = 'success';
        })
        .catch(e => {
          console.log('请求失败', e);
          // fileStatus.value = 'error';
          readyFile.status = 'error';
        })
        .finally(() => {
          if (fileInput.value) {
            fileInput.value.value = '';
          }
        });
    };

    const addFileToList = (uploadedFile: File) => {
      const fileObj = reactive<UploaderFile>({
        uid: uuidV4(),
        size: uploadedFile.size,
        name: uploadedFile.name,
        status: 'ready',
        raw: uploadedFile
      });
      if (props.listType === 'picture') {
        try {
          fileObj.url = URL.createObjectURL(uploadedFile);
        } catch (error) {
          console.error('upload File error', error);
        }

        // const fileReader = new FileReader();
        // fileReader.readAsDataURL(uploadedFile);
        // fileReader.addEventListener('load', () => {
        //   fileObj.url = fileReader.result as string;
        // });
      }
      filesList.value.push(fileObj);
      if (props.autoUpload) {
        postFile(fileObj);
      }
    };

    const beforeUploadCheck = (files: null | FileList) => {
      if (files) {
        const uploadedFile = files[0];
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadedFile);
          if (result && result instanceof Promise) {
            result
              .then(processFile => {
                if (processFile instanceof File) {
                  addFileToList(processFile);
                } else {
                  throw new Error('beforeUpload Promise should return file');
                }
              })
              .catch(e => {
                console.error(e);
              });
          } else if (result === true) {
            addFileToList(uploadedFile);
          }
        } else {
          addFileToList(uploadedFile);
        }
      }
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      beforeUploadCheck(files);
    };

    const handleDrag = (e: DragEvent, over: boolean) => {
      e.preventDefault();
      isDragOver.value = over;
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      console.log('--handleDrop-', e);
      isDragOver.value = false;
      if (e.dataTransfer) {
        beforeUploadCheck(e.dataTransfer.files);
      }
    };
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const uploadFiles = () => {
      filesList.value.filter(file => file.status === 'ready').forEach(readyFile => postFile(readyFile));
    };

    let events: { [key: string]: (e: any) => void } = {
      onClick: triggerUpload
    };
    if (props.drag) {
      events = {
        ...events,
        ondragover: (e: DragEvent) => {
          handleDrag(e, true);
        },
        ondragleave: (e: DragEvent) => {
          handleDrag(e, false);
        },
        ondrop: handleDrop
      };
    }

    return () => {
      return (
        <div class="file-upload">
          <div
            class={{
              'upload-area': true,
              'is-dragover': props.drag && isDragOver.value
            }}
            {...events}
            // onClick={triggerUpload}
          >
            {slots.loading && isUploading.value ? (
              <div>{slots.loading ? slots.loading() : <button disabled={isUploading.value}>点击上传</button>}</div>
            ) : null}
            {slots.uploaded
              ? lastFileData.value &&
                lastFileData.value.loaded && <div class="file-img">{slots.uploaded(lastFileData.value.data)}</div>
              : lastFileData.value && lastFileData.value.loaded && <button>点击重新上传</button>}
            {!(lastFileData.value && lastFileData.value.loaded) && slots.default ? (
              <div>{slots.default ? slots.default() : <button>点击上传</button>}</div>
            ) : null}
          </div>

          <button onClick={uploadFiles}>确认上传到服务器</button>

          <input
            ref={fileInput}
            type="file"
            name="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          ></input>

          {props.showUploadList &&
            filesList.value.map(item => (
              <ul>
                <li class={`uploaded-file upload-${item.status}`} key={item.uid}>
                  {item.url && props.listType === 'picture' && (
                    <img class="uploaded-list-thumbnail" src={item.url}></img>
                  )}

                  <el-icon class="delete-icon" onClick={() => removeFile(item.uid)}>
                    {item.status === 'loading' ? <Loading /> : <FolderAdd />}
                  </el-icon>
                  <span class="filename">{item.name}</span>
                  <el-icon class="delete-icon" onClick={() => removeFile(item.uid)}>
                    <Close />
                  </el-icon>
                </li>
              </ul>
            ))}
        </div>
      );
    };
  }
});
