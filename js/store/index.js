import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const composedCreateStore = compose(
  applyMiddleware(thunk),
  // 只支持 chrome 插件的方式，不引入其它代码
  window.devToolsExtension && window.devToolsExtension()
)(createStore);

function configureStore(initialState = {}) {
  const store = composedCreateStore(reducers, initialState);
  
  // reducers 热更新配置
  if(process.env.NODE_ENV === 'development' && module.hot) {
      module.hot.accept('../reducers', () => {
          const nextRootReducer = require('../reducers').default;
          store.replaceReducer(nextRootReducer);
      });
  }

  return store;
}

export default configureStore;