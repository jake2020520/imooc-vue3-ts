import { State, ComponentItem } from './types';

export function setComponentsData(state: State, payload: any) {
  state.components = payload;
}

export function addComponents(state: State, payload: any) {
  const newComponent: ComponentItem = {
    id: '2424',
    name: 'LText',
    props: payload
  };
  state.components.push(newComponent);
}
