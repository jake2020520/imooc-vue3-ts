// import Vue from 'vue';
// import Vuex from 'vuex';
import { createStore } from 'vuex';
import common, { State as CommonState } from './common';
export interface RootState {
  common?: CommonState;
}

const modules = {
  common
};

export default createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules
});

export { modules };
