import { ActionContext } from 'vuex';
import { State } from './types';
import { RootState } from '../index';
import { common } from '@/service';

/**
 * vip
 * @param store
 */
export async function getTodoData(store: ActionContext<State, RootState>) {
  const data = await common.getTodoApi();
  store.commit('setWeather', data);
  return data;
}
/**
 * vip
 * @param store
 */
export async function getTemplateData(store: ActionContext<State, RootState>, params: any) {
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
        id: 27,
        isHot: false,
        title: '樊登读书-意志力',
        user: { _id: '617d33bed38dbc5025755a8b', username: '13611915632', nickName: '乐高5632' },
        nickName: '乐高5632',
        username: '13611915632',
        _id: '617d33bed38dbc5025755a8b'
      },
      {
        author: '159****5014',
        copiedCount: 75,
        coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-388804.png',
        createdAt: '2020-11-18T09:15:48.000Z',
        desc: '中秋快乐',
        id: 28,
        isHot: false,
        title: '中秋快乐',
        user: { _id: '617d33bed38dbc5025755a8b', username: '13611915632', nickName: '乐高5632' },
        _id: '61a739f58d5263ce811e706e'
      },
      {
        author: '159****5014',
        copiedCount: 79,
        coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-126349.png',
        createdAt: '2020-11-18T11:16:11.000Z',
        desc: '樊登读书-意志力',
        id: 29,
        isHot: false,
        title: '樊登读书-意志力',
        user: { _id: '617d33bed38dbc5025755a8b', username: '13611915632', nickName: '乐高5632' },
        nickName: '乐高5632',
        username: '13611915632',
        _id: '617d33bed38dbc5025755a8b'
      },
      {
        author: '159****5014',
        copiedCount: 75,
        coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-388804.png',
        createdAt: '2020-11-18T09:15:48.000Z',
        desc: '中秋快乐',
        id: 30,
        isHot: false,
        title: '中秋快乐',
        user: { _id: '617d33bed38dbc5025755a8b', username: '13611915632', nickName: '乐高5632' },
        _id: '61a739f58d5263ce811e706e'
      },
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
      },
      {
        author: '159****5014',
        copiedCount: 75,
        coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-388804.png',
        createdAt: '2020-11-18T09:15:48.000Z',
        desc: '中秋快乐',
        id: 32,
        isHot: false,
        title: '中秋快乐',
        user: { _id: '617d33bed38dbc5025755a8b', username: '13611915632', nickName: '乐高5632' },
        _id: '61a739f58d5263ce811e706e'
      }
    ];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  }
  const data = await getData();
  store.commit('setTemplateData', data);
  return data;
}
