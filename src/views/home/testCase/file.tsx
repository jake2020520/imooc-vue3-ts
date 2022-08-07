import { defineComponent, computed, h } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'file',
  props: {
    msg: {
      type: String
    }
  },
  setup(props) {
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploadedFile = files[0];
        const formData = new FormData();
        formData.append(uploadedFile.name, uploadedFile);
        axios
          .post('https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then(e => {
            console.log('请求成功', e);
          })
          .catch(e => {
            console.log('请求失败', e);
          });
      }
    };
    return () => {
      return (
        <div class="app-container">
          <form method="post" action="http://localhost">
            <input type="file" name="file" onChange={handleFileChange}></input>
            <input type="text" name="test"></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
  }
});
