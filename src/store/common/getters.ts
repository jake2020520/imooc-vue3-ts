import { State } from './types';

/**
 *
 * @param state
 */
export function getterTodoData(state: State) {
  return state.todoData || [];
}
/**
 *
 * @param state
 */
export const getterTemplatesById = (state: State) => (id: number) => {
  return state.templates.find(t => {
    return t.id == id;
  });
};
