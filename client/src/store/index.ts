import { combineReducers, createStore } from "redux";
import loaderReducer from './loader/reducer';

export const rootReducer = combineReducers({
        loading: loaderReducer
});

export type RootState = ReturnType< typeof rootReducer>;

export default createStore(rootReducer);