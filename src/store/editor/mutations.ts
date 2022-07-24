import { State, ComponentItem, TextComponentProps } from './types';
import { v4 as uuidV4 } from 'uuid';

export function setComponentsData(state: State, payload: any) {
  state.components = payload;
}

export function addComponents(state: State, payload: Partial<TextComponentProps>) {
  const newComponent: ComponentItem = {
    id: uuidV4(),
    name: 'LText',
    props: payload
  };
  state.components.push(newComponent);
}

export function setActive(state: State, payload: string) {
  state.currentElement = payload;
}

export function updateComponent(state: State, payload: any) {
  const updateComponent = state.components.find(item => item.id == state.currentElement);
  if (updateComponent) {
    updateComponent.props[payload.key as keyof TextComponentProps] = payload.value;
  }
}
