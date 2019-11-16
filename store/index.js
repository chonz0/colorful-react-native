import { createStore } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';

// const enhancer = process.env.NODE_ENV === 'development' ? devToolsEnhancer() : null;
const store = createStore(rootReducer); // pass enhancer as 2nd param

export default store;
