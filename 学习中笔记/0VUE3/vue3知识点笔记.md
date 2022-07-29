### vue 组件的三种形式

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
