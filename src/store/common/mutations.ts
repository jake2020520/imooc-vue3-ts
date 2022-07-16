import { State } from './types';

export function setWeather(state: State, payload: any) {
  state.todoData = payload;
}

export function setTemplateData(state: State, payload: any) {
  state.templates = payload;
}

export function setLogin(state: State, payload: any) {
  state.user = { ...payload, isLogin: true, userName: 'viking' };
}
export function setLogout(state: State) {
  state.user = { isLogin: false };
}
