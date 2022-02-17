import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import {ProductReducer} from './reducers'
import userReducer from "./reducers/user.reducer";

const  persistConfig = {
    key:'root',
    storage,
    whitelist:['user']
}

const rootReducer = combineReducers({
    user:userReducer,
    products: ProductReducer,
})

export default persistReducer(persistConfig, rootReducer)
