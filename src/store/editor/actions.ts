import { ActionContext } from 'vuex';
import { State } from './types';
import { RootState } from '../index';
// import { common } from '@/service';

/**
 * vip
 * @param store
 */
export async function getComponentsData(store: ActionContext<State, RootState>, params: any) {
  // const data = await common.getTodoApi();
  console.log('-getTemplateData-params-', params);
  async function getData() {
    const data = [
      {
        author: '159****5014',
        copiedCount: 79,
        coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-126349.png',
        createdAt: '2020-11-18T11:16:11.000Z',
        desc: '樊登读书-意志力',
        id: 31,
        isHot: false,
        title: '樊登读书-意志力',
        user: { _id: '617d33bed38dbc5025755a8b', username: '13611915632', nickName: '乐高5632' },
        nickName: '乐高5632',
        username: '13611915632',
        _id: '617d33bed38dbc5025755a8b'
      }
    ];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  }
  const data = await getData();
  store.commit('setComponentsData', data);
  return data;
}
