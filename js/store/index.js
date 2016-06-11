import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const composedCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
)(createStore);

function configureStore(initialState = {}) {
  const store = composedCreateStore(reducers, initialState);
  
  console.log(process.env.NODE_ENV);
  if(process.env.NODE_ENV === 'development' && module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
          const nextRootReducer = require('../reducers').default;
          store.replaceReducer(nextRootReducer);
      });
  }

  return store;
}

export default configureStore;