import { Module } from 'vuex';
import { State } from './types';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { RootState } from '../index';
import { v4 as uuidV4 } from 'uuid';

export * from './actions';
export * from './mutations';
export * from './types';

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    components: [
      {
        id: uuidV4(),
        name: 'LText',
        props: { text: 'hello', fontSize: '10px', color: 'red' }
      },
      {
        id: uuidV4(),
        name: 'LText',
        props: { text: 'hello22', fontSize: '20px', color: 'green' }
      },
      {
        id: uuidV4(),
        name: 'LText',
        props: { text: 'hello33', fontSize: '30px', actionType: 'url', url: 'www.google.com', cursor: 'pointer' }
      }
    ],
    currentElement: ''
  },
  actions,
  getters,
  mutations
};

export default module;