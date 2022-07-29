import { defineComponent, ref, h, reactive } from 'vue';
import axios from 'axios';
import Hello from './Hello';

const Button = defineComponent({
  name: 'hello-world',
  emits: ['send'],
  setup(props, context) {
    let numberRef = ref(1);
    let inputRef = ref<any>('1');
    const todos = ref<any[]>([]);
    const user = reactive({
      data: null as any,
      loading: false,
      error: false
    });
    const clickButton = () => {
      console.log('11');
      numberRef.value++;
    };
    const addTodo = () => {
      console.log('11');
      todos.value.push(inputRef.value);
      numberRef.value++;
      context.emit('send', numberRef.value);
    };
    const loadUser = () => {
      user.loading = true;
      axios
        .get('https://jsonplaceholder.typicode.com/users/1')
        .then(resp => {
          console.log(resp);
          user.data = resp.data;
        })
        .catch(() => {
          user.error = true;
        })
        .finally(() => {
          user.loading = false;
        });
    };

    return () => {
      return (
        <div>
          <Hello msg="Hello"></Hello>
          <button onClick={clickButton}>{numberRef.value}</button>
          <input class="inputValue" v-model={inputRef.value}></input>
          <button class="addTodo" onClick={addTodo}>
            add
          </button>
          <button class="loadUser" onClick={loadUser}>
            load
          </button>
          {user.loading ? <p class="loading">loading...</p> : <div class="userName">{user.data?.username}</div>}
          {user.error && <p>error</p>}
          <ul>
            {todos.value.map(item => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
      );
    };
  }
});

export default Button;
