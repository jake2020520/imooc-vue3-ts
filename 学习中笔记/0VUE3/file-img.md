1. file 文件 转 url

- URL.createObjectURL 同步
  经过这个方法的处理后会生成一个临时的链接，然后直接赋值给 src
  URL.createObjectURL(uploadedFile);

- new FileReader() 异步
  FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，
  使用 File 或 Blob 对象指定要读取的文件或数据。
  const fileReader = new FileReader();
  fileReader.readAsDataURL(uploadedFile);
  fileReader.addEventListener('load', () => {
  fileObj.url = fileReader.result as string;
  });
