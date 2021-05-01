import { LoaderState } from './types';
import {Actions, LoaderActionTypes} from "./actions";

const initialState: LoaderState = {
    loading: false
}
export default (state= initialState, action: LoaderActionTypes): LoaderState => {
    switch (action.type) {
        case Actions.SHOW_LOADER:
            return  {
                loading: action.loading
            }
        default:
            return state;
    }
}