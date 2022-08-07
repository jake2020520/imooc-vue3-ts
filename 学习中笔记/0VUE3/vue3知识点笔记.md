canvas-confetti 获奖烟花效果

### 一、vue 组件的四种形式

1. SFC 单文件组件（混合三种标签，返回 vue 的 template） html 模板 js css

2. 函数组件 Function Component (函数形式，使用 jsx 或者 h 函数)

```
function Title(props){
  return <h1>{props.title}</h1>
}
```

3. render function (对象形式，使用对象上的 render 方法返回，使用 jsx 或者 h 函数)

```
 defineComponent({
    render(){
        return <h1>{this.title}</h1>
        }
    })
```

```
const Button = defineComponent({
  name: 'Button',
  render() {
    return (
      <button >
        <h1>答复</h1>
      </button>
    );
  }
});
```

4. 特殊的方法

```
 defineComponent({
    setup(props){
        return ()=>{
            return <h1>{props.title}</h1>
          }
        }
    })
```

### 二、vue3 的三种实例

- app instance 应用实例 createApp
- component instance 组件实例 ref 或者 app.mount()
- component internal instance 组件内部实例 getInternalInstance

### 三、元素的家族传承

HTMLImageElement -> HTMLelement -> Element -> Node -> EventTarget

### 四、vue3 的插件系统

一段代码给 vue 应用实例添加全局功能，他的格式是一个 object 暴露出一个 install()方法，或者一个 function
他没有严格的限制，一般有以下几种功能

- 添加全局方法或者属性
- 添加全局资源： 指令，过滤器
- 通过全局混入添加一些组件选项
- 通过 config.globalProperties 来添加 app 实例方法

### 五、组件的引入方式

1. 所有组件一次性全部导入并且作为插件使用

```
import LegoComponent form 'lego-component'
app.use(LegoComponent)
```

2. 单个组件导入

```
import {LText} from 'lego-component'
app.use(LText)
```
