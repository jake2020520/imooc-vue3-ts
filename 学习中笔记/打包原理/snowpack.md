### snowpack 工具特点

- 利用新版浏览器支持 es modules 特性
- 不会被打包
- 每个文件编译一次，永久被缓存
- 当一个文件修改的时候，只需要重新 build 那个文件

打包给别人用的文件 首选 es-modules,并且提供支持 typescript 的 type 文件

rollup 如果是类库（纯 js 项目） 文件的打包 打包更快更小 es-modules
