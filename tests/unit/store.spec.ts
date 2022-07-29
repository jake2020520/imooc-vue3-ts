import store from '../../src/store/index'; // 可以直接使用
describe('test vuex Store', () => {
  it('should have two modules', () => {
    expect(store.state).toHaveProperty('common');
    expect(store.state).toHaveProperty('editor');
  });
});
describe('test user module', () => {
  it('test login mutation', () => {
    store.commit('common/setLogin');
    expect(store.state.common?.user.isLogin).toBeTruthy();
  });
  it('test logout mutation', () => {
    store.commit('common/setLogout');
    expect(store.state.common?.user.isLogin).toBeFalsy();
  });
});
