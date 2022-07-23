// eslint-disable-next-line no-unused-vars
import { State } from './types';

/**
 *
 * @param state
 */
export function getterCurrentElement(state: State) {
  return state.components.find(item => item.id == state.currentElement) || {};
}
