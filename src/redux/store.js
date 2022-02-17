import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import {persistStore} from "redux-persist"
import thunk from 'redux-thunk'
import rootReducer from "./root-reducer"

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store)

export default store
export {persistor}

