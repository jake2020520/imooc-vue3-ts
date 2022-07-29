import { Module } from 'vuex';
import { State } from './types';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import { RootState } from '../index';

export * from './actions';
export * from './mutations';
export * from './types';

const module: Module<State, RootState> = {
  namespaced: true,
  state: {
    todoData: { userId: 1, id: 1, title: '', completed: true },
    templates: [
      {
        author: '159****5014',
        copiedCount: 79,
        coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-126349.png',
        createdAt: '2020-11-18T11:16:11.000Z',
        desc: '樊登读书-意志力',
        id: 27,
        isHot: false,
        title: '初始化数据',
        user: { _id: '617d33bed38dbc5025755a8b', username: '13611915632', nickName: '乐高5632' },
        nickName: '乐高5632',
        username: '13611915632',
        _id: '617d33bed38dbc5025755a8b'
      }
    ],
    user: { isLogin: false, userName: 'viking' }
  },
  actions,
  getters,
  mutations
};

export default module;
