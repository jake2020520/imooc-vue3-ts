// import Vue from 'vue';
// import Vuex from 'vuex';
import { createStore } from 'vuex';
import common, { State as CommonState } from './common';
import editor, { State as EditorState } from './editor';
export interface RootState {
  common?: CommonState;
  editor?: EditorState;
}

const modules = {
  common,
  editor
};

export default createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules
});

export { modules };
